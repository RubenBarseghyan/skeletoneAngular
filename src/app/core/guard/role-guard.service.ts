import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';
import {CanActivate, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) { }

  canActivate(): boolean {
    if (!this.auth.isAdminAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
