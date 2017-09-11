import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { FlashMessagesService } from 'angular2-flash-messages';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
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
      email: ['', Validators.compose([
        Validators.required,
        this.validateEmail
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ])],
      confirmation: ['', Validators.required]
    }, {
      validator: this.validatePasswordConfirmation('password', 'confirmation')
    });
  }

  validateEmail(control) {
    const regExp = new RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/);
    if (regExp.test(control.value)) {
      return null;
    } else {
      return { 'invalidEmail': true };
    }
  }

  validatePasswordConfirmation(password, confirmation) {
    return (group: FormGroup) => {
      if (group.controls['password'].value ===
        group.controls['confirmation'].value) {
        return null;
      } else {
        return { 'mismatch': true };
      }
    };
  }

  enableForm() {
    this.form.get('username').enable();
    this.form.get('email').enable();
    this.form.get('password').enable();
    this.form.get('confirmation').enable();
  }

  disableForm() {
    this.form.get('username').disable();
    this.form.get('email').disable();
    this.form.get('password').disable();
    this.form.get('confirmation').disable();
  }

  onSubmit() {
    this.processing = true;
    this.disableForm();

    const user = {
      username: this.form.get('username').value,
      email: this.form.get('email').value,
      password: this.form.get('password').value
    };

    this._authService.register(user)
      .subscribe(
        data => {
          this._flashService.show(data['message'], {
            cssClass: 'alert alert-success',
            timeout: 3000
          });

          setTimeout(() => {
            this._router.navigate(['/signin']);
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
