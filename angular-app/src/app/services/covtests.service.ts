import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from './../../environments/environment';



const API_URL = environment.apiUrl;

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  withCredentials: true,
};

@Injectable({
  providedIn: 'root'
})
export class CovtestsService {

  constructor(public http: HttpClient) { }

  getTests(): Observable<any> {
    return this.http.get(`${ API_URL }/covtests/testList`, httpOptions)
  }

}
