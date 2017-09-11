import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../services/auth.service';

@Injectable()
export class SignedInGuard implements CanActivate {
  constructor(private _authService: AuthService) { }

  canActivate() {
    if (this._authService.signedIn()) { return true; }
    return false;
  }
}
