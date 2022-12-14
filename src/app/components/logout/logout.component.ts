import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/serivces/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private router:Router, private authSrv:AuthService) { }

  ngOnInit(): void {
    this.authSrv.authSubject.next(null);
    localStorage.removeItem('UserData');
    localStorage.removeItem('user');
    this.authSrv.logged=false;
    this.router.navigate(['/login'])
  }
  ngOnChanges(){
    this.router.navigate(['/login'])
   }

}
