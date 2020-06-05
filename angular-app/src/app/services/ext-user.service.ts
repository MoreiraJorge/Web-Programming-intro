import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

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
export class ExtUserService {

  constructor(public http: HttpClient) { }

  getExternals(): Observable<User[]> {
    return this.http.get<User[]>(`${API_URL}/users/userListExt`, httpOptions)
  }

  getExtByID(id: string): Observable<User> {
    return this.http.get<User>(`${API_URL}/users/${ id }`, httpOptions)
  }

}
