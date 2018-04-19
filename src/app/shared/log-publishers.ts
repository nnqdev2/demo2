import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable} from 'rxjs/Observable';
import { catchError, tap} from 'rxjs/operators';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { LogEntry } from './log.service';

export abstract class LogPublisher {
  location: string;

  abstract log(record: LogEntry): Observable<boolean>;
  abstract clear(): Observable<boolean>;
}

export class LogConsole extends LogPublisher {
  log(record: LogEntry): Observable<boolean> {
    // Log to the console
    console.log(record.buildLogString());

    return Observable.of(true);
  }

  clear(): Observable<boolean> {
    console.clear();

    return Observable.of(true);
  }
}

export class LogLocalStorage extends LogPublisher {
  constructor() {
    super();

    this.location = 'logging';
  }

  getAll(): Observable<LogEntry[]> {
    let values: LogEntry[];

    // Retrieve all values from local storage
    values = JSON.parse(localStorage.getItem(this.location)) || [];

    return Observable.of(values);
  }

  log(record: LogEntry): Observable<boolean> {
    const ret = false;
    let values: LogEntry[];

    try {
      values = JSON.parse(localStorage.getItem(this.location)) || [];
      // Add new log entry to the array
      values.push(record);
      // Store the complete array into local storage
      localStorage.setItem(this.location, JSON.stringify(values));
    } catch (ex) {
      console.log(ex);
    }

    return Observable.of(ret);
  }

  clear(): Observable<boolean> {
    localStorage.removeItem(this.location);
    return Observable.of(true);
  }
}

export class LogPublisherConfig {
  loggerName: string;
  loggerLocation: string;
  isActive: boolean;
}

export class LogWebApi extends LogPublisher {
  constructor(private http: HttpClient) {
    super();

  }

  log(record: LogEntry): Observable<boolean> {
    const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json'})
      };

      this.location = environment.olprrapi + 'log';

    // return this.http.post(this.location, record, httpOptions)
    //   .map(response => response.json)
    //   .catch(this.handleErrors);

    const testJSON = JSON.stringify(record);
    console.error('$$$$$$$$$$$$$$$$$$$ log api: ' + this.location);
    console.error('$$$$$$$$$$$$$$$$$$$ log api payload: ' + (record));
    console.error('$$$$$$$$$$$$$$$$$$$ log api payload: ' + JSON.stringify(record));
    console.error(record);
    console.error('$$$$$$$$$$$$$$$$$$$ log api: ' + this.location);
    console.error('$$$$$$$$$$$$$$$$$$$ log api: ' + this.location);
    console.error('$$$$$$$$$$$$$$$$$$$ log api: ' + this.location);
    return this.http.post(this.location, testJSON, httpOptions)
        .pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))),
        catchError(this.handleErrors)
        );
  }

  clear(): Observable<boolean> {
    // TODO: Call Web API to clear all log entries
    return Observable.of(true);
  }

  private handleErrors(error: any): Observable<any> {
    const errors: string[] = [];
    let msg = '';

    console.error('####An error occurred in log-publishers handlerErrors routine#####');
    console.error( error );
    console.error('####An error occurred in log-publishers handlerErrors routine#####');

    msg = 'Status: ' + error.status;
    msg += ' - Status Text: ' + error.statusText;
    if (error.json()) {
      msg += ' - Exception Message: ' + error.json().exceptionMessage;
    }

    errors.push(msg);



    return Observable.throw(errors);
  }
}
