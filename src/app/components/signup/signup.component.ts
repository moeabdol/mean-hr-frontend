import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public form: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

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

  onSubmit() {
    console.log(this.form.value);
  }
}
