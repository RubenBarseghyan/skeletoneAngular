import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RepositoryService} from '../../core/services/repository.service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public userFormLogin: FormGroup;
  public  formControlEmailMsg = 'Not Valid Email';
  public  formControlPassMsg = 'password length must be 4-15 symbols';
  public emailErrMsgFromBackend: string;
  public passErrMsgFromBackend: string;
  public isLoad = false;

  constructor(private  http: RepositoryService, private router: Router) { }

  ngOnInit() {
    this.userFormLogin = new FormGroup({
      userEmail: new FormControl('', [ Validators.required, Validators.pattern('[a-zA-Z_]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}')]),
      userPassword: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(15)])
    });
  }
  public onSubmit() {
    this.isLoad = true;
    const url = 'api/user/login';
    const body  = this.userFormLogin.getRawValue();
    this.http.create(url, body).subscribe((res: any) => {
      console.log('login');
      if (res.token) {
        localStorage.setItem('userInfo', JSON.stringify(res));
      }
      if (res.role === 'user') {
        this.router.navigate(['home']);
      } else {
        this.router.navigate(['admin']); }

    }, (error) => {
      this.isLoad = false;
      if (error.status === '404') {
        this.emailErrMsgFromBackend = error.error.message;
      } else {
        this.passErrMsgFromBackend = error.error.message;
      }
    });
    // error message comes from backend we only draw it
  }
}
