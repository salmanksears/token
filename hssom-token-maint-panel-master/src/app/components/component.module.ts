import { NgModule }                 from '@angular/core';
import { FormsModule}               from '@angular/forms';
import { ReactiveFormsModule }      from '@angular/forms';
import { RestService }              from '../shared/services/rest.service';
import { ComponentsComponent }      from  './components.component';
import { ComponentsFormComponent }  from  './components-form.component';
import { CommonModule }             from '@angular/common';
import { ComponentsService }        from './components.service';
import { SpinnerModule }            from '../shared/components/spinner.module';
import { DataTableModule }          from 'angular2-datatable';
import { ResponseMessageModule }    from '../shared/components/response-message.module';
import { DialogModalModule }        from '../shared/components/dialog-modal.module';
import { ComponentFilter}           from '../shared/filters/component-filter';
import { CompUriService}            from './component-uri.service';
import { RoleService}               from '../roles/roles.service';
import { componentsRoutes}          from './components-route';
import { CollapseModule }           from '../shared/components/collapse.module';

@NgModule({
  imports:      [ 
                    FormsModule,
                    CommonModule,
                    componentsRoutes,
                    SpinnerModule,
                    DialogModalModule,
                    ReactiveFormsModule,
                    DataTableModule,
                    ResponseMessageModule,
                    CollapseModule
                ],
  
  declarations: [
                    ComponentsComponent,
                    ComponentsFormComponent,
                    ComponentFilter
                ],
                
  providers:    [
                    RestService,
                    ComponentsService,
                    CompUriService,
                    RoleService
                ],
                
  exports:      [ 
                ]
})

export class ComponentModule{}