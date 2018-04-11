import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable} from 'rxjs/Observable';
import { Incident } from './incident';
import { SiteType } from './sitetype';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable()
export class IncidentService {

  private _siteTypeUrl = 'http://nquanrest1/olprr/sitetype';
  constructor(private http: HttpClient) {
  }

  // Uses http.get() to load data from a single API endpoint
  getSiteTypes(): Observable<SiteType[]> {
    return this.http.get<SiteType[]>(this._siteTypeUrl, httpOptions)
        .do(data => console.log('All: ' + JSON.stringify(data)))
        .catch(this.handleError);
}

private handleError(err: HttpErrorResponse) {
    console.error(err.message);
    return Observable.throw(err.message);
}
}
