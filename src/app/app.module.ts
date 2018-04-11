import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { IncidentComponent } from './incident/incident.component';
import { IncidentDataService } from './services/incident-data.service';




@NgModule({
  declarations: [
    AppComponent,
    IncidentComponent
  ],
  imports: [
    NgbModule.forRoot(), ReactiveFormsModule, HttpClientModule, BrowserModule
  ],
  providers: [IncidentDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
