import { NgModule }             from '@angular/core';
import { DialogModalComponent } from './dialog-modal.component';
import { CommonModule }         from '@angular/common';

@NgModule({
  imports:      [ 
                    CommonModule
                ],
  
  declarations: [
                    DialogModalComponent
                ],
                
  providers:    [
                  
                ],
                
  exports:      [ 
                    DialogModalComponent
                ]
})

export class DialogModalModule{}