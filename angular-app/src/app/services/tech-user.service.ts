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
export class TechUserService {

  constructor(public http: HttpClient) { }

  getTechs(): Observable<User[]> {
    return this.http.get<User[]>(`${API_URL}/techs/techList`, httpOptions)
  }

  addTech(user: User): Observable<User> {
    return this.http.post<User>(`${API_URL}/techs/create`, JSON.stringify(user), httpOptions)
  }

  deleteTech(id: string): Observable<User> {
    return this.http.delete<User>(`${API_URL}/techs/${id}`, httpOptions)
  }

  updateTech(id: string, user: User): Observable<User> {
    return this.http.put<User>(`${API_URL}/techs/${id}`, JSON.stringify(user), httpOptions);
  }

  getTechByID(id: string): Observable<User> {
    return this.http.get<User>(`${API_URL}/techs/${id}`, httpOptions);
  }

}
