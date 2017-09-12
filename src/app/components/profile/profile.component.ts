import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public form: FormGroup;
  public processing = false;

  constructor(private _formBuilder: FormBuilder,
              private _authService: AuthService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this._formBuilder.group({
      oldPassword: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ])],
      newPassword: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ])],
      newPasswordConfirmation: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ])]
    }, {
      validator: this.validatePasswordConfirmation('newPassword',
        'newPasswordConfirmation')
    });
  }

  validatePasswordConfirmation(password, confirmation) {
    return (group: FormGroup) => {
      if (group.controls['newPassword'].value ===
        group.controls['newPasswordConfirmation'].value) {
        return null;
      } else {
        return { 'mismatch': true };
      }
    };
  }

  enableForm() {
    this.form.get('oldPassword').enable();
    this.form.get('newPassword').enable();
    this.form.get('newPasswordConfirmation').enable();
  }

  disableForm() {
    this.form.get('oldPassword').disable();
    this.form.get('newPassword').disable();
    this.form.get('newPasswordConfirmation').disable();
  }

  onPasswordChangeSubmit() {
    this.processing = true;
    this.disableForm();

    this._authService.changeUserPassword(
      this.form.get('oldPassword').value,
      this.form.get('newPassword').value
    ).subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);
        this.processing = false;
        this.enableForm();
      }
    );
  }
}
