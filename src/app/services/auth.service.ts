import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';

const domain = environment.domain;

@Injectable()
export class AuthService {
  constructor(private _http: Http) { }

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

  saveToken(token) {
    localStorage.setItem('token', token);
  }

  loadToken() {
    return localStorage.getItem('token');
  }
}
