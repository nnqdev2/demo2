import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable} from 'rxjs/Observable';
import { catchError, tap} from 'rxjs/operators';
import { Incident } from '../models/incident';
import { ConfirmationType } from '../models/confirmation-type';
import { County } from '../models/county';
import { DiscoveryType } from '../models/discovery-type';
import { Quadrant } from '../models/quadrant';
import { ReleaseCauseType } from '../models/release-cause-type';
import { SiteType } from '../models/site-type';
import { SourceType } from '../models/source-type';
import { State } from '../models/state';
import { StreetType } from '../models/street-type';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable()
export class IncidentDataService {

  private _incidentUrl = environment.olprrapi;
  private _confirmationType = 'confirmationtype';
  private _county = 'county';
  private _discoveryType = 'discoverytype';
  private _quadrant = 'quadrant';
  private _releaseCauseType = 'releasecausetype';
  private _siteType = 'sitetype';
  private _sourceType = 'sourcetype';
  private _state = 'state';
  private _streetType = 'streettype';
  private _incident = 'incident';

  constructor(private http: HttpClient) {
  }

  // Uses http.get() to load data from a single API endpoint
  getConfirmationTypes(): Observable<ConfirmationType[]> {
    return this.http.get<ConfirmationType[]>(this._incidentUrl + this._confirmationType, httpOptions)
      .pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }
  getCounties(): Observable<County[]> {
    return this.http.get<County[]>(this._incidentUrl + this._county, httpOptions)
      .pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }
  getDiscoveryTypes(): Observable<DiscoveryType[]> {
    return this.http.get<DiscoveryType[]>(this._incidentUrl + this._discoveryType, httpOptions)
      .pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }
  getQuadrants(): Observable<Quadrant[]> {
    return this.http.get<Quadrant[]>(this._incidentUrl + this._quadrant, httpOptions)
      .pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }
  getReleaseCauseTypes(): Observable<ReleaseCauseType[]> {
    return this.http.get<ReleaseCauseType[]>(this._incidentUrl + this._releaseCauseType, httpOptions)
      .pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }
  getSiteTypes(): Observable<SiteType[]> {
    return this.http.get<SiteType[]>(this._incidentUrl + this._siteType, httpOptions)
      .pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }
  getSourceTypes(): Observable<SourceType[]> {
    return this.http.get<SourceType[]>(this._incidentUrl + this._sourceType, httpOptions)
      .pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }
  getStates(): Observable<State[]> {
    return this.http.get<State[]>(this._incidentUrl + this._state, httpOptions)
      .pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }
  getStreetTypes(): Observable<StreetType[]> {
    return this.http.get<StreetType[]>(this._incidentUrl + this._streetType, httpOptions)
      .pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  createIncident(incident: Incident): Observable<Incident> {
    return this.http.post(this._incidentUrl + this._incident, incident, httpOptions)
    .pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

    // Uses http.get() to load data from a single API endpoint
    // getSiteTypes(): Observable<SiteType[]> {
    //   return this.http.get<SiteType[]>(this._siteTypeUrl, httpOptions)
    //       .do(data => console.log('All: ' + JSON.stringify(data)))
    //       .catch(this.handleError);
    // }

  private handleError(err: HttpErrorResponse) {
      console.error(err.message);
      return Observable.throw(err.message);
  }

}
