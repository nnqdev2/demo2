import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry, tap } from 'rxjs/operators';

import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
// import { error } from 'util';


import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/operator/map';
import 'rxjs/operator/catch';
import 'rxjs/observable/throw';

import { LogPublisher, LogConsole, LogLocalStorage, LogWebApi, LogPublisherConfig } from './log-publishers';

export class IConfig {
    contractorUid: string;
    contractorPwd: string;
    confirmationtypeUrl: string;
    countyUrl: string;
    discoverytypeUrl: string;
    quadrantUrl: string;
    releaseCauseTypeUrl: string;
    sitetypeUrl: string;
    stateUrl: string;
    streettypeUrl: string;
    incidentUrl: string;
}

const APP_CONFIG_URL = './assets/config.json';

@Injectable()
export class ConfigService {


  private configUrl = './assets/config.json';
  private handleError: HandleError;
  private responseStatus: number;

  constructor(private http: HttpClient
    , private httpErrorHandler: HttpErrorHandler) {
      this.handleError = httpErrorHandler.createHandleError('ConfigService');
  }

  // getConfig(): Observable<IConfig> {
  //   console.error('*************** ConfigService getConfigs =====' );
  //   return this.http.get<IConfig>('./assets/config.json');
  // }

  getConfig(): Observable<IConfig> {
    console.error('*************** ConfigService getConfigs =====' );
    return this.http.get<IConfig>('./assets/config.json')
    .pipe(
      tap(data => console.log('All Configs: ' + JSON.stringify(data)))
      // ,
      // catchError(this.handleError<IConfig>('getConfigs', []))
    );
  }

  private handleErrorx(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(
      'Something bad happened; please try again later.');
  }

//   makeIntentionalError() {
//     return this.http.get('not/a/real/url')
//       .pipe(
//         catchError(this.handleError)
//       );
//   }

}
