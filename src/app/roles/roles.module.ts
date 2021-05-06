import { NgModule }                       from '@angular/core';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { RestService }                    from '../shared/services/rest.service';
import { RolesComponent }                 from  './roles.component';
import { RoleFormComponent }              from './roles-form.component';
import { CommonModule }                   from '@angular/common';
import { Collapse}                        from '../shared/components/collapse.component';
import { RoleService }                    from './roles.service';
import { DialogModalComponent}            from '../shared/components/dialog-modal.component';
import { RoleFilter}                      from '../shared/filters/role-filter';
import { rolesRoutes }                    from './roles-route';
import { SpinnerModule }                  from '../shared/components/spinner.module';
import { DataTableModule }                from 'angular2-datatable';
import { ResponseMessageModule }          from '../shared/components/response-message.module';
import { DialogModalModule }              from '../shared/components/dialog-modal.module';

@NgModule({
  imports:      [ 
                    FormsModule,
                    ReactiveFormsModule,
                    CommonModule,
                    rolesRoutes,
                    DialogModalModule,
                    SpinnerModule,
                    DataTableModule,
                    ResponseMessageModule
                ],
  
  declarations: [
                    RolesComponent,
                    RoleFilter,
                    RoleFormComponent
                ],
                
  providers:    [
                    RestService,
                    RoleService
                ],
                
  exports:      [ 
                ]
})

export class RolesModule{}