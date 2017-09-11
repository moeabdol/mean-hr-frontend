import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public form: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

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
    });
  }

  onPasswordChangeSubmit() {
    console.log(this.form.valid);
    console.log(this.form.value);
  }
}
