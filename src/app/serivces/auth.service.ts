import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthResponse } from '../models/auth-res';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, tap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {


  jwtHelper = new JwtHelperService();

  registerUrl:string = 'http://localhost:4201/api/users';
  loginUrl:string = 'http://localhost:4201/api/login';

  public authSubject = new BehaviorSubject<null|AuthResponse>(null);
  user$ = this.authSubject.asObservable()

  isLoggedIn$ = this.user$.pipe(map(u=>!!u))
  timeoutLogout: any;
  logged:boolean=false;

  user! : {id: number, email: string };


  constructor(private http: HttpClient, public router: Router) {
    this.restore()
  }


  signUp(user: {email: string, password:string, name: string}){
    return this.http.post<AuthResponse>(this.registerUrl, user);
  }

  signIn(user: {email: string, password: string}){
    console.log(user);
    return this.http.post<AuthResponse>(this.loginUrl, user).pipe(tap(data => {
      console.log(data);
      this.authSubject.next(data);
      localStorage.setItem('user', JSON.stringify(data))
      this.user = data.user;
    }));
  }

  logout() {
    this.authSubject.next(null);
    localStorage.removeItem('user')
    this.router.navigate(['/login'])
    if (this.timeoutLogout) {
      clearTimeout(this.timeoutLogout)
    }
  }

  restore() {
    const user = localStorage.getItem('user');
    if (!user) {
      return;
    }
    const userdata: AuthResponse = JSON.parse(user);
    if (this.jwtHelper.isTokenExpired(userdata.accessToken)) {
      return
    }
    this.authSubject.next(userdata)
    this.logged=true;

  }
}


//   //Sign-up
//   signUp(user: User): Observable<any> {
//     let api = this.registerUrl;
//     return this.http.post(api, user).pipe(catchError(this.handleError));
//   }

//   //Sign-in
//   signIn(user: User) {
//     return this.http.post<any>(this.loginUrl, user).subscribe((res: any) => {
//       localStorage.setItem('acces_token', res.token);
//       this.getUserProfile(res.id).subscribe((res: any) => {
//         this.currentUser = res;
//         this.router.navigate(['/']);
//       });
//     });
//   }

//   getToken() {
//     return localStorage.getItem('acces_token');
//   }

//   get isLoggedIn(): boolean {
//     let authToken = localStorage.getItem('access_token');
//     return authToken !== null ? true : false;
//   }

//   doLogout() {
//     let removeToken = localStorage.removeItem('access_token');
//     if (removeToken == null) {
//       this.router.navigate(['/login']);
//     }
//   }

//   //User profile
//   getUserProfile(id: any): Observable<any> {
//     let api = this.loginUrl + '/' + id;
//     return this.http.get(api, { headers: this.headers }).pipe(
//       map((res) => {
//         return res || {};
//       }),
//       catchError(this.handleError)
//     );
//   }

//   // Error
//   handleError(error: HttpErrorResponse) {
//     let msg = '';
//     if (error.error instanceof ErrorEvent) {
//       // client-side error
//       msg = error.error.message;
//     } else {
//       // server-side error
//       msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
//     }
//     return throwError(msg);
//   }
// }
