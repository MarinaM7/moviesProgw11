import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(public authSrv: AuthService, public router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authSrv.isLoggedIn$.pipe(
      take(1),
      map((isLoggedin) => {
        if (isLoggedin) {
          return true;
        }
        return this.router.createUrlTree(['/login']);
      })
    );
  }
  //   if(this.authSrv.isLoggedIn !== true){
  //     window.alert('Access not allowed!');
  //     this.router.navigate(['/login']);
  //   }
  // return true;
}
