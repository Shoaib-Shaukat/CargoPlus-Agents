import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GvarService } from '../../Services/Globel/gvar.service';
import { ApiService } from '../../Services/API/api.service'
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { AuthService } from '../../Services/Auth/auth.service'
import { templateJitUrl } from '@angular/compiler';
declare var jQuery: any;
const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  clicked = false;
  changePassForm: FormGroup;
  constructor(private _el: ElementRef,
    public API: ApiService,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private GV: GvarService,
    private authService: AuthService,) { }
  ngOnInit() {
    this.InitializeForm();
  }
  InitializeForm(): any {
    this.changePassForm = new FormGroup({
      Password: new FormControl("", [Validators.required]),
      ConfirmPassword: new FormControl("", [Validators.required]),
    });
  }
  changePass() {

  }
}