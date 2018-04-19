import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { MessageService } from './message.service';
import { LogService, LogEntry } from './shared/log.service';

/** Type of the handleError function returned by HttpErrorHandler.createHandleError */
export type HandleError =
  <T> (operation?: string, result?: T) => (error: HttpErrorResponse) => Observable<T>;

/** Handles HttpClient errors */
@Injectable()
export class HttpErrorHandler {
  constructor(private messageService: MessageService, private logService: LogService) { }

  /** Create curried handleError function that already knows the service name */
  createHandleError = (serviceName = '') => <T>
    (operation = 'operation', result = {} as T) => this.handleError(serviceName, operation, result)

  /**
   * Returns a function that handles Http operation failures.
   * This error handler lets the app continue to run as if no error occurred.
   * @param serviceName = name of the data service that attempted the operation
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  handleError<T> (serviceName = '', operation = 'operation', result = {} as T) {

    return (error: HttpErrorResponse): Observable<T> => {

      console.error('***** HTTPERRORHANDLER handleError<T> Starts  1 log error'); // log to console instead
      console.error(error); // log to console instead
      console.error('***** HTTPERRORHANDLER handleError<T> Starts  1 log error'); // log to console instead

      // TODO: send the error to remote logging infrastructure
      console.error('***** HTTPERRORHANDLER handleError<T> Starts  2 serviceName, operation, result'); // log to console instead
      console.error(serviceName);
      console.error(operation);
      console.error(result);
      console.error('***** HTTPERRORHANDLER handleError<T> Starts  2 =====');

      const testJSON = JSON.stringify(error);


      console.error('***** HTTPERRORHANDLER handleError<T> Starts 3 log error'); // log to console instead
      console.error(testJSON); // log to console instead
      console.error('***** HTTPERRORHANDLER handleError<T> Starts  3 log error'); // log to console instead

      console.error('***** HTTPERRORHANDLER handleError<T> Starts 4 about to call logService'); // log to console instead

      this.logService.error(testJSON );
      console.error('***** HTTPERRORHANDLER handleError<T> Starts 4 done calling logService'); // log to console instead

      const message = (error.error instanceof ErrorEvent) ?
        error.error.message :
       `server returned code ${error.status} with body "${testJSON}"`;

       console.error('***** HTTPERRORHANDLER handleError<T> Starts 5 message'); // log to console instead
       console.error(message);
       console.error('***** HTTPERRORHANDLER handleError<T> Starts 5 message'); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.messageService.add(`${serviceName}: ${operation} failed: ${message}`);

      // Let the app keep running by returning a safe result.
      return of( result );
    };

  }
}
