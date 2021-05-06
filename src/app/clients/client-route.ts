import { Router, RouterModule }   from '@angular/router';
import { ClientFormComponent }    from './clients-form.component';
import { ClientsComponent }       from './clients.component';

export const clientsRoutes = RouterModule.forChild([
    { path: '', component: ClientsComponent},
    { path: 'show/:id', component: ClientFormComponent},
    { path: 'new', component: ClientFormComponent}
]);