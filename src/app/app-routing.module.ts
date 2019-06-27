import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import {HomeComponent} from './pages/home/home.component';
import {CinemaMoviesComponent} from './pages/cinema-movies/cinema-movies.component';


import { AuthGuardService as AuthGuard } from './core/guard/auth-guard.service';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'home/cinemas/:id', component: CinemaMoviesComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
