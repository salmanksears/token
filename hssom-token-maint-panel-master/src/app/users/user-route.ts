import { Router, RouterModule }  from '@angular/router';
import { UserComponent }         from  './user.component';
import { UserFormComponent }     from './user-form.component';

export const userRoutes = RouterModule.forChild([
    { path: '', component: UserComponent},
    { path: 'show/:id', component: UserFormComponent},
    { path: 'new', component: UserFormComponent}
]);