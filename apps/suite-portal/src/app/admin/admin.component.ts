import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import {DetailsService} from '../services/details.service';
import {Router} from '@angular/router';

@Component({
  selector: 'sp-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  isLoggingIn = false;
  errorMessage = '';
  isLoading = false;

  loginFormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private detailsService: DetailsService, private router: Router) { }

  ngOnInit(): void {

  }

  login(): void {
    this.isLoggingIn = true;
    console.log(this.loginFormGroup.value);
    this.detailsService.authentication(this.loginFormGroup.value).subscribe(
      (response) => {
        console.log('log'+response);
        if(response != null){
          alert('Login Successful!');
          this.router.navigate(['/dashboard']);
        }else{
          alert('Error!');
          this.isLoggingIn = false;
        }
      }
    );
  }
}
