import { Router, RouterModule }  from '@angular/router';
import { LoginFormComponent }    from '../login/login-form.component';

export const appRootRoute = RouterModule.forRoot([
    { 
         path: '', component: LoginFormComponent
    },     
    { 
        path: 'home', 
        loadChildren: './app/home/home.module#HomeModule'
    },
    
    { 
        path: 'roles', 
        loadChildren: './app/roles/roles.module#RolesModule' 
    },
    
    { 
        path: 'clients', 
        loadChildren: './app/clients/client.module#ClientModule' 
    },
    
    {
        path: 'components',
        loadChildren: './app/components/component.module#ComponentModule'  
    },
    
    {
        path: 'users',
        loadChildren: './app/users/user.module#UserModule'
    }
    
], { useHash: true });