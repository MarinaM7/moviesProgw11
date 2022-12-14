import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movies } from 'src/app/models/movies';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  movies:Movies[] | undefined;

  constructor( private http: HttpClient) { }

  ngOnInit(): void {
    this.get().subscribe((res)=>{
      this.movies = res;
      console.log(this.movies);
    })
  }

  get(){
    let li = this.http.get<Movies[]>('http://localhost:4201/movies-popular');
    return li
  }

  like(){
    // Persona che mette like e il like va memorizzato nel json

  }

}



