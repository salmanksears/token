import { NgModule }         from '@angular/core';
import { SpinnerComponent } from './spinner.component';
import { CommonModule }     from '@angular/common';

@NgModule({
  imports:      [ 
                    CommonModule
                ],
  
  declarations: [
                    SpinnerComponent
                ],
                
  providers:    [
                  
                ],
                
  exports:      [ 
                    SpinnerComponent
                ]
})

export class SpinnerModule{}