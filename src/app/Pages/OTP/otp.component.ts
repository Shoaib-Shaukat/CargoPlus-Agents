import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../Services/API/api.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { GvarService } from '../../Services/Globel/gvar.service'
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {
  otpForm: FormGroup;
  clicked: boolean = false;
  otp1: string = '';
  otp2: string = '';
  otp3: string = '';
  otp4: string = '';
  otp5: string = '';
  otp6: string = '';

  constructor(public API: ApiService, public GV: GvarService) {
  }
  ngOnInit(): void {
  }

  verifyOTP() {

  }
  resendCode(){
    
  }

  keytab(event) {
    const val = this.otp1 + this.otp2 + this.otp3 + this.otp4 + this.otp5 + this.otp6;
    let nextInput = event.srcElement.nextElementSibling; // get the sibling element

    var target = event.target || event.srcElement;
    var id = target.id // prints undefined

    if (nextInput == null)  // check the maxLength from here
      return;
    else
      nextInput.focus();
  }

}

