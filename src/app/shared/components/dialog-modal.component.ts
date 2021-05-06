import { Component,EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'dialog-message',
    template: `<div *ngIf="dialogMessageIsVisible" class="modal fade show in danger" id="myModal" role="dialog">
    <div class="modal-dialog modal-sm" style="margin-top:7%">

        <div class="modal-content modal-black-border">
            <div class="modal-header modal-header-custom">
                <button type="button" class="close" data-dismiss="myModal">&times;</button>
                <h4 class="modal-title">Are you sure ?</h4>
            </div>
            <div class="modal-body">
                <b><p>{{msg}}</p></b>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-success" (click)="confirmRequest()">Confirm</button>
                <button type="button" class="btn btn-default" (click)="hideDialogMsg()">Cancel</button>
            </div>
        </div>
    </div>
</div>`,
})

export class DialogModalComponent
{
    private msg: string;
    public  dialogMessageIsVisible : boolean;
    private compUriDelete : boolean;
    @Output() onConfirm = new EventEmitter<any>();

    showDialogMessage(msg: string) {
        this.msg = msg;
        this.dialogMessageIsVisible = true;
    }

    showCompUriDialogMessage(msg : string){
        this.msg = msg;
        this.dialogMessageIsVisible = true;
        this.compUriDelete = true;
    }

   confirmRequest() {
       if(this.compUriDelete)
         this.onConfirm.emit("confirmDelUri");
       else  
         this.onConfirm.emit(true);
       this.dialogMessageIsVisible = false;
   }

   hideDialogMsg() {
       this.dialogMessageIsVisible = false;
   }
}