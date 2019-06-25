import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './component/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/login/login.component';
import { MaterialModule} from './shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RepositoryService } from './core/services/repository.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './pages/header/header.component';

// to add new module must import module and list it in imports

// jwt
import { JwtModule } from '@auth0/angular-jwt';
import {HttpConfigInterceptor} from './core/interceptor/httpconfig.interceptor';
export function tokenGetter() {
  return localStorage.getItem('currentUser');
}

// interceptors


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
      }
    }),
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }, RepositoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
