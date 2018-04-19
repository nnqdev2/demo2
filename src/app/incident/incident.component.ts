import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
// import 'rxjs/Rx';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import {DatePipe} from '@angular/common';
import { IncidentDataService } from './incident-data.service';
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
  providers: [ DatePipe, IncidentDataService ]
})
export class IncidentComponent implements OnInit {

  incident: Incident = new Incident();
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


 createForm() {
    this.incidentForm = this.formBuilder.group({
      contractorUid:  [''],
      contractorPwd:  [''],
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
      siteAddress:  [''],
      siteCity:  ['', Validators.required],
      siteZipcode: ['', Validators.required],
      sitePhone:  [''],
      company:  ['', Validators.required],
      initialComment:  ['', Validators.maxLength(704)],
      discoveryDate: ['', Validators.required],
      confirmationCode:  ['', Validators.required],
      discoveryCode:  ['', Validators.required],
      causeCode: ['', Validators.required],
      sourceId:  ['', Validators.required],
      rpFirstName:  ['', Validators.required],
      rpLastName: ['', Validators.required],
      rpOrganization:  ['', Validators.required],
      rpAddress:  [''],
      rpAddress2: [''],
      rpCity:  ['', Validators.required],
      rpState:  ['', Validators.required],
      rpZipcode: ['', Validators.required],
      rpPhone:  ['', Validators.required],
      rpEmail:  [''],
      icFirstName:  ['', Validators.required],
      icLastName: ['', Validators.required],
      icOrganization:  ['', Validators.required],
      icAddress:  [''],
      icAddress2: [''],
      icCity:  ['', Validators.required],
      icState:  ['', Validators.required],
      icZipcode: ['', Validators.required],
      icPhone:  ['', Validators.required],
      icEmail:  [''],
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
      submitDateTime: [''],
      deqOffice: ['']
    });
    this.incidentForm.patchValue({
      dateReceived: this.datePipe.transform(new Date(), 'MM-dd-yyyy')
    });
  }

  setShowContactInvoice() {
    if (typeof this.incidentForm.controls.releaseType.value !== 'undefined'
    && (this.incidentForm.controls.releaseType.value === 'R' || this.incidentForm.controls.releaseType.value === 'U')) {
      this.showInvoiceContact = true;
    } else {
      this.showInvoiceContact = false;
    }
  }

  copyResponsibleToInvoice() {
    this.incidentForm.controls.icFirstName.setValue(this.incidentForm.controls.rpFirstName.value);
    this.incidentForm.controls.icLastName.setValue(this.incidentForm.controls.rpLastName.value);
    this.incidentForm.controls.icOrganization.setValue(this.incidentForm.controls.rpOrganization.value);
    this.incidentForm.controls.icAddress.setValue(this.incidentForm.controls.rpAddress.value);
    this.incidentForm.controls.icPhone.setValue(this.incidentForm.controls.rpPhone.value);
    this.incidentForm.controls.icCity.setValue(this.incidentForm.controls.rpCity.value);
    this.incidentForm.controls.icEmail.setValue(this.incidentForm.controls.rpEmail.value);
    this.incidentForm.controls.icState.setValue(this.incidentForm.controls.rpState.value);
    this.incidentForm.controls.icZipcode.setValue(this.incidentForm.controls.rpZipcode.value);
  }

  createIncident(): void {
    const errors: any[] = this.findInvalidControls();
    // if (this.incidentForm.valid) {
    //   console.log('incidentForm Submitted!', this.incidentForm.value);
    // } else {
    //   console.log('incidentForm is not Valid therefore not Submitted!', this.incidentForm.value);
    // }

    if (this.incidentForm.dirty && this.incidentForm.valid) {

      this.incidentForm.controls.deqOffice.setValue(this.getDeqOffice());
      this.incidentForm.controls.contractorUid.setValue('DENNIS');
      this.incidentForm.controls.contractorPwd.setValue('TERZIAN');
      this.incidentForm.controls.siteAddress.setValue(`${this.incidentForm.controls.streetNbr.value} `
        + `${this.incidentForm.controls.streetQuad.value} `
        + `${this.incidentForm.controls.streetName.value} `
        + `${this.incidentForm.controls.streetType.value} `);


      const ngbDate = this.incidentForm.controls['discoveryDate'].value;
      const myDate = new Date(ngbDate.year, ngbDate.month, ngbDate.day);
      this.incidentForm.controls['discoveryDate'].setValue(myDate);
      this.incidentForm.controls['submitDateTime'].setValue(myDate);

      // console.log('*********this.incidentForm is ' + (this.incidentForm));
      // console.log('*********this.incident is ' + JSON.stringify(this.incident));

      // Copy the form values over the product object values
      const p = Object.assign({}, this.incident, this.incidentForm.value);

      // console.log('*********p is ' + JSON.stringify(p));

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
    throw new Error('ERRRRRRRRRRRRRRRRRRRRRRRRRRR');
  }

  getConfirmationTypes() {
    this.incidentDataService.getConfirmationTypes().subscribe(
      // the first argument is a function which runs on success
      data => { this.confirmationTypes = data; },
      // the second argument is a function which runs on error
      err => console.error(err)
      // ,
      // // the third argument is a function which runs on completion
      // () => console.log('done loading getConfirmationTypes')
    );
  }

  getCounties() {
    this.incidentDataService.getCounties().subscribe(
      // the first argument is a function which runs on success
      data => { this.counties = data; },
      // the second argument is a function which runs on error
      err => console.error(err)
      // ,
      // // the third argument is a function which runs on completion
      // () => console.log('done loading getCounties')
    );
  }

  getDiscoveryTypes() {
    this.incidentDataService.getDiscoveryTypes().subscribe(
      // the first argument is a function which runs on success
      data => { this.discoveryTypes = data; },
      // the second argument is a function which runs on error
      err => console.error(err)
      // ,
      // // the third argument is a function which runs on completion
      // () => console.log('done loading getDiscoveryTypes')
    );
  }

  getQuadrants() {
    this.incidentDataService.getQuadrants().subscribe(
      // the first argument is a function which runs on success
      data => { this.quadrants = data; },
      // the second argument is a function which runs on error
      err => console.error(err)
      // ,
      // // the third argument is a function which runs on completion
      // () => console.log('done loading getQuadrants')
    );
  }

  getReleaseCauseTypes() {
    this.incidentDataService.getReleaseCauseTypes().subscribe(
      // the first argument is a function which runs on success
      data => { this.releaseCauseTypes = data; },
      // the second argument is a function which runs on error
      err => console.error(err)
      // ,
      // // the third argument is a function which runs on completion
      // () => console.log('done loading getReleaseCauseTypes')
    );
  }

  getSiteTypes() {
    this.incidentDataService.getSiteTypes().subscribe(
      // the first argument is a function which runs on success
      data => { this.siteTypes = data; },
      // the second argument is a function which runs on error
      err => console.error(err)
      // ,
      // // the third argument is a function which runs on completion
      // () => console.log('done loading sitetypes')
    );
  }

  getSourceTypes() {
    this.incidentDataService.getSourceTypes().subscribe(
      // the first argument is a function which runs on success
      data => { this.sourceTypes = data; },
      // the second argument is a function which runs on error
      err => console.error(err)
      // ,
      // // the third argument is a function which runs on completion
      // () => console.log('done loading getSourceTypes')
    );
  }

  getStates() {
    this.incidentDataService.getStates().subscribe(
      // the first argument is a function which runs on success
      data => { this.states = data; },
      // the second argument is a function which runs on error
      err => console.error(err)
      // ,
      // // the third argument is a function which runs on completion
      // () => console.log('done loading getStates')
    );
  }

  getStreetTypes() {
    this.incidentDataService.getStreetTypes().subscribe(
      // the first argument is a function which runs on success
      data => { this.streetTypes = data; },
      // the second argument is a function which runs on error
      err => console.error(err)
      // ,
      // // the third argument is a function which runs on completion
      // () => console.log('done loading getStreetTypes')
    );
  }

  populateTestData(): void {
    this.incidentForm.patchValue({
        dateReported: this.datePipe.transform(new Date(), 'MM-dd-yyyy'),
    reportedBy:  'donald duck',
    reportedByPhone:  '5039999999',
    reportedByEmail: 'a@b.com',
    releaseType:  'R',
    dateReceived: this.datePipe.transform(new Date(), 'MM-dd-yyyy'),
    facilityId: 2,
    siteName:  'sitename',
    siteCounty:  '12',
    streetNbr: '12',
    streetQuad:  'W',
    streetName:  'Park',
    streetType: 'Avenue',
    // siteAddress:  ['', Validators.required],
    siteCity:  'Salem',
    siteZipcode: '90099',
    sitePhone: '1231234444',
    company:  'disney',
    initialComment:  'my init comments',
    discoveryDate: this.datePipe.transform(new Date(), 'MM-dd-yyyy'),
    confirmationCode: 'CN',
    discoveryCode:  'OT',
    causeCode: 'OT',
    sourceId: '2',
    rpFirstName: 'rpfname',
    rpLastName: 'rplname',
    rpOrganization: 'rporg',
    rpAddress:  'rpAddress',
    rpAddress2: 'rpAddress2',
    rpCity: 'salem',
    rpState:  'OR',
    rpZipcode: '97008',
    rpPhone:  '9999999999',
    rpEmail: 'b@c.com',
    icFirstName:  'icFirstName',
    icLastName: 'iclname',
    icOrganization:  'icOrg',
    icAddress:  'icAddress',
    icAddress2: 'icAddress2',
    icCity:  'Salem',
    icState:  'OR',
    icZipcode: '97224',
    icPhone:  '9098087777',
    icEmail:  'r@v.y',
    groundWater: 1,
    surfaceWater: 1,
    drinkingWater: 1,
    soil: 1,
    vapor: 1,
    freeProduct: 1,
    unleadedGas: 1,
    leadedGas: 1,
    misGas: 1,
    diesel: 1,
    wasteOil: 1,
    heatingOil: 1,
    lubricant: 1,
    solvent: 1,
    otherPet: 1,
    chemical: 1,
    unknown: 1,
    mtbe: 1,
    submitDatetime: new Date()
  });

  this.incidentForm.patchValue({
    dateReceived: this.datePipe.transform(new Date(), 'MM-dd-yyyy')
  });
    // end of populate test data
  }

  transformDate(date) {
    this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  private getDeqOffice(): string {
    let deqOffice = 'NWR';
    if (this.incidentForm.controls.releaseType.value === 'H') {
       return deqOffice = 'NWR';
    }
    switch (this.incidentForm.controls.siteCounty.value) {
      case'1':  case'7':   case'9':    case'11':   case'12':  case'13':
      case'14': case'16':  case'18':   case'19':   case'23':  case'25':
      case'28': case'30':  case'31':   case'32':   case'33':  case'35':
      deqOffice = 'DAL';
      break;
    case'20':
      deqOffice = 'EUG';
      break;
    case'6':  case'8':  case'10':   case'15':  case'17':
      deqOffice = 'MDF';
      break;
    case'2':  case'21':  case'22':  case'24':  case'27':   case'36':
      deqOffice = 'SLM';
      break;
    default:
      deqOffice = 'NWR';
      break;
    }
    return deqOffice;
  }

  public findInvalidControls() {
    const invalid = [];
    const controls = this.incidentForm.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
            console.log('********** offending name ===>' + name);
            invalid.push(name);
        }
    }
    return invalid;
  }
}
