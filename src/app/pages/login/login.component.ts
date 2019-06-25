import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RepositoryService} from '../../core/services/repository.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public userFormLogin: FormGroup;
  public errorMes: string;
  public isLoad = false;

  constructor(private  http: RepositoryService, private router: Router) { }

  ngOnInit() {
    this.userFormLogin = new FormGroup({
      userEmail: new FormControl('', [ Validators.required, Validators.pattern('[a-zA-Z_]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}')]),
      userPassword: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(10)])
    });
  }
  public onSubmit() {
    const url: string = 'api/user/login';
    const body  = this.userFormLogin.getRawValue();
    this.http.create(url, body).subscribe((res: any) => {
      console.log('login');
      if(res.token){
        localStorage.setItem('userInfo', JSON.stringify(res));
      }
      if (res.role === 'user') {
        this.router.navigate(['home']);
      } else {
        this.router.navigate(['admin']); }

    }, error => this.errorMes = error.message);
  }
}
