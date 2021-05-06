import {Component, OnInit,ViewChild }          from '@angular/core';
import {FormBuilder, FormGroup, Validators}    from '@angular/forms';
import {CanDeactivate, Router, ActivatedRoute} from '@angular/router';
import {BasicValidators}                       from '../shared/validators/basic-validators';
import {RoleService}                           from './roles.service';
import {AuthService}                           from '../shared/services/auth.service';
import {Role}                                  from './role';
import {SpinnerComponent}                      from '../shared/components/spinner.component';
import {DialogModalComponent}                  from '../shared/components/dialog-modal.component';
import {ResponseMessageComponent}              from '../shared/components/response-message.component';

@Component({
    templateUrl: 'app/roles/roles-form.component.html'
})
export class RoleFormComponent implements OnInit {

    @ViewChild(DialogModalComponent) confirmDialog : DialogModalComponent;  // DialogModalComponent is a ViewChild
    @ViewChild(ResponseMessageComponent) responseObj : ResponseMessageComponent;

    form: FormGroup;
    title: string;
    role = new Role();
    roleCopy = new Role();
    isNew : boolean;
    isUpdate : boolean;
    private _pristine = false;
    private isEditable = false;
    pageLoading = true;
    message : string;
    id : string;
    constructor(
        fb: FormBuilder,
        private _router: Router,
        private _activatedRoute : ActivatedRoute,
        private _roleService: RoleService,
        private _authService: AuthService
    ) {
         /*this.form = fb.group({
            authority: ['',  Validators.compose([Validators.required, Validators.minLength(5)])],
          }); */
    }

    ngOnInit() {

         this._activatedRoute.params.subscribe(params => {
            this.id = params['id'];
        });
        this.title = this.id ? "Show Roles" : "New Roles";

        if (!this.id){
          this.isEditable = true;
          this.pageLoading = false;
          this.isNew = true;
          return;
        }
        this.isEditable = false;
        this._roleService.getRole(this.id)
            .subscribe(
            data => {
                this.role = data.roles[0];
                this.roleCopy = JSON.parse(JSON.stringify( this.role));
            },
            error => {
                alert('Error occured!');
                console.log('Error occured during service call');
            },
            () => {
                console.log('Service call finished.');
                console.log(this.role);
                this.pageLoading = false;
            }
            );
    }

    routerCanDeactivate() {
        if (this.form.dirty && !this._pristine) {
            return confirm('You have unsaved changes. Are you sure you want to navigate away?');
        }
        return true;
    }

    updateRole() {
        var result;
        var operationCode;
        this.pageLoading = true;
        if (this.role.roleId) {
            this.role.updatedBy = this._authService.getUserName();
            result = this._roleService.updateRole(this.role);
            operationCode = "Updated";
        }else {
            this.role.createdBy = this._authService.getUserName();
            this.role.updatedBy = this._authService.getUserName();
            result = this._roleService.addRole(this.role)
            operationCode = "Created";
        }
        result.subscribe(x => {
            if(x.responseCode != '409'){
                this._pristine = true;
                this._router.navigate(['roles', { authority : this.role.authority, operation : operationCode }]);
            }else{
                this.message = "Role [" + this.role.authority + "] already exist" ;
                this.responseObj.showErrorMessage(this.message);
                this.pageLoading = false;
            }
        });
    }

    resetForm(){
        this.role = JSON.parse(JSON.stringify( this.roleCopy));
    }

    onConfirm(isDelete: boolean) {
        var result;
        if(isDelete){
            if (this.role.roleId) {
            result = this._roleService.deleteRole(this.role.roleId);
            result.subscribe(x => {
              this._pristine = true;
              this._router.navigate(['roles',{ authority : this.role.authority, operation : "Deleted" }]);
             });
            }
        }
     }

    editRole(){
       this.title = "Edit Roles";
       this.isEditable = true;
       this.isUpdate = true;
    }

    removeRole(){
        this.confirmDialog.showDialogMessage("Are you sure to delete [" + this.role.authority +" ] Role");
    }
}