import {Component, Input} from '@angular/core'
import { CommonModule}    from '@angular/common';
@Component({
    selector: 'logged-in-user-header',
     template: `
        <div class="logged-in-user-header">
            <div class="logged-in-user-header-header" (mouseover) = "expanded()" (click) = "toggle()">
               {{ name }}
              
            </div>
            <div [ngIf]="!isCollapsed">  
            <div class="logged-in-user-header-body" (mouseover) = "expanded()"
                    (click) = "collapsed()">
                    <ng-content select=".body"></ng-content>
            </div>
            </div> 
        </div>
    `,
    styles:[`
        .logged-in-user-header {
            width: 150px;
            border: 1px solid white;
        }
        
        .logged-in-user-header-header {
            width: 150px;
            height: 20px;
            cursor: pointer;
            color: white;
            padding: 0px 0px 0px 5px;
        }
        
        .logged-in-user-header-chevron {
            float: right;
            padding: 3px 6px 1px 1px;
        }
        
        .logged-in-user-header-body {
            width: 150px;
            border: 1px solid white;
            color: white;
            cursor: pointer;
            padding: 0px 0px 0px 5px;
        }
    `]   
})

export class LoggedInUserHeaderComponent{
    @Input() isCollapsed = true;
    @Input() name = "";
    
    toggle(){
        this.isCollapsed = !this.isCollapsed;
    }
    
    expanded(){
        this.isCollapsed = false;
    }
    
    collapsed(){
        this.isCollapsed = true;
    }
}