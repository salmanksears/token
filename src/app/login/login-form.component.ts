import {Component, OnInit}                   from '@angular/core';
import {FormBuilder, FormGroup, Validators}  from '@angular/forms';
import {CanDeactivate, Router, RouterModule} from '@angular/router';
import {SpinnerComponent}                    from '../shared/components/spinner.component';
import {LoginUser}                           from './login-user';
import {AuthService}                         from '../shared/services/auth.service';
import {EnvVarConfig}                        from '../shared/config/environment-config';
import {UserService}                         from '../users/user.service';
import {User}                                from '../users/user';
@Component({
    templateUrl: 'app/login/login-form.component.html',
})

export class LoginFormComponent implements OnInit {

    loginform: FormGroup;
    anyUser = false;
    loginUser = new LoginUser();
    user = new User();
    isLoginFailed = false;
    _isAuthorizedUser = true;
    _isAuthSerivceSuccess = false;
    pageLoading = false;
    constructor(
        fb: FormBuilder,
        private _router: Router,
        private _authService: AuthService,
        private _userService: UserService
    ) {
        this.loginform = fb.group({
            userId: ['', Validators.required],
            password: ['', Validators.required]
        });
    }
    ngOnInit() {
        //console.log('inside login form.....');
    }

    routerCanDeactivate() {
        return true;
    }

    login() {
        this.pageLoading = true;
        var uid = this.loginUser.userId;
        var pwd = this.loginUser.password;
        var base64Ldap = "Basic " + btoa(uid + ":" + pwd);
        var clientCode = EnvVarConfig.getEnvironmentVariable('tokenServClientCode');
        var clientSecret = btoa(EnvVarConfig.getEnvironmentVariable('tokenServClientSecret'));

        var base64Client = "Basic " + btoa(clientCode + ":" + clientSecret);

        this._authService.login(base64Ldap, base64Client, this.loginUser.userId).subscribe(
            success => {
                this._isAuthSerivceSuccess = true;
                this.isLoginFailed = false;
                this._userService.getUser(this.loginUser.userId).subscribe(
                    data => {
                        this.user = data.users[0];
                        if (this.user != null) {
                            this._authService.name.next(this.loginUser.userId);
                            this._authService.showNavBar.next(true);
                            this._isAuthorizedUser = true;
                            let lastAttemptNavigation = this._authService.getLastRouteAttempt();
                            if (lastAttemptNavigation != '')
                                this._router.navigateByUrl(lastAttemptNavigation);
                            else
                                this._router.navigate(['home']);
                        }else{
                             this._isAuthorizedUser = false;
                        }
                    },
                    error => {
                        console.log('Error occured during service call');
                        this.pageLoading = false;
                        this._isAuthorizedUser = false;
                    },
                    () => {
                        this.pageLoading = false;
                        console.log('Service call finished.');
                    });

            },
            error => {
                this.isLoginFailed = true;
                this.pageLoading = false;
            },
            () => {

            });

        if (this._isAuthSerivceSuccess) {

        }

    }
}