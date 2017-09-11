import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';

import { JwtHelper } from '../helpers/jwt-helper';

const domain = environment.domain;

@Injectable()
export class AuthService {
  private _jwtHelper: JwtHelper;
  private _userId: number;
  private _userUsername: string;
  private _userEmail: string;
  private _userRole: string;

  constructor(private _http: Http) {
    this._jwtHelper = new JwtHelper();
  }

  register(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post(domain + '/api/users/register', user, { headers })
      .map(res => res.json());
  }

  authenticate(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post(domain + '/api/users/authenticate', user,
      { headers }).map(res => res.json());
  }

  setToken(token) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUserId() {
    return this._jwtHelper.decodeToken(this.getToken())['id'];
  }

  getUserUsername() {
    return this._jwtHelper.decodeToken(this.getToken())['username'];
  }

  getUserEmail() {
    return this._jwtHelper.decodeToken(this.getToken())['email'];
  }

  getUserRole() {
    return this._jwtHelper.decodeToken(this.getToken())['role'];
  }
}
