import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { AuthService } from 'src/app/serivces/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLoading = false;
  errorMessage = undefined;

  constructor(private authSrv: AuthService, private router: Router) {}

  ngOnInit(): void {}

  loginForm = new FormGroup<any>({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required]),
  });

  logSubmit() {
    console.log(this.loginForm.value);
   this.authSrv.isLoggedIn$.pipe(tap(u=> u=true))
   this.authSrv.signIn(this.loginForm.value).pipe(tap(res => {localStorage.setItem("UserData", JSON.stringify(res.user)),this.authSrv.logged=true;})).subscribe(()=>this.router.navigate(['/']))

  }
  get email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }
  get password(): FormControl {
    return this.loginForm.get('pass') as FormControl;
  }
}
