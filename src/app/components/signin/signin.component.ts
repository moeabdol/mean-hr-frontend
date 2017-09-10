import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { FlashMessagesService } from 'angular2-flash-messages';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  public form: FormGroup;
  public processing = false;

  constructor(private _formBuilder: FormBuilder,
              private _authService: AuthService,
              private _router: Router,
              private _flashService: FlashMessagesService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this._formBuilder.group({
      username: ['', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ])]
    });
  }

  enableForm() {
    this.form.get('username').enable();
    this.form.get('password').enable();
  }

  disableForm() {
    this.form.get('username').disable();
    this.form.get('password').disable();
  }

  onSubmit() {
    this.processing = true;
    this.disableForm();

    const user = {
      username: this.form.get('username').value,
      password: this.form.get('password').value
    };

    this._authService.authenticate(user)
      .subscribe(
        data => {
          this._authService.saveToken(data['token']);

          this._flashService.show(data['message'], {
            cssClass: 'alert alert-success',
            timeout: 3000
          });

          setTimeout(() => {
            this._router.navigate(['/']);
          }, 3000);
        },
        err => {
          this._flashService.show(err.json()['message'], {
            cssClass: 'alert alert-danger',
            timeout: 3000
          });
          this.processing = false;
          this.enableForm();
        }
      );
  }
}
