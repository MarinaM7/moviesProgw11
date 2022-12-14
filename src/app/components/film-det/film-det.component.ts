import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movies } from 'src/app/models/movies';

@Component({
  selector: 'app-film-det',
  templateUrl: './film-det.component.html',
  styleUrls: ['./film-det.component.scss']
})
export class FilmDetComponent implements OnInit {

movie: Movies | undefined;
  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    console.log(id);
    this.get(id).subscribe((val)=>{
      this.movie = val;
    })
  }

  get(id:number){
    let li = this.http.get<Movies>(`http://localhost:4201/movies-popular/${id}`);
    return li
  }
}
