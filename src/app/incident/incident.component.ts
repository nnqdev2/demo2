import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import 'rxjs/Rx';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

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
import { Incident } from '../models/incident';


@Component({
  selector: 'app-incident',
  templateUrl: './incident.component.html',
  styleUrls: ['./incident.component.css'],
  providers: [ DatePipe ]
})
export class IncidentComponent implements OnInit {

  incident: Incident;
  incidentForm: FormGroup;
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
  showInvoiceContact = false;
  errorMessage: string;

  constructor(private incidentDataService: IncidentDataService, private formBuilder: FormBuilder, private datePipe: DatePipe) {}


  ngOnInit() {
    this.getSiteTypes();
    this.getConfirmationTypes();
    this.getCounties();
    this.getDiscoveryTypes();
    this.getQuadrants();
    this.getReleaseCauseTypes();
    this.getSourceTypes();
    this.getStates();
    this.getStreetTypes();
    this.createForm();
  }


  createFormSSS() {
    this.incidentForm = this.formBuilder.group({
      reportedByEmail: ['', [Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]],
      dateReceived:  [{value: '', disabled: true,  validators: Validators.required}],
      dateReleaseDiscovered: ['', Validators.required],
      siteType:  ['', Validators.required]

    });
    this.incidentForm.patchValue({
      dateReceived: this.datePipe.transform(new Date(), 'MM-dd-yyyy')
    });
  }

   createForm() {
    this.incidentForm = this.formBuilder.group({
      reportedBy:  ['', Validators.required],
      reportedByPhone:  ['', Validators.required],
      reportedByEmail: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]],
      releaseType:  ['', Validators.required],
      dateReceived:  [{value: '', disabled: true,  validators: Validators.required}],
      facilityId: [''],
      siteName:  ['', Validators.required],
      siteCounty:  ['', Validators.required],
      streetNbr: ['', Validators.required],
      streetQuad:  ['', Validators.required],
      streetName:  ['', Validators.required],
      streetType: ['', Validators.required],
      siteAddress:  ['', Validators.required],
      siteCity:  ['', Validators.required],
      siteZipcode: ['', Validators.required],
      sitePhone:  ['', Validators.required],
      company:  ['', Validators.required],
      initialComment:  ['', Validators.required],
      discoveryDate: ['', Validators.required],
      confirmationCode:  ['', Validators.required],
      discoveryCode:  ['', Validators.required],
      causeCode: ['', Validators.required],
      sourceId:  ['', Validators.required],
      rpFirstName:  ['', Validators.required],
      rpLastName: ['', Validators.required],
      rpOrganization:  ['', Validators.required],
      rpAddress:  ['', Validators.required],
      rpAddress2: ['', Validators.required],
      rpCity:  ['', Validators.required],
      rpState:  ['', Validators.required],
      rpZipcode: ['', Validators.required],
      rpPhone:  ['', Validators.required],
      rpEmail:  ['', Validators.required],
      icFirstName:  ['', Validators.required],
      icLastName: ['', Validators.required],
      icOrganization:  ['', Validators.required],
      icAddress:  ['', Validators.required],
      icAddress2: ['', Validators.required],
      icCity:  ['', Validators.required],
      icState:  ['', Validators.required],
      icZipcode: ['', Validators.required],
      icPhone:  ['', Validators.required],
      icEmail:  ['', Validators.required],
      groundWater: [''],
      surfaceWater: [''],
      drinkingWater: [''],
      soil: [''],
      vapor: [''],
      freeProduct: [''],
      unleadedGas: [''],
      leadedGas: [''],
      misGas: [''],
      diesel: [''],
      wasteOil: [''],
      heatingOil: [''],
      lubricant: [''],
      solvent: [''],
      otherPet: [''],
      chemical: [''],
      unknown: [''],
      mtbe: [''],
      dateReleaseDiscovered: ['', Validators.required],
      quadrant: ['', Validators.required]
    });
    this.incidentForm.patchValue({
      dateReceived: this.datePipe.transform(new Date(), 'MM-dd-yyyy')
    });
  }


  checkReleaseTypeValue() {
    console.log('**********releaseType selected is', this.incidentForm.controls.releaseType.value);

    if (typeof this.incidentForm.controls.releaseType.value !== 'undefined' || this.incidentForm.controls.releaseType.value === 'H') {
      this.showInvoiceContact = false;
    } else {
      this.showInvoiceContact = true;
    }
  }

  copyResponsibleToInvoice(incidentForm: FormGroup) {
    console.log('**********copyResponsibleToInvoice ' + incidentForm.controls.icFirstName.value + ' HELLO??????????????????');
    incidentForm.controls.icFirstName = incidentForm.controls.rpFirstName.value;
    incidentForm.controls.icLastName = incidentForm.controls.rpLastName.value;
    incidentForm.controls.icOrganization = incidentForm.controls.rpOrganization.value;
    incidentForm.controls.icAddress = incidentForm.controls.rpAddress.value;
    incidentForm.controls.icPhone = incidentForm.controls.rpPhone.value;
    incidentForm.controls.icCity = incidentForm.controls.rpCity.value;
    incidentForm.controls.icEmail = incidentForm.controls.rpEmail.value;
    incidentForm.controls.icState = incidentForm.controls.rpState.value;
    incidentForm.controls.icZipcode = incidentForm.controls.rpZipcode.value;
  }

  createIncident(): void {
    if (this.incidentForm.valid) {
      console.log('incidentForm Submitted!', this.incidentForm.value);
    } else {
      console.log('incidentForm is not Valid therefore not Submitted!', this.incidentForm.value);
    }

    if (this.incidentForm.dirty && this.incidentForm.valid) {
      // Copy the form values over the product object values
      let p = Object.assign({}, this.incident, this.incidentForm.value);

      this.incidentDataService.createIncident(p)
          .subscribe(
              () => this.onCreateComplete(),
              (error: any) => this.errorMessage = <any>error
          );
  } else if (!this.incidentForm.dirty) {
      this.onCreateComplete();
  }
  }
  onCreateComplete(): void {
    // Reset the form to clear the flags
    console.log('ok did it!!!!');
    this.incidentForm.reset();
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
