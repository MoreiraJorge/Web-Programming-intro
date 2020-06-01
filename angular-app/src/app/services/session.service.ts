import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from "@angular/common/http";

import { Observable, BehaviorSubject } from "rxjs";
import { share } from "rxjs/operators";

import { environment } from "./../../environments/environment";
import { User } from '../models/user';

const API_URL = environment.apiUrl || "http://localhost:3000/api";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
  withCredentials: true,
};


@Injectable({
  providedIn: 'root'
})

export class SessionService {
  expired: boolean

  private session: BehaviorSubject<any> = new BehaviorSubject(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );

  constructor(public http: HttpClient) { }

  login(email: String, password: String): Observable<any> {
    this.expired = false;
    const request: any = this.http.post(
      `${API_URL}/login`,
      {
        email,
        password,
      },
      httpOptions
    )
      .pipe(share());
    request
      .subscribe((response) => {
        const { user, token } = response;
        this.session.next(user);
        localStorage.setItem("user", JSON.stringify(user));
        //localStorage.setItem("auth-token", token);
      });

    return request;
  }

  me(): Observable<any> {
    return this.session
  }

  logout() {
    this.expired = false;
    this.session.next(null);
    localStorage.removeItem("user");
    //localStorage.removeItem("auth-token");
    this.http.post(`${API_URL}/logout`, undefined,httpOptions).subscribe(); 
  }

  clearSession() {
    this.expired = true;
    this.session.next(null);
    localStorage.removeItem("user");
    //localStorage.removeItem("auth-token");
  }

}
