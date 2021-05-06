import { NgModule }                 from '@angular/core';
import { ResponseMessageComponent } from './response-message.component';
import { CommonModule }             from '@angular/common';

@NgModule({
  imports:      [ 
                    CommonModule
                ],
  
  declarations: [
                    ResponseMessageComponent
                ],
                
  providers:    [
                  
                ],
                
  exports:      [ 
                    ResponseMessageComponent
                ]
})

export class ResponseMessageModule{}