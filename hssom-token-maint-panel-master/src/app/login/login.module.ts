import { NgModule }                        from '@angular/core';
import { FormsModule,ReactiveFormsModule}  from '@angular/forms';
import { AuthService }                     from '../shared/services/auth.service';
import { LoginFormComponent }              from  './login-form.component';
import { CommonModule }                    from '@angular/common';
import { SpinnerModule }                   from '../shared/components/spinner.module';
import { UserService }                     from '../users/user.service';
@NgModule({
  imports:      [ 
                    FormsModule,
                    ReactiveFormsModule,
                    CommonModule,
                    SpinnerModule
                ],
  
  declarations: [
                    LoginFormComponent
                ],
                
  providers:    [
                    AuthService,
                    UserService
                ],
                
  exports:      [ 
                ]
})

export class LoginModule{}