import {Component,ViewEncapsulation} from '@angular/core';
import {RouterLink,Router}           from '@angular/router';
import {AuthService}                 from '../../shared/services/auth.service';
@Component({
    selector: 'navbar',
    templateUrl: 'app/root-page/navigation/navbar.component.html',
    encapsulation: ViewEncapsulation.None
})
export class NavBarComponent {

    isLoggedIn;
    showNavBar = false;
    constructor(private router : Router, 
                private _authService: AuthService) { 
               
             this._authService.showNavBar.subscribe(n => {
             this.isLoggedIn = n;
             if(this.isLoggedIn){
                 this.showNavBar = true;
             }else{
                 this.showNavBar = false;
             }
        });   
    }
    
 }