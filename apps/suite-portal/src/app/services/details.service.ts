import {Injectable} from '@angular/core';
import {HttpRequestService} from './http-request.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {Account} from "../models/account";

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  private httpRequestService: HttpRequestService;

  constructor(httpRequestService: HttpRequestService) {
    this.httpRequestService = httpRequestService;
  }

  public getMaintenanceRequests(): Observable<Account> {
    return this.httpRequestService.get('/maintenance-requests');
  }

  public authentication(loginFormGroup: any): Observable<any> {
    return this.httpRequestService.post('/maintenance-requests/login', JSON.stringify(loginFormGroup));
  }

  public insertDetails(signInFormGroup: any): Observable<any> {
    return this.httpRequestService.post('/maintenance-requests', JSON.stringify(signInFormGroup));
  }

  public deleteDetails(id: string): Observable<any> {
    return this.httpRequestService.delete(`/maintenance-requests/${id}/close`);
  }
}
