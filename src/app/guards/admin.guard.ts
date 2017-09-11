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
export class AdminGuard implements CanActivate {
  constructor(private _authService: AuthService,
              private _router: Router) { }

  canActivate() {
    if (this._authService.isAdmin()) { return true; }
    this._router.navigate(['/']);
    return false;
  }
}
