import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpHeaders, HttpRequest, HttpResponse,
  HttpInterceptor, HttpHandler
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { startWith, tap } from 'rxjs/operators';

import { RequestCache } from '../request-cache.service';


/**
 * If request is cachable (e.g., package search) and
 * response is in cache return the cached response as observable.
 * If has 'x-refresh' header that is true,
 * then also re-run the package search, using response from next(),
 * returning an observable that emits the cached response first.
 *
 * If not in cache or not cachable,
 * pass request through to next()
 */
@Injectable()
export class CachingInterceptor implements HttpInterceptor {
  constructor(private cache: RequestCache) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    // console.log('**************CachingInterceptor  intercept req 00000');
    // console.log(req);

    // continue if not cachable.
    if (!isCachable(req)) { return next.handle(req); }

    // console.log('**************CachingInterceptor  intercept req is cacheable 00000');
    // console.log(req);

    const cachedResponse = this.cache.get(req);


    // console.log('**************CachingInterceptor  intercept cachedResponse 00000');
    // console.log(cachedResponse);


    // cache-then-refresh
    if (req.headers.get('x-refresh')) {
      const results$ = sendRequest(req, next, this.cache);
      // console.log('**************CachingInterceptor intercept 2222');
      // console.log(results$);
      // console.log('**************CachingInterceptor intercept 2222');
      return cachedResponse ?
        results$.pipe( startWith(cachedResponse) ) :
        results$;
    }

    if (cachedResponse) {
      // console.log('**************CachingInterceptor  intercept cachedResponse == true 3333');
      // console.log(cachedResponse);
      // console.log('**************CachingInterceptor intercept  cachedResponse === true 3333');
      return of(cachedResponse);
    } else {
      // console.log('**************CachingInterceptor intercept  cachedResponse == false 4444');
      // console.log(cachedResponse);
      // console.log('**************CachingInterceptor  intercept cachedResponse === false 4444');
      return sendRequest(req, next, this.cache);
    }



    // // cache-or-fetch
    // return cachedResponse ?
    //   of(cachedResponse) : sendRequest(req, next, this.cache);
  }
}


/** Is this request cachable? */
function isCachable(req: HttpRequest<any>) {

  // console.log('**************CachingInterceptor isCachable req.method');
  // console.log(req.method);
  // Only GET requests are cachable
  return req.method === 'GET';
}

/**
 * Get server response observable by sending request to `next()`.
 * Will add the response to the cache on the way out.
 */
function sendRequest(
  req: HttpRequest<any>,
  next: HttpHandler,
  cache: RequestCache): Observable<HttpEvent<any>> {


    // console.log('**************CachingInterceptor sendRequest   5555');

  // No headers allowed in npm search request
  const noHeaderReq = req.clone({ headers: new HttpHeaders() });
  // const noHeaderReq = req.clone();

  return next.handle(noHeaderReq).pipe(
    tap(event => {
      // There may be other events besides the response.

      // console.log('**************CachingInterceptor sendRequest  noHeaderReq 6666');
      // console.log(noHeaderReq);
      // console.log('**************CachingInterceptor sendRequest  req 6666');
      // console.log(req);
      // console.log('**************CachingInterceptor sendRequest  event 6666');
      // console.log(event);
      // console.log('**************CachingInterceptor sendRequest  done 6666');
      if (event instanceof HttpResponse) {

        // console.log('**************CachingInterceptor sendRequest  yes finally 9999');
        cache.put(req, event); // Update the cache.
        // console.log('**************CachingInterceptor sendRequest  yes finally 9999');
      }

      // console.log('**************CachingInterceptor sendRequest  EXITING');
    })
  );
}

