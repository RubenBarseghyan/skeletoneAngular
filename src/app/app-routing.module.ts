import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import {HomeComponent} from './pages/home/home.component';
import {CinemaMoviesComponent} from './pages/cinema-movies/cinema-movies.component';
import {MoviePresentsComponent} from './pages/movie-presents/movie-presents.component';


import { AuthGuardService as AuthGuard } from './core/guard/auth-guard.service';
import { RoleGuardService as Boom } from './core/guard/role-guard.service';




const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'home/cinemas/:id', component: CinemaMoviesComponent},
  { path: 'home/cinemas/:cinemaId/moviepresent/:movieId', component: MoviePresentsComponent},
  { path: 'admin', loadChildren: './pages/admin/admin.module#AdminModule', canActivate: [Boom]},
  { path: '', redirectTo: 'home', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
