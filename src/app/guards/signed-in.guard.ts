import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../services/auth.service';

@Injectable()
export class SignedInGuard implements CanActivate {
  public redirectUrl: string;

  constructor(private _authService: AuthService,
              private _router: Router) { }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot) {
    if (this._authService.signedIn()) { return true; }
    this.redirectUrl = state.url;
    this._router.navigate(['/signin']);
    return false;
  }
}
