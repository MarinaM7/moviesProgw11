import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, switchMap, take } from 'rxjs';
import { AuthResponse } from '../models/auth-res';

@Injectable()
export class AuthconfigInterceptor implements HttpInterceptor {

  user: AuthResponse | undefined;
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    this.user = JSON.parse(localStorage.getItem('user')!);
    if (!this.user) return next.handle(request);

    const newreq = request.clone({
        headers: request.headers.set(
          "Authorization",
          `Bearer ${this.user.accessToken}`
        )
    })
    return next.handle(newreq);
  }

  // intercept(request: HttpRequest<unknown>, next: HttpHandler){
  //   const authToken = this.authSrv.getToken();
  //   request = request.clone({
  //     setHeaders:{
  //       Authorization: 'Bearer' + authToken
  //     }
  //   });
  //   return next.handle(request);
  // }
}
