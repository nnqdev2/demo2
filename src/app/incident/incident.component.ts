import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import 'rxjs/Rx';
import {DatePipe} from '@angular/common';
import { IncidentService } from '../incident.service';
import { SiteType } from '../sitetype';

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


  siteTypes: SiteType[] = [];
  currentDate: Date;

  constructor(private incidentService: IncidentService, private formBuilder: FormBuilder, private datePipe: DatePipe) { }

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

  getSiteTypes() {
    this.incidentService.getSiteTypes().subscribe(
      // the first argument is a function which runs on success
      data => { this.siteTypes = data; },
      // the second argument is a function which runs on error
      err => console.error(err),
      // the third argument is a function which runs on completion
      () => console.log('done loading sitetypes')
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
