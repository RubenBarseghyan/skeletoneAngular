import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {Movies} from '../../core/models/interfaces/movies';
import {RepositoryService} from '../../core/services/repository.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-cinema-movies',
  templateUrl: './cinema-movies.component.html',
  styleUrls: ['./cinema-movies.component.scss']
})
export class CinemaMoviesComponent implements OnInit {
  public id: number;
  public subscribtion: Subscription;
  public allMoviesByCinemaId: Movies[] = [];


  constructor(private http: RepositoryService, activatedRoute: ActivatedRoute) {
    this.subscribtion = activatedRoute.params.subscribe(params => this.id = params.id);
  }

  ngOnInit() {
    this.showAllMoviesByCinemaId();
  }

  public showAllMoviesByCinemaId() {
    const url = 'api/cinemas/' + this.id;
    this.http.getData(url).subscribe((res: any) => {
      console.log(res);
      this.allMoviesByCinemaId = res.map((elem) => {
        return elem.movieId;
      });
      console.log(this.allMoviesByCinemaId);
    }, (error: any) => {
      console.log(error.message);
    });
  }

}
