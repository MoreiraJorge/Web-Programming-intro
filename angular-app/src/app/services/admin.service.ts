import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, from } from 'rxjs';

import { environment } from './../../environments/environment';
import { User } from '../models/user';



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
export class AdminService {

  constructor(public http: HttpClient) { }

  getAdmin(): Observable<User> {
    return this.http.get<User>(`${API_URL}/admin`, httpOptions)
  }

  changeAdminPass(id: string, password: string): Observable<User> {
    return this.http.put<User>(`${API_URL}/admin/changePass/${id}`, JSON.stringify(password), httpOptions)
  }

  dayTests(): Observable<any>{
    return this.http.get(`${API_URL}/covtests/schedCount`, httpOptions);
  }
  
}
