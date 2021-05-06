import {Component, Input} from '@angular/core';

@Component({
    selector: 'responseMessage',
    template: `
    	<div *ngIf="visible" class="{{divClass}}">
          <i class="{{iconClass}}"></i>
          {{ message }}
        </div>
    `
})
export class ResponseMessageComponent { 
    @Input() message = "";
    @Input() messageType = "";
    @Input() visible = false;
    
    divClass : String;
    iconClass : String;

    ngOnInit(){
        this.visible = true;
        if(this.messageType == "SUCCESS"){
            this.divClass = "isa_success";
            this.iconClass = "fa fa-check";
            
        }else if (this.messageType == "ERROR"){
            this.divClass = "isa_error";
        }
    } 

     showErrorMessage(msg: string) {
        this.message = msg;
        this.visible = true;
        this.divClass = "isa_error";
        this.iconClass = "fa fa-close";
     }

     showWarningMessage(msg: string){
        this.message = msg;
        this.visible = true;
        this.divClass = "isa_warning";
        this.iconClass = "fa fa-exclamation-circle";
     }

     showSuccessMsg(msg: string){
         this.message=msg;
         this.visible=true;
         this.divClass = "isa_success";
         this.iconClass = "fa fa-check";
     }
}