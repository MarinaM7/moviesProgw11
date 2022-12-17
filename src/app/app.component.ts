import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'moviesProgw11';

  user: any = [];

  constructor() {}

  ngOnInit(): void {
    let userLogged: any = localStorage.getItem('UserData');
    this.user = JSON.parse(userLogged);
  }
}
