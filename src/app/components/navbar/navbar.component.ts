import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(public authService: AuthService,
              private _router: Router) { }

  signOut() {
    this.authService.clearToken();
    this._router.navigate(['/signin']);
    return false;
  }
}
