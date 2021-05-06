import { Router, RouterModule }  from '@angular/router';
import { RolesComponent }        from  './roles.component';
import { RoleFormComponent }     from './roles-form.component';

export const rolesRoutes = RouterModule.forChild([
    { path: '', component: RolesComponent},
    { path: 'show/:id', component: RoleFormComponent},
    { path: 'new', component: RoleFormComponent}
]);