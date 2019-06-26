import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RepositoryService} from '../../core/services/repository.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  private userFormRegister: FormGroup;
  public isLoad = false;
  public formControlNameMsg = 'Username length must be 4-15 symbols';
  public formControlEmailMsg = 'not valid email';
  public formControlPassMsg = 'Username length must be 4-15 symbols';
  public comparePass = 'Comfirm password not match to password';
  public emailErrMsgFromBackend: string;

  constructor(private http: RepositoryService, private router: Router) {
  }

  ngOnInit() {
    this.userFormRegister = new FormGroup({
      userName: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]),
      userEmail: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z_]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}')]),
      userPassword: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(15), Validators.pattern('')]),
      userPasswordConfirm: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    this.isLoad = true;
    const url = 'api/user/register';
    const body = this.userFormRegister.getRawValue();
    this.http.create(url, body).subscribe((res: any) => {
      console.log('registration complete');
      if (res.token) {
        localStorage.setItem('userInfo', JSON.stringify(res));
        this.userFormRegister.reset();
        this.router.navigate(['home']);
      }
    }, (error) => {
      this.isLoad = false;
      this.emailErrMsgFromBackend = error.error.message;
    });
  }
}
