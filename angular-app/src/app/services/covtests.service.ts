import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from './../../environments/environment';
import { Covtest } from '../models/covtest';



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

  getTests(): Observable<Covtest[]> {
    return this.http.get<Covtest[]>(`${ API_URL }/covtests/testList`, httpOptions)
  }

  getUserTests(id: string): Observable<Covtest[]> {
    return this.http.get<Covtest[]>(`${ API_URL }/covtests/listTest/${ id }`, httpOptions)
  }

  countTotalTests(): Observable<any>{
    return this.http.get(`${ API_URL }/covtests/count`, httpOptions)
  }

  countDayTests(date: Date): Observable<any>{
    return this.http.get(`${ API_URL }/covtests/schedCount/${ date }`, httpOptions)
  }

  countTotalInfected(): Observable<any>{
    return this.http.get(`${ API_URL }/users/infected`, httpOptions)
  }

}
