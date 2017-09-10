import { TestBed, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import {
  HttpModule,
  XHRBackend,
  Response,
  ResponseOptions
} from '@angular/http';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let backend: MockBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        AuthService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });

    service = TestBed.get(AuthService);
    backend = TestBed.get(XHRBackend);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call /api/users/register to register new user', () => {
    let request, requestBody, response;

    backend.connections.subscribe(connection => {
      request = connection.request;
      requestBody = connection.request.json();

      expect(request.url).toBe('http://localhost:3000/api/users/register');
      expect(request.headers.get('Content-Type')).toMatch(/application\/json/);

      connection.mockRespond(new Response(<ResponseOptions> {
        body: JSON.stringify({
          message: 'User registered successfully.'
        })
      }));
    });

    service.register({
      username: 'hello user',
      email: 'hello@user.com',
      password: '12345678'
    }).subscribe(data => response = data);

    expect(response.message).toBe('User registered successfully.');
  });

  it('should call /api/users/authenticate to authenticate new user', () => {
    let request, requestBody, response;

    backend.connections.subscribe(connection => {
      request = connection.request;
      requestBody = connection.request.json();

      expect(request.url).toBe('http://localhost:3000/api/users/authenticate');
      expect(request.headers.get('Content-Type')).toMatch(/application\/json/);

      connection.mockRespond(new Response(<ResponseOptions> {
        body: JSON.stringify({
          token: 'JWT 12345',
          message: 'User authenticated successfully.'
        })
      }));
    });

    service.authenticate({
      username: 'hello user',
      password: '12345678'
    }).subscribe(data => response = data);

    expect(response.message).toBe('User authenticated successfully.');
    expect(response.token).toMatch(/JWT /);
  });
});
