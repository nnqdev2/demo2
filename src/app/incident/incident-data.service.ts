import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable} from 'rxjs/Observable';
import { catchError, tap, retry} from 'rxjs/operators';

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
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';

import { IConfig, ConfigService } from '../shared/config.service';
import { LogPublisherConfig } from '../shared/log-publishers';

@Injectable()
export class IncidentDataService {

  private handleError: HandleError;
  private config: IConfig;
  private loggers: LogPublisherConfig[] = [];

  private incidentUrl = environment.olprrapi;
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

  // constructor(@Inject(forwardRef(() => LogService)) private logService: LogService) { }
  constructor(private http: HttpClient
    , private httpErrorHandler: HttpErrorHandler
    , private configService: ConfigService) {
      this.handleError = httpErrorHandler.createHandleError('IncidentDataService');


    this.configService.getConfig().subscribe(
      data => { this.config = data; },
      err => console.error('*******IncidentDataService getConfigs ' + err)
    );

    console.error('*******IncidentDataService getConfigs ' + this.config);

    }


  getConfirmationTypes(): Observable<ConfirmationType[]> {

    // console.error('*******IncidentDataService  getConfirmationTypes getConfigs  starts ' + this.config);
    // this.configService.getConfig().subscribe(
    //   data => { this.config = data; },
    //   err => console.error('*******IncidentDataService getConfigs ' + err)
    // );


    // console.error('*******IncidentDataService  getConfirmationTypes getConfigs result ' + this.config);

    // return this.http.get<ConfirmationType[]>(this.incidentUrl + this.config.confirmationtypeUrl)
    //   .pipe(
    //     retry(3),
    //     catchError(this.handleError<ConfirmationType[]>('getConfirmationTypes', []))
    //   );
    return this.http.get<ConfirmationType[]>(this.incidentUrl + this._confirmationType)
      .pipe(
        retry(3),
        catchError(this.handleError<ConfirmationType[]>('getConfirmationTypes', []))
      );
  }

  getCounties(): Observable<County[]> {
    return this.http.get<County[]>(this.incidentUrl + this._county)
      .pipe(
        retry(3),
        catchError(this.handleError<County[]>('getCounties', []))
      );
  }
  getDiscoveryTypes(): Observable<DiscoveryType[]> {
    return this.http.get<DiscoveryType[]>(this.incidentUrl + this._discoveryType)
      .pipe(
        retry(3),
        catchError(this.handleError<DiscoveryType[]>('getDiscoveryTypes', []))
      );
  }

  getQuadrants(): Observable<Quadrant[]> {
    return this.http.get<Quadrant[]>(this.incidentUrl + this._quadrant)
      .pipe(
        retry(3),
        catchError(this.handleError<Quadrant[]>('getQuadrants', []))
      );
  }

  getReleaseCauseTypes(): Observable<ReleaseCauseType[]> {
    return this.http.get<ReleaseCauseType[]>(this.incidentUrl + this._releaseCauseType)
      .pipe(
        // tap(data => console.log('All: ' + JSON.stringify(data))),
        retry(3),
        catchError(this.handleError<ReleaseCauseType[]>('getReleaseCauseTypes', []))
      );
  }

  getSiteTypes(): Observable<SiteType[]> {
    return this.http.get<SiteType[]>(this.incidentUrl + this._siteType)
      .pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))),
        retry(3),
        catchError(this.handleError<SiteType[]>('getSiteTypes', []))
      );
  }

  getSourceTypes(): Observable<SourceType[]> {
    return this.http.get<SourceType[]>(this.incidentUrl + this._sourceType)
      .pipe(
        retry(3),
        catchError(this.handleError<SourceType[]>('getSourceTypes', []))
      );
  }
  getStates(): Observable<State[]> {
    return this.http.get<State[]>(this.incidentUrl + this._state)
      .pipe(
        retry(3),
        catchError(this.handleError<State[]>('getStates', []))
      );
  }
  getStreetTypes(): Observable<StreetType[]> {
    return this.http.get<StreetType[]>(this.incidentUrl + this._streetType)
      .pipe(
        retry(3),
        catchError(this.handleError<StreetType[]>('getStreetTypes', []))
      );
  }

  createIncident(incident: Incident): Observable<Incident> {
    return this.http.post<Incident>(this.incidentUrl + this._incident, incident)
    .pipe(
      catchError(this.handleError<Incident>('createIncident', incident))
    );
  }

    // Uses http.get() to load data from a single API endpoint
    // getSiteTypes(): Observable<SiteType[]> {
    //   return this.http.get<SiteType[]>(this._siteTypeUrl, httpOptions)
    //       .do(data => console.log('All: ' + JSON.stringify(data)))
    //       .catch(this.handleError);
    // }

  private handleErrors(err: HttpErrorResponse) {
      console.error(err.message);
      return Observable.throw(err.message);
  }

}
