import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../Services/API/api.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { GvarService } from '../../Services/Globel/gvar.service'
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  clicked: boolean = false;
  forgotPasswordForm: FormGroup;

  constructor(public API: ApiService, public GV: GvarService) {
  }
  InitializeForm(): any {
    this.forgotPasswordForm = new FormGroup({
      Email: new FormControl("", [Validators.required]),
    });
  }
  ngOnInit(): void {
    this.InitializeForm();
  }

  sendOTP() {

  }

  get f() { return this.forgotPasswordForm.controls; }

}


