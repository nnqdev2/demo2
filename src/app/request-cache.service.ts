import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse } from '@angular/common/http';

import { MessageService } from './message.service';

export interface RequestCacheEntry {
  url: string;
  response: HttpResponse<any>;
  lastRead: number;
}

export abstract class RequestCache {
  abstract get(req: HttpRequest<any>): HttpResponse<any> | undefined;
  abstract put(req: HttpRequest<any>, response: HttpResponse<any>): void;
}

// const maxAge = 30000; // maximum cache age (ms)
const maxAge = 600000; // maximum cache age (ms)

@Injectable()
export class RequestCacheWithMap implements RequestCache {

  cache = new Map<string, RequestCacheEntry>();

  constructor(private messenger: MessageService) { }

  get(req: HttpRequest<any>): HttpResponse<any> | undefined {
    const url = req.urlWithParams;

    // console.log('******** RequestCacheWithMap get url 1111');
    // console.log(url);
    // console.log('******** RequestCacheWithMap get url 1111');
    const cached = this.cache.get(url);

    // console.log('******** RequestCacheWithMap get cached 2222');
    // console.log(cached);
    // console.log('******** RequestCacheWithMap get cached 2222');

    if (!cached) {
      // console.log('******** RequestCacheWithMap get returning undefined for cached 3333');
      // console.log(cached);
      // console.log('******** RequestCacheWithMap get returning undefined for cached 3333');
      return undefined;
    }

    // console.log('******** RequestCacheWithMap get cached.lastRead  4444');
    // console.log(cached.lastRead );
    // console.log('******** RequestCacheWithMap get cached.lastRead  4444');

    const isExpired = cached.lastRead < (Date.now() - maxAge);
    const expired = isExpired ? 'expired ' : '';
    this.messenger.add(
      `Found ${expired}cached response for "${url}".`);

    // console.log('******** RequestCacheWithMap get  isExpired    5555');
    // console.log(isExpired );
    // console.log('******** RequestCacheWithMap get messenger 5555');
    // console.log(isExpired );
    // console.log('******** RequestCacheWithMap get cached.response 5555');
    // console.log(cached.response );


    return isExpired ? undefined : cached.response;
  }

  put(req: HttpRequest<any>, response: HttpResponse<any>): void {
    const url = req.urlWithParams;
    this.messenger.add(`Caching response from "${url}".`);

    // console.log('**************REQUESTCACHESERVICE put req 1111111');
    // console.log(req);
    // console.log('**************REQUESTCACHESERVICE put response 1111111');
    // console.log(response);
    // console.log('**************REQUESTCACHESERVICE put 1111111');


    const entry = { url, response, lastRead: Date.now() };
    this.cache.set(url, entry);

    // console.log('**************REQUESTCACHESERVICE put entry 2222222');
    // console.log(entry);


    // remove expired cache entries
    const expired = Date.now() - maxAge;

    // console.log('**************REQUESTCACHESERVICE put expired 33333333');
    // console.log(expired);

    this.cache.forEach ( entry => {
      // console.log('**************REQUESTCACHESERVICE put entry in loop 444444');
      // console.log(entry);
      if (entry.lastRead < expired) {
        this.cache.delete(entry.url);
      }
    });

    this.messenger.add(`Request cache size: ${this.cache.size}.`);
    // console.log('**************REQUESTCACHESERVICE put this.messenger 555555');
    // console.log(this.messenger);
  }
}
