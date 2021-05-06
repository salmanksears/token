import { NgModule }     from '@angular/core';
import { Collapse }     from './collapse.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports:      [ 
                    CommonModule
                ],
  
  declarations: [
                    Collapse
                ],
                
  providers:    [
                  
                ],
                
  exports:      [ 
                    Collapse
                ]
})

export class CollapseModule{}