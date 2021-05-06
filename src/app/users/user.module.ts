import { NgModule }             from '@angular/core';
import { FormsModule }          from '@angular/forms';
import { RestService }          from '../shared/services/rest.service';
import { UserComponent }        from './user.component';
import { UserFormComponent }    from './user-form.component'; 
import { CommonModule }         from '@angular/common';
import { UserService }          from './user.service';
import { SpinnerModule }        from '../shared/components/spinner.module';
import { DataTableModule }      from 'angular2-datatable';
import { ResponseMessageModule} from '../shared/components/response-message.module';
import { DialogModalModule }    from '../shared/components/dialog-modal.module';
import { CollapseModule }       from '../shared/components/collapse.module';
import { UserFilter}            from '../shared/filters/user-filter';
import { RoleService}           from '../roles/roles.service';
import { ComponentsService}     from '../components/components.service';
import { userRoutes }           from './user-route';

@NgModule({
  imports:      [ 
                    FormsModule,
                    CommonModule,
                    userRoutes,
                    SpinnerModule,
                    DialogModalModule,
                    DataTableModule,
                    ResponseMessageModule,
                    CollapseModule
                ],
  
  declarations: [
                    UserComponent,
                    UserFormComponent,
                    UserFilter
                ],
                
  providers:    [
                    RestService,
                    UserService,
                    RoleService,
                    ComponentsService
                ],
                
  exports:      [ 
                ]
})

export class UserModule{}