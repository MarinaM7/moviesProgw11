import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/serivces/auth.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  constructor(private authSrv: AuthService, private router: Router, public fb: FormBuilder) {}

  ngOnInit(): void {}

  registerUser() {
    console.log(this.registerForm.value);
      this.authSrv.signUp(this.registerForm.value).subscribe();
      this.registerForm.reset();
      this.router.navigate(['/login'])
  }

  registerForm = new FormGroup<any>({
    name: new FormControl<string>('', [
      Validators.required,
      Validators.pattern('[a-zA-Z].*'),
    ]),
    surname: new FormControl<string>('', [
      Validators.required,
      Validators.pattern('[a-zA-Z].*'),
    ]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required,  Validators.minLength(4)]),
  });

  get name(): FormControl {
    return this.registerForm.get('name') as FormControl;
  }
  get surname(): FormControl {
    return this.registerForm.get('surname') as FormControl;
  }
  get email(): FormControl {
    return this.registerForm.get('email') as FormControl;
  }
  get password(): FormControl {
    return this.registerForm.get('pass') as FormControl;
  }
}
