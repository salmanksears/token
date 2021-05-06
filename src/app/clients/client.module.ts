import { NgModule }             from '@angular/core';
import { FormsModule }          from '@angular/forms';
import { ReactiveFormsModule }  from '@angular/forms';
import { RestService }          from '../shared/services/rest.service';
import { ClientsComponent }     from  './clients.component';
import { CommonModule }         from '@angular/common';
import { ClientService }        from './clients.service';
import { ClientFilter}          from '../shared/filters/client-filter';
import { ComponentsService}     from '../components/components.service';
import { clientsRoutes }        from './client-route';
import { ClientFormComponent }  from './clients-form.component';
import { SpinnerModule }        from '../shared/components/spinner.module';
import { DataTableModule }      from 'angular2-datatable';
import { ResponseMessageModule} from '../shared/components/response-message.module';
import { DialogModalModule }    from '../shared/components/dialog-modal.module';
import { CollapseModule }       from '../shared/components/collapse.module';

@NgModule({
  imports:      [ 
                    FormsModule,
                    CommonModule,
                    clientsRoutes,
                    SpinnerModule,
                    ReactiveFormsModule,
                    DialogModalModule,
                    DataTableModule,
                    ResponseMessageModule,
                    CollapseModule
                ],
  
  declarations: [
                    ClientsComponent,
                    ClientFormComponent,
                    ClientFilter
                ],
                
  providers:    [
                    RestService,
                    ClientService,
                    ComponentsService
                ],
                
  exports:      [ 
                ]
})

export class ClientModule{}