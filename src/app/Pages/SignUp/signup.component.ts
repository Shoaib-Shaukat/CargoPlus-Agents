import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ApiService } from '../../Services/API/api.service';
import { responseAirLines } from '../AdminArea/Models/airLines';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { GvarService } from '../../Services/Globel/gvar.service'
import { ThemeService } from 'ng2-charts';
import { DatePipe } from '@angular/common'
import { timeStamp } from 'console';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  submitted: boolean = false;
  public departureDate: Date = new Date();
  @ViewChildren(DataTableDirective)
  datatableElement: QueryList<DataTableDirective>;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  validForm: boolean = false;
  SignUPForm: FormGroup;
  shownewButton: boolean = true;
  showeditButton: boolean = false;
  showSaveButton: boolean = false;
  showCancelButton: boolean = false;
  showFlights: boolean = true;
  addnewFlight: boolean = false;
  public date: Date = new Date();
  constructor(public datepipe: DatePipe, public API: ApiService, public GV: GvarService) {
  }
  InitializeForm(): any {
    this.SignUPForm = new FormGroup({
      FirstName: new FormControl("", [Validators.required]),
      LastName: new FormControl("", [Validators.required]),
      DOB: new FormControl("", [Validators.required]),
      CNIC: new FormControl("", [Validators.required]),
      PhoneNumber: new FormControl("", [Validators.required]),
      MobileNumber: new FormControl("", [Validators.required]),
      Gender: new FormControl("", [Validators.required]),
      Email: new FormControl("", [Validators.required]),
      Password: new FormControl("", [Validators.required]),
      ConfirmPassword: new FormControl("", [Validators.required]),
      Address:new FormControl("", [Validators.required]),
    });
  }
  ngOnInit(): void {
    this.InitializeForm();
    let latest_date = this.datepipe.transform(this.date, 'HH:mm');
    this.submitted = false;
  }

  // showhide(callfrm: string) {
  //   if (callfrm == "New") {
  //     this.addnewFlight = true;
  //     this.showFlights = false;
  //     this.showCancelButton = true;
  //     this.showSaveButton = true;
  //     this.showeditButton = false;
  //     this.shownewButton = false;
  //     this.FlightForm.reset();
  //     this.getAirLines();
  //     this.FlightForm.controls.isNew.setValue(true);
  //     let latest_date = this.datepipe.transform(this.date, 'HH:mm');
  //     this.FlightForm.controls.arrivalTime.setValue(latest_date);
  //     this.FlightForm.controls.depTime.setValue(latest_date);
  //     this.FlightForm.controls.depDate.setValue(this.formatDate(new Date()));
  //     this.FlightForm.controls.arrivalDate.setValue(this.formatDate(new Date()));
  //   }
  //   if (callfrm == "Cancel") {
  //     this.submitted = false;
  //     this.addnewFlight = false;
  //     this.showFlights = true;
  //     this.showCancelButton = false;
  //     this.showSaveButton = false;
  //     this.showeditButton = false;
  //     this.shownewButton = true;
  //     this.FlightForm.controls.isNew.setValue(false);
  //   }
  //   if (callfrm == "Edit") {
  //     this.addnewFlight = true;
  //     this.showFlights = false;
  //     this.showCancelButton = true;
  //     this.showSaveButton = false;
  //     this.showeditButton = true;
  //     this.shownewButton = false;
  //     this.FlightForm.controls.isNew.setValue(false);
  //   }
  // }

  get f() { return this.SignUPForm.controls; }
  // validations() {
  //   this.submitted = true;
  //   if (this.FlightForm.controls.ALCode.value == "" || this.FlightForm.controls.ALCode.value == null) {
  //     Swal.fire({
  //       text: "Select Airline",
  //       icon: 'error',
  //       confirmButtonText: 'OK'
  //     });
  //     this.validForm = false;
  //     return;
  //   }
  //   if (this.FlightForm.controls.flightType.value == "" || this.FlightForm.controls.flightType.value == null) {
  //     Swal.fire({
  //       text: "Select Flight Type",
  //       icon: 'error',
  //       confirmButtonText: 'OK'
  //     });
  //     this.validForm = false;
  //     return;
  //   }
  //   if (this.FlightForm.controls.aircraftTypeID.value == "" || this.FlightForm.controls.aircraftTypeID.value == null) {
  //     Swal.fire({
  //       text: "Select Aircraft Type",
  //       icon: 'error',
  //       confirmButtonText: 'OK'
  //     });
  //     this.validForm = false;
  //     return;
  //   }
  //   if (this.FlightForm.controls.regNo.value == "" || this.FlightForm.controls.regNo.value == null) {
  //     Swal.fire({
  //       text: "Enter Aircraft Reg No.",
  //       icon: 'error',
  //       confirmButtonText: 'OK'
  //     });
  //     this.validForm = false;
  //     return;
  //   }
  //   if (this.FlightForm.controls.arrivalDate.value == "" || this.FlightForm.controls.arrivalDate.value == null) {
  //     Swal.fire({
  //       text: "Select Arrival Date",
  //       icon: 'error',
  //       confirmButtonText: 'OK'
  //     });
  //     this.validForm = false;
  //     return;
  //   }
  //   if (this.FlightForm.controls.arrivalTime.value == "" || this.FlightForm.controls.arrivalTime.value == null) {
  //     Swal.fire({
  //       text: "Select Arrival Time",
  //       icon: 'error',
  //       confirmButtonText: 'OK'
  //     });
  //     this.validForm = false;
  //     return;
  //   }
  //   if (this.FlightForm.controls.Destination.value == "" || this.FlightForm.controls.Destination.value == null) {
  //     Swal.fire({
  //       text: "Enter Arrival Destination",
  //       icon: 'error',
  //       confirmButtonText: 'OK'
  //     });
  //     this.validForm = false;
  //     return;
  //   }
  //   if (this.FlightForm.controls.depDate.value == "" || this.FlightForm.controls.depDate.value == null) {
  //     Swal.fire({
  //       text: "Select Departure Date",
  //       icon: 'error',
  //       confirmButtonText: 'OK'
  //     });
  //     this.validForm = false;
  //     return;
  //   }
  //   if (this.FlightForm.controls.depTime.value == "" || this.FlightForm.controls.depTime.value == null) {
  //     Swal.fire({
  //       text: "Select Departure Time",
  //       icon: 'error',
  //       confirmButtonText: 'OK'
  //     });
  //     this.validForm = false;
  //     return;
  //   }
  //   if (this.FlightForm.controls.depDestination.value == "" || this.FlightForm.controls.depDestination.value == null) {
  //     Swal.fire({
  //       text: "Enter Departure Destination",
  //       icon: 'error',
  //       confirmButtonText: 'OK'
  //     });
  //     this.validForm = false;
  //     return;
  //   }
  //   if (this.FlightForm.controls.arrivalFlightNo.value == "" || this.FlightForm.controls.arrivalFlightNo.value == null) {
  //     Swal.fire({
  //       text: "Enter Arrival Flight No.",
  //       icon: 'error',
  //       confirmButtonText: 'OK'
  //     });
  //     this.validForm = false;
  //     return;
  //   }
  //   if (this.FlightForm.controls.depFlightNo.value == "" || this.FlightForm.controls.depFlightNo.value == null) {
  //     Swal.fire({
  //       text: "Enter Departure Flight No.",
  //       icon: 'error',
  //       confirmButtonText: 'OK'
  //     });
  //     this.validForm = false;
  //     return;
  //   }
  //   this.validForm = true;
  // }

  private formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }
}
