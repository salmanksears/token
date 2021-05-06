import {Component, Input} from '@angular/core';

@Component({
    selector: 'spinner',
    template: `
      <div *ngIf="visible" class="overlay">
    	<div class="loader"></div>
      </div>
    `
})
export class SpinnerComponent { 
    @Input() visible = true; 
}