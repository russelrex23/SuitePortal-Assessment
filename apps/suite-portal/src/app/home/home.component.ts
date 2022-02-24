import { Component, OnInit } from '@angular/core';
import { ALL_SERVICE_TYPES } from '@suiteportal/api-interfaces';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {DetailsService} from '../services/details.service';

@Component({
  selector: 'pm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  API_URL = 'http://localhost:3333/api';
  isSigningUp = false;
  errorMessage = '';
  isLoading = false;

  maintRequestFormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    unitNumber: new FormControl('', Validators.required),
    serviceType: new FormControl('', Validators.required),
    summary: new FormControl('', Validators.required),
    details: new FormControl('', Validators.required)
  });

  serviceTypes = ALL_SERVICE_TYPES;

  constructor(private formBuilder: FormBuilder, private detailsService: DetailsService) {

  }

  ngOnInit(): void {

  }

  maintenanceRequest(): void {
    this.isSigningUp = true;
    this.detailsService.insertDetails(this.maintRequestFormGroup.value).subscribe(
      (response) => {
        this.isSigningUp = false;
        alert('Successfully Inserted!');
        this.maintRequestFormGroup.reset();
      }, (httpErrorResponse: HttpErrorResponse) => {
        if (httpErrorResponse.error.error) {
          this.errorMessage = httpErrorResponse.error.error;
        } else {
          alert('Error!');
        }
        this.isSigningUp = false;
      }
    );
  }

}
