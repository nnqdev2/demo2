
import { NgModule, ErrorHandler} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';

import { HttpErrorHandler } from './http-error-handler.service';
import { MessageService } from './message.service';
import { LogService } from './shared/log.service';
import { LogPublishersService } from './shared/log-publishers.service';
import { AppErrorHandler } from './shared/app-error-handler';
import { ConfigService } from './shared/config.service';
import { ShowErrorsComponent } from './show-errors/show-errors.component';
import { IncidentComponent } from './incident/incident.component';
import { MessagesComponent } from './messages/messages.component';

import { httpInterceptorProviders } from './http-interceptors/index';
import { RequestCache, RequestCacheWithMap } from './request-cache.service';

@NgModule({
  imports: [
    BrowserModule
    , ReactiveFormsModule
    , HttpClientModule
    , NgbModule.forRoot()
    , RouterModule.forRoot([
      { path: '', redirectTo: 'olprr', pathMatch: 'full' },
      { path: 'olprr', component: IncidentComponent },
      { path: '**', redirectTo: 'olprr', pathMatch: 'full' }
    ])
  ],
  declarations: [
    AppComponent,
    IncidentComponent,
    ShowErrorsComponent,
    MessagesComponent
  ],
  providers: [
    httpInterceptorProviders,
    { provide: RequestCache, useClass: RequestCacheWithMap },
    HttpErrorHandler,
    MessageService,
    LogService, LogPublishersService,
    {provide: ErrorHandler, useClass: AppErrorHandler},
    ConfigService


    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
