import { Component, OnInit } from '@angular/core';
import {RepositoryService} from '../../core/services/repository.service';
import {Cinema} from '../../core/models/interfaces/cinema';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public cinemaBuildings: Cinema [] = [];

  constructor(private http: RepositoryService) { }

  ngOnInit() {
    this.getAllCinemaClientSide();
  }

  public getAllCinemaClientSide(): void {
    const url = 'api/cinemas';
    this.http.getData(url).subscribe((data: any) => {
      this.cinemaBuildings = data;
      console.log(this.cinemaBuildings, 'all cinemas');
    });
  }
}
