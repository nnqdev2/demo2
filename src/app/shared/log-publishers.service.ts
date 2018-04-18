import { Injectable } from '@angular/core';
import { LogPublisher, LogConsole, LogLocalStorage, LogWebApi, LogPublisherConfig } from './log-publishers';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable} from 'rxjs/Observable';
import { catchError, tap} from 'rxjs/operators';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/operator/map';
import 'rxjs/operator/catch';
import 'rxjs/observable/throw';

const PUBLISHERS_FILE = './assets/log-publishers.json';

@Injectable()
export class LogPublishersService {
  constructor(private http: HttpClient) {
    this.buildPublishers();
  }

  publishers: LogPublisher[] = [];

  buildPublishers(): void {
    let logPub: LogPublisher;

    this.getLoggers().subscribe(response => {
      for (const pub of response.filter(p => p.isActive)) {
        switch (pub.loggerName.toLowerCase()) {
          case 'console':
            logPub = new LogConsole();
            break;
          case 'localstorage':
            logPub = new LogLocalStorage();
            break;
          case 'webapi':
            logPub = new LogWebApi(this.http);
            break;
        }

        // Set location, if any, of the logging
        logPub.location = pub.loggerLocation;
        // Add publisher to array
        this.publishers.push(logPub);
      }
    });
  }

  getLoggers(): Observable<LogPublisherConfig[]> {
    return this.http.get<LogPublisherConfig[]>(PUBLISHERS_FILE)
    .pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleErrors)
    );
  }

  private handleErrors(error: any): Observable<any> {
    const errors: string[] = [];
    let msg = '';

    msg = 'Status: ' + error.status;
    msg += ' - Status Text: ' + error.statusText;
    if (error.json()) {
      msg += ' - Exception Message: ' + error.json().exceptionMessage;
    }

    errors.push(msg);

    console.error('An error occurred', errors);

    return Observable.throw(errors);
  }
}
