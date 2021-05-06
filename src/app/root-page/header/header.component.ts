import {Component}                   from '@angular/core';
import {AuthService}                 from '../../shared/services/auth.service';
import {EnvVarConfig}                from '../../shared/config/environment-config';
import { Router, RouterModule }      from '@angular/router';
import { CommonModule }              from '@angular/common';
@Component({
    selector: 'header',
    templateUrl: 'app/root-page/header/header.component.html',
    styles:[`
        .navbar {margin-bottom: 1px !important;}
    `]
})

export class HeaderComponent{
    username;
    isCollapsed = true;
    displayName;
    showLoggedInUserDetails = false;
    applicationType = EnvVarConfig.getEnvironmentVariable('environmentType');

    constructor(private _authService: AuthService,
                private _router: Router){
             
             this._authService.name.subscribe(n => {
             this.username = n
             this.displayName = this._authService.getDisplayName();
             this.showLoggedInUserDetails = true;
             this.applicationType = EnvVarConfig.getEnvironmentVariable('environmentType');
         });
    }
    
    logout(){
        this.showLoggedInUserDetails = false;
        this._authService.setJWTToken(null);
        this._authService.showNavBar.next(false);
        this._authService.resetLoggedInDetails();
        this._router.navigate(['']);
    }

    toggle(){
        this.isCollapsed = !this.isCollapsed;
    }
    
    expanded(){
        this.isCollapsed = false;
    }
    
    collapsed(){
        this.isCollapsed = true;
    }
}