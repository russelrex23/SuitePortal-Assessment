import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Observable, throwError} from 'rxjs';
import {GenericObject} from '../models/generic-object';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {

  private API_URL = 'http://localhost:3333/api';

  constructor(private http: HttpClient) {
  }

  /**
   * Compose API url.
   * @param url - endpoint
   */
  private getApiUrl(url: string): string {
    return this.API_URL + url;
  }

  /**
   * Set headers with application/json content type.
   * @param headers - optional headers
   */
  private setHeaders(headers: GenericObject = {}): HttpHeaders {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });

    Object.keys(headers).forEach(key => {
      httpHeaders = httpHeaders.append(key, headers[key]);
    });

    return httpHeaders;
  }

  /**
   * Set parameters.
   * @param params - optional parameters
   */
  private setParams(params: GenericObject = {}): HttpParams {
    let httpParams = new HttpParams();

    Object.keys(params).forEach(key => {
      httpParams = httpParams.append(key, params[key]);
    });

    return httpParams;
  }

  /**
   * Convert plain request body to form data.
   * @param body - request body
   */
  public toFormData(body: GenericObject = {}): FormData {
    const formData = new FormData();

    Object.keys(body).forEach(key => {
      formData.append(key, body[key]);
    });

    return formData;
  }

  /**
   * Perform HTTP GET request.
   * @param url - endpoint
   * @param parameters - request parameters
   */
  public get<T>(url: string, parameters: GenericObject = {}): Observable<T> {
    url = this.getApiUrl(url);
    const options = {
      headers: this.setHeaders(),
      params: this.setParams(parameters)
    };

    return this.http.get<T>(url, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Perform HTTP POST request.
   * @param url - endpoint
   * @param body - request body
   */
  public post<T>(url: string, body): Observable<T> {
    url = this.getApiUrl(url);
    const options = {
      headers: this.setHeaders()
    };

    return this.http.post<T>(url, body, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Perform HTTP PUT request.
   * @param url - endpoint
   * @param body - request body
   */
  public put<T>(url: string, body: GenericObject = {}): Observable<T> {
    url = this.getApiUrl(url);
    const options = {
      headers: this.setHeaders()
    };

    return this.http.put<T>(url, body, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Perform HTTP PATCH request.
   * @param url - endpoint
   * @param body - request body
   */
  public patch<T>(url: string, body: GenericObject = {}): Observable<T> {
    url = this.getApiUrl(url);
    const options = {
      headers: this.setHeaders()
    };

    return this.http.patch<T>(url, body, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Perform HTTP DELETE request.
   * @param url - endpoint
   */
  public delete<T>(url: string): Observable<T> {
    url = this.getApiUrl(url);
    const options = {
      headers: this.setHeaders()
    };

    return this.http.delete<T>(url, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Perform upload using HTTP POST request with multipart/form-data content type.
   * @param url - endpoint
   * @param body - request body
   */
  public upload<T>(url: string, body: GenericObject = {}): Observable<T> {
    url = this.getApiUrl(url);
    const httpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token')
    });
    const options = {
      headers: httpHeaders,
      reportProgress: true
    };

    return this.http.post<T>(url, this.toFormData(body), options)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Show error message.
   * @param httpErrorResponse - error info
   */
  public handleError(httpErrorResponse: HttpErrorResponse): Observable<never> {
    if (httpErrorResponse.status === 401 && !httpErrorResponse.url?.includes('/api/accounts/authenticated')) {
      alert('You don\'t have permission to access this resource.');
      location.href = location.origin;
    } else if (httpErrorResponse.error instanceof ErrorEvent) {
      alert(httpErrorResponse.error.message);
    } else if (httpErrorResponse.status === 400 && !httpErrorResponse.url?.includes('/api/authenticate')) {
      // NotificationUtil.error(httpErrorResponse.error.error);
    } else if (httpErrorResponse.status !== 401) {
      alert('You don\'t have permission to access this resource.');
    }

    return throwError(httpErrorResponse);
  }
}
