import { NgModule }                   from '@angular/core';
import { BrowserModule }              from '@angular/platform-browser';
import {HttpModule, JsonpModule }     from '@angular/http';
import { RouterModule }               from '@angular/router'; 
import { Router }                     from '@angular/router';
import { FormsModule }                from '@angular/forms';
import { AppComponent }               from './app.component'
import { AuthService }                from './shared/services/auth.service';
import { RestService }                from './shared/services/rest.service';
import { appRootRoute }               from '../app/root-page/route-config';
import { HeaderComponent}             from './root-page/header/header.component';
import { NavBarComponent}             from './root-page/navigation/navbar.component';
import { LoginFormComponent}          from '../app/login/login-form.component';
import { LoginModule }                from './login/login.module';
@NgModule({
  imports:      [ 
                    BrowserModule,
                    HttpModule,
                    JsonpModule,
                    FormsModule,
                    RouterModule,
                    LoginModule,
                    appRootRoute
                ],
  
  declarations: [ 
                    AppComponent,
                    HeaderComponent,
                    NavBarComponent
                ],
                
  providers:    [
                    AuthService,
                    RestService
                ],
  
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
