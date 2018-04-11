import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import 'rxjs/Rx';
import {DatePipe} from '@angular/common';
import { IncidentDataService } from '../services/incident-data.service';
import { SiteType } from '../models/site-type';

import { ConfirmationType } from '../models/confirmation-type';
import { County } from '../models/county';
import { DiscoveryType } from '../models/discovery-type';
import { Quadrant } from '../models/quadrant';
import { ReleaseCauseType } from '../models/release-cause-type';
import { SourceType } from '../models/source-type';
import { State } from '../models/state';
import { StreetType } from '../models/street-type';

@Component({
  selector: 'app-incident',
  templateUrl: './incident.component.html',
  styleUrls: ['./incident.component.css'],
  providers: [ DatePipe ]
})
export class IncidentComponent implements OnInit {


  incidentForm: FormGroup;
  dateReported: FormControl;
  dateReleaseDiscovered: FormControl;
  siteType: FormControl;
  reportedByEmail: FormControl;

  confirmationTypes: ConfirmationType[] = [];
  counties: County[] = [];
  discoveryTypes: DiscoveryType[] = [];
  quadrants: Quadrant[] = [];
  releaseCauseTypes: ReleaseCauseType[] = [];
  siteTypes: SiteType[] = [];
  sourceTypes: SourceType[] = [];
  states: State[] = [];
  streetTypes: StreetType[] = [];

  currentDate: Date;

  constructor(private incidentDataService: IncidentDataService, private formBuilder: FormBuilder, private datePipe: DatePipe) { }

  ngOnInit() {
    this.currentDate = new Date();
    this.getSiteTypes();
    this.createFormControls();
    this.createForm();
    this.incidentForm.patchValue({
      dateReported: this.datePipe.transform(this.currentDate, 'yyyy-MM-dd')
  });
  }

  createFormControls() {
    this.dateReported = new FormControl({ value: '' , disabled: true});
    this.dateReleaseDiscovered = new FormControl('', Validators.required);
    this.siteType = new FormControl('', Validators.required);
    this.reportedByEmail = new FormControl('', [ Validators.required, Validators.maxLength(8)] );
  }

  createForm() {
    this.incidentForm = new FormGroup ({
      dateReported: this.dateReported,
      dateReleaseDiscovered: this.dateReleaseDiscovered,
      siteType: this.siteType,
      reportedByEmail: this.reportedByEmail
    });
  }

  onSubmit() {
    if (this.incidentForm.valid) {
      console.log('incidentForm Submitted!', this.incidentForm.value);
      this.incidentForm.reset();
    }
  }

  getConfirmationTypes() {
    this.incidentDataService.getConfirmationTypes().subscribe(
      // the first argument is a function which runs on success
      data => { this.confirmationTypes = data; },
      // the second argument is a function which runs on error
      err => console.error(err),
      // the third argument is a function which runs on completion
      () => console.log('done loading getConfirmationTypes')
    );
  }

  getCounties() {
    this.incidentDataService.getCounties().subscribe(
      // the first argument is a function which runs on success
      data => { this.counties = data; },
      // the second argument is a function which runs on error
      err => console.error(err),
      // the third argument is a function which runs on completion
      () => console.log('done loading getCounties')
    );
  }

  getDiscoveryTypes() {
    this.incidentDataService.getDiscoveryTypes().subscribe(
      // the first argument is a function which runs on success
      data => { this.discoveryTypes = data; },
      // the second argument is a function which runs on error
      err => console.error(err),
      // the third argument is a function which runs on completion
      () => console.log('done loading getDiscoveryTypes')
    );
  }

  getQuadrants() {
    this.incidentDataService.getQuadrants().subscribe(
      // the first argument is a function which runs on success
      data => { this.quadrants = data; },
      // the second argument is a function which runs on error
      err => console.error(err),
      // the third argument is a function which runs on completion
      () => console.log('done loading getQuadrants')
    );
  }

  getReleaseCauseTypes() {
    this.incidentDataService.getReleaseCauseTypes().subscribe(
      // the first argument is a function which runs on success
      data => { this.releaseCauseTypes = data; },
      // the second argument is a function which runs on error
      err => console.error(err),
      // the third argument is a function which runs on completion
      () => console.log('done loading getReleaseCauseTypes')
    );
  }

  getSiteTypes() {
    this.incidentDataService.getSiteTypes().subscribe(
      // the first argument is a function which runs on success
      data => { this.siteTypes = data; },
      // the second argument is a function which runs on error
      err => console.error(err),
      // the third argument is a function which runs on completion
      () => console.log('done loading sitetypes')
    );
  }

  getSourceTypes() {
    this.incidentDataService.getSourceTypes().subscribe(
      // the first argument is a function which runs on success
      data => { this.sourceTypes = data; },
      // the second argument is a function which runs on error
      err => console.error(err),
      // the third argument is a function which runs on completion
      () => console.log('done loading getSourceTypes')
    );
  }

  getStates() {
    this.incidentDataService.getStates().subscribe(
      // the first argument is a function which runs on success
      data => { this.states = data; },
      // the second argument is a function which runs on error
      err => console.error(err),
      // the third argument is a function which runs on completion
      () => console.log('done loading getStates')
    );
  }

  getStreetTypes() {
    this.incidentDataService.getStreetTypes().subscribe(
      // the first argument is a function which runs on success
      data => { this.streetTypes = data; },
      // the second argument is a function which runs on error
      err => console.error(err),
      // the third argument is a function which runs on completion
      () => console.log('done loading getStreetTypes')
    );
  }

  populateTestData(): void {
    this.incidentForm.patchValue({
        dateReported: Date.now()
    });
  }

  transformDate(date) {
    this.datePipe.transform(date, 'yyyy-MM-dd');
  }
}
