import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AddHeaderInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // console.log(`AddHeaderInterceptor - ${req.url}`);
    const jsonReq: HttpRequest<any> = req.clone({
      setHeaders: {'Content-Type': 'application/json', 'Cache-Control': 'no-cache', 'Pragma': 'no-cache'}
    });
    // console.error(`*********AddHeaderInterceptor 11- ${req.url}`);
    // console.error(req);
    // console.error(`*********AddHeaderInterceptor 11- ${req.url}`);

    return next.handle(jsonReq);
  }

}
