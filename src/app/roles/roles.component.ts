import {Component}                         from '@angular/core';
import {RoleService}                       from './roles.service';
import {RouterLink, Router,ActivatedRoute} from '@angular/router';
import {SpinnerComponent}                  from '../shared/components/spinner.component';
import {ResponseMessageComponent}          from '../shared/components/response-message.component';
import {RoleFilter}                        from '../shared/filters/role-filter';

@Component({
    templateUrl: 'app/roles/roles.component.html'
})

export class RolesComponent{
     
   roles = [];
   roleLoading = true;
   anyRole = false;
   isEditable = false;
   displayMsg = false;
   roleMessage : String;
   messageType : String;
   message : String;
   selectRoleId : String;
   rowsOnPage : Number;
   
   constructor(private _roleService: RoleService,
               private _router: Router,
               private _activatedRoute : ActivatedRoute){
    }

   ngOnInit(){
        this._activatedRoute.params.subscribe(params => {
            this.roleMessage = params['authority'];
        });
        this.display(this.roleMessage);
        this.rowsOnPage = 10;
		this._roleService.getRoles()
       .subscribe(
            data => {
              this.roles = data.roles;
            },
            error => {
                alert('Error occured!');
                console.log('Error occured during service call');
                this.roleLoading = false;
            },
            ()=>{
                console.log('Service call finished.');
                console.log(this.roles);
                if(this.roles.length > 0){
                   this.roleLoading = false;
                   this.anyRole = true;
                }
            }
        );
	} 

    updateRole(role : any){
        this._router.navigate(['roles' ,'show', role.roleId]);
        console.log(role);
    }

    addNewRole(){
        this._router.navigate(['roles', 'new']);
    }

    over(role : any){
        this.selectRoleId = role.roleId;
    }

    tableMouseOut(){
        this.selectRoleId = null;
    }

    display(roleMessage){
        if(roleMessage != null && roleMessage.length > 0){
            var processType;
            this._activatedRoute.params.subscribe(params => {
              processType = params['operation'];
            });
            this.displayMsg = true;
            this.messageType = "SUCCESS";
            this.message = "Role " + this.roleMessage + " is " + processType + " successfully" ;
        }
    }
}
    