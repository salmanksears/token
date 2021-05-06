import {Component, OnInit,ViewChild }                   from '@angular/core';
import {FormBuilder, FormGroup, Validators}             from '@angular/forms';
import {CanDeactivate,Router,ActivatedRoute,RouterLink} from '@angular/router';
import {BasicValidators}                                from '../shared/validators/basic-validators';
import {UserService}                                    from './user.service';
import {RoleService}                                    from '../roles/roles.service';
import {ComponentsService}                              from '../components/components.service';
import {AuthService}                                    from '../shared/services/auth.service';
import {User}                                           from './user';
import {SpinnerComponent}                               from '../shared/components/spinner.component';
import {DialogModalComponent}                           from '../shared/components/dialog-modal.component';
import {Collapse}                                       from '../shared/components/collapse.component';
import {Role}                                           from '../roles/role';
import {Components}                                     from '../components/components';
import {CompUser}                                       from './comp-user';
import {CompUserRole}                                   from './comp-user-role';
import {ResponseMessageComponent}                       from '../shared/components/response-message.component';

@Component({
    templateUrl: 'app/users/user-form.component.html'
})
export class UserFormComponent implements OnInit {

    @ViewChild(DialogModalComponent) confirmDialog : DialogModalComponent;  // DialogModalComponent is a ViewChild
    @ViewChild(ResponseMessageComponent) responseObj : ResponseMessageComponent; 
    title: string;
    user = new User();
    userCopy = new User();
    private _pristine = false;
    private isEditable = false;
    pageLoading = true;
    isNew = false;
    roleList = [];
    roleListNA=[];
    message : string;
    compListNAUser = [];
    componentList = [];
    selectedRole = new Role();
    selectedComp = new Components();
    isUpdate = false;
    hasRole : boolean;
    isCollapsedContent = true;
    isCompUpdt = false;
    compUser = new CompUser();
    compUserRole = new CompUserRole();
    compUserList = [];
    indexClicked = -1;
    addedRole = [];
    selRoleList = [];
    id : string;
    constructor(
        fb: FormBuilder,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _userService: UserService,
        private _roleService: RoleService,
        private _authService: AuthService,
        private _componentService : ComponentsService
    ) {
        /* this.form = fb.group({
            userName : ['', Validators.required]
          });
          this.CreateGroup= fb.group({
            selectedCompCtr:['',Validators.compose([Validators.required,
                              BasicValidators.isComponentSelected])],
            selectedRoles:['',Validators.compose([Validators.required,
                              BasicValidators.isRoleSelected])]
            
        }); */
    }

    ngOnInit() {
        var isLoaded= false;
        this._activatedRoute.params.subscribe(params => {
            this.id = params['id'];
         });
        this.title = this.id ? "Show User" : "New User";
        // fetch all roles
        this._roleService.getRoles()
            .subscribe(
            data => {
              this.roleList = data.roles;
            },
            error => {
                alert('Error occured!');
                console.log('Error occured during service call');
            },
            ()=>{
                console.log(' role Service call finished.');
                console.log(this.roleList);
                this.roleListNA = JSON.parse(JSON.stringify(this.roleList));
            }
        );
        //fetch all components
        this._componentService.getComponents()
            .subscribe(
            data => {
              this.componentList = data.comps;
            },
            error => {
                alert('Error occured!');
                console.log('Error occured during service call');
                
            },
            ()=>{
                console.log(' component Service call finished.');
                console.log(this.componentList);
                if(!this.id)
                this.pageLoading = false;
                else if(this.id && isLoaded)
                this.pageLoading = false;
                else if(this.id)
                isLoaded = true;
            }
        );
        if (!this.id){
          this.isNew = true;
          this.isEditable = true;
          return;
        }
        this.isEditable = false;
        this._userService.getUser(this.id)
            .subscribe(
            data => {
                this.user = data.users[0];
                this.userCopy= JSON.parse(JSON.stringify(this.user));
                this.compUserList = JSON.parse(JSON.stringify(this.user.compUser));
            },
            error => {
                alert('Error occured!');
                console.log('Error occured during service call');
                if(isLoaded)
                this.pageLoading = false;
                else 
                isLoaded = true;
            },
            () => {
                console.log('user Service call finished.');
                console.log(this.user);
                if(isLoaded)
                this.pageLoading = false;
                else 
                isLoaded = true;
            }
            );
    }

    routerCanDeactivate() {
        if (!this._pristine) {
            return confirm('You have unsaved changes. Are you sure you want to navigate away?');
        }
        return true;
    }
   
   onChangeComp(selectElement) {
        if(selectElement != null){
          var component;
          component = this.componentList.filter(
                result => result.name == selectElement
            );
          this.selectedComp = component[0];
        }
    }

    updateUser() {
        var result;
        var operationCode;
        var roles = [];
        this.pageLoading = true;
        var components = [];
      
        if(this.user.userId){
            operationCode = "Updated";
            this.user.updatedBy = this._authService.getUserName();
            this.compUser.compId = this.selectedComp.compId; 
            this.user.compUser = this.compUserList;
            result = this._userService.updateUser(this.user);
        }else{
            operationCode = "Created";
            this.user.createdBy = this._authService.getUserName();
            this.user.updatedBy = this._authService.getUserName();
            this.user.compUser =  this.compUserList;
            result = this._userService.addUser(this.user);
        }
        result.subscribe(x => {
            if(x){
                this._pristine = true;
                this._router.navigate(['users', { userName : this.user.userName, operation : operationCode }]);
            }else{
                this.message = "User [" + this.user.userName + "] already exist" ;
                this.responseObj.showErrorMessage(this.message);
                this.pageLoading = false;
            }
        });
    }

     onConfirm(isDelete: boolean) {
        var result;
        this.pageLoading = true;
        if(isDelete){
            if (this.user.userId) {
            result = this._userService.deleteUser(this.user.userId);
            result.subscribe(x => {
            this._pristine = true;
            this._router.navigate(['users',{ userName : this.user.userName, operation : "Deleted" }]);
            });
            }
        }
     }

    editUser(){
        this.title = "Edit User";
        this.isEditable = true;
        this.isUpdate = true;
        var compUser = new CompUser();
        //remove the component which are alreat associated 
        for (var i = 0; i < this.user.compUser.length; i++) {
             compUser = this.user.compUser[i];
             this.componentList = this.componentList.filter(
                result => result.compId != compUser.compId
             );
        }
    }

    removeUser(){
        this.confirmDialog.showDialogMessage("Are you sure to delete [" + this.user.userName +" ] User");
    }

    resetForm(){
        this.user= JSON.parse(JSON.stringify( this.userCopy));
        this.compUserList =  JSON.parse(JSON.stringify(this.user.compUser));
        this.hasRole = true;
    }

    addNewComp(){
         this.selectedRole = new Role();
         this.selectedComp = new Components();
         this.compUser = new CompUser();
         this.compUserRole = new CompUserRole();
         this.selectedComp.compId = 'default';
         this.selectedRole.authority='default';
         this.isCompUpdt = false;
         this.roleListNA = JSON.parse(JSON.stringify(this.roleList));
    }

    addNewCompRole(){
        this.compUser.compId= this.selectedComp.compId;
        this.compUser.compName= this.selectedComp.name;
        this.compUser.compUserRole= this.selRoleList;
        this.componentList = this.componentList.filter(
            result => result.compId != this.selectedComp.compId
        );
        this.compUserList.push(this.compUser);
    }

    viewCompRole(compUser:CompUser,index:number){
        this.addedRole=[];
        this.selRoleList=[];
       var compUserRole = new CompUserRole();
        this.compUser = JSON.parse(JSON.stringify(compUser));
        this.addedRole=JSON.parse(JSON.stringify(this.compUser.compUserRole));

        this.roleListNA = JSON.parse(JSON.stringify(this.roleList));
        if(this.roleListNA  != null && this.roleListNA.length > 0){
            for(var i=0;i<this.addedRole.length;i++) {
                compUserRole =this.addedRole[i]; 
                this.roleListNA =this.roleListNA.filter(
                    result =>  result.roleId  != compUserRole.role.roleId

                );
            }
        }

        this.indexClicked = index;
        this.selectedComp.compId=compUser.compId;
        this.selectedComp.name= compUser.compName;
        this.selectedRole = this.compUserRole.role;
        this.isCompUpdt = true;
    }

    updateCompRole() {
        this.compUser.compId= this.selectedComp.compId;
        this.compUser.compName= this.selectedComp.name;
        this.addedRole = this.addedRole.concat(this.selRoleList);
        this.compUser.compUserRole = this.addedRole;
        this.compUserList[this.indexClicked]=this.compUser;
    }

    deleteCompRole(compUser:CompUser){
        var index = this.compUserList.indexOf(compUser);
        this.compUserList.splice(index,1);
    }

    deleteRoleFromList(index:number){
        this.addedRole.splice(index,1);
    }

    setSelectedRole(selectElement){
        this.selRoleList = [];
        var compUserRole = new CompUserRole();
        for (var i = 0; i < selectElement.options.length; i++) {
            var optionElement = selectElement.options[i];
            if (optionElement.selected == true) {          
                  compUserRole.role  = this.roleListNA[i];
                this.selRoleList.push(JSON.parse(JSON.stringify(compUserRole)));   
            }
        }     
    }
}