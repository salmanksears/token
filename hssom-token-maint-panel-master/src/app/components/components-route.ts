import { Router, RouterModule }    from '@angular/router';
import { ComponentsFormComponent } from './components-form.component';
import { ComponentsComponent }     from './components.component';

export const componentsRoutes = RouterModule.forChild([
    { path: '', component: ComponentsComponent},
    { path: 'show/:id', component: ComponentsFormComponent},
    { path: 'new', component: ComponentsFormComponent}
]);