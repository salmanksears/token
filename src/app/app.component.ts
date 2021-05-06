import {Component}           from '@angular/core';
import {RouterModule}        from '@angular/router';
import {LoginFormComponent}  from '../app/login/login-form.component';

@Component({
    selector: 'maintenance-panel-app',
    template: `
     <div class="container">
        <header></header>
         <navbar></navbar>
         <router-outlet></router-outlet>
        </div>
    `,
})
export class AppComponent { 

}