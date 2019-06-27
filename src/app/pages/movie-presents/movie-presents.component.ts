import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {Movies} from '../../core/models/interfaces/movies';
import {RepositoryService} from '../../core/services/repository.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-movie-presents',
  templateUrl: './movie-presents.component.html',
  styleUrls: ['./movie-presents.component.scss']
})
export class MoviePresentsComponent implements OnInit {
  private id;
  public subscribtion: Subscription;
  public theMovie: Movies;

  constructor(private http: RepositoryService,
              private activatedRoute: ActivatedRoute,
              private sanitizer: DomSanitizer) {
    this.subscribtion = activatedRoute.params.subscribe(params => this.id = params.movieId);
  }
  // in params there is two values cinemaId and movieId

  ngOnInit() {
    this.getMoviesById();
  }

  public getMoviesById() {
    const url = 'api/movies/' + this.id;
    this.http.getData(url).subscribe((data: any) => {
      this.theMovie = data[0];
      console.log(this.theMovie);
    }, (error) => {
      console.log(error);
    });
  }

}
