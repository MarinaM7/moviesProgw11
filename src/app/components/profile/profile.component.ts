import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user:any = [];

  constructor() { }

  ngOnInit(): void {
    let userLogged:any = localStorage.getItem("UserData");
    this.user = JSON.parse(userLogged)
  }

}
