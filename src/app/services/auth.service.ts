import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';

import { JwtHelper } from '../helpers/jwt-helper';

const domain = environment.domain;

@Injectable()
export class AuthService {
  private _jwtHelper: JwtHelper;

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

  changeUserPassword(oldPassword, newPassword) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.getToken());
    return this._http.post(domain + '/api/users/changepassword', {
      oldPassword,
      newPassword
    }, { headers }).map(res => res.json());
  }

  setToken(token) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  clearToken() {
    localStorage.removeItem('token');
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

  getExpirationDate() {
    return new Date(
      this._jwtHelper.decodeToken(this.getToken())['exp'] * 1000
    );
  }

  signedIn() {
    if (localStorage.getItem('token')) {
      return this.getExpirationDate() > new Date();
    }
    return false;
  }

  isAdmin() {
    if (localStorage.getItem('token')) {
      return this.getUserRole() === 'admin';
    }
    return false;
  }
}
