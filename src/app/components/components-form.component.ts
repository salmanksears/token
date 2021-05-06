import {Component, OnInit,ViewChild }                      from '@angular/core';
import {FormBuilder, FormGroup, Validators}                from '@angular/forms';
import {CanDeactivate, Router, RouterLink, ActivatedRoute} from '@angular/router';
import {BasicValidators}                                   from '../shared/validators/basic-validators';
import {ComponentsService}                                 from './components.service';
import {CompUriService}                                    from './component-uri.service';
import {AuthService}                                       from '../shared/services/auth.service';
import {Components}                                        from './components';
import {RoleService}                                       from '../roles/roles.service';
import {SpinnerComponent}                                  from '../shared/components/spinner.component';
import {DialogModalComponent}                              from '../shared/components/dialog-modal.component';
import {Collapse}                                          from '../shared/components/collapse.component';
import {ComponentURI}                                      from './component-uri';
import {Role}                                              from '../roles/role';
import {ResponseMessageComponent}                          from '../shared/components/response-message.component';
import {BaseDomain}                                        from '../shared/components/base-domain.component';

@Component({
    templateUrl: 'app/components/components-form.component.html'
})
export class ComponentsFormComponent implements OnInit {

    @ViewChild(DialogModalComponent) confirmDialog : DialogModalComponent;  // DialogModalComponent is a ViewChild
    @ViewChild(ResponseMessageComponent) response : ResponseMessageComponent;

    form: FormGroup;
    title: string;
    components = new Components();
    componentsCopy = new Components();
    private _pristine = false;
    private isEditable = false;
    pageLoading = true;
    isCollapsedContent = true;
    compUri = new ComponentURI();
    isNew = false;
    newUri : string;
    selectedRoles = new Role();
    roleList = [];
    displayMsg = false;
    componentMessage : string;
    message : string;
    indexClicked = -1 ;
    componentUrlList = [];
    isUpdate = false;
    isCompUriUpdt = false;
    createGroup: FormGroup;
    showUpdate:boolean;
    baseDomain:BaseDomain;
    id:string;

    constructor(
        fb: FormBuilder,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _componentService: ComponentsService,
        private _authService: AuthService,
        private _roleService: RoleService,
        private _compUriService :CompUriService
    ) {
        this.form = fb.group({
            name: ['', Validators.compose([Validators.required,
                             BasicValidators.isAlpha])],
            sessionLife: ['', Validators.compose([Validators.required,
                             BasicValidators.isNumber])]
        });
        this.createGroup= fb.group({
            uri : ['',Validators.required]
        });
    }

    ngOnInit() {
        
        this.newUri = "";
        this._activatedRoute.params.subscribe(params => {
            this.id = params['id'];
        });

        this.title = this.id ? "Show Component" : "New Component";

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
                console.log('Service call finished.');
                console.log(this.roleList);
            }
        );
        if (!this.id){
          this.pageLoading = false;
          this.isNew = true;
          this.isEditable = true;
          return;
        }
        this.isEditable = false;
        this.showUpdate= true;
        this._componentService.getComponent(this.id)
            .subscribe(
            data => {
                this.components = data.comps[0];
                this.componentsCopy  = JSON.parse(JSON.stringify(this.components));
            },
            error => {
                alert('Error occured!');
                console.log('Error occured during service call');
            },
            () => {
                console.log('Service call finished.');
                console.log(this.components);
                this.showUpdate= this.components.responseFlag;
                if(!this.showUpdate){
                    this.message =this.components.responseMessage
                    this.response.showWarningMessage(this.message);
                }
                this.componentUrlList = this.components.uris;
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

    updateComponent() {
        var result;
        var operationCode;
        this.pageLoading = true;
        var compURI= new ComponentURI();
        if (this.components.compId) {
            this.components.updatedBy = this._authService.getUserName();
            this.components.uris = this.componentUrlList;
            result = this._componentService.updateComponent(this.components);
            operationCode = "Updated";
        }else {
            this.components.createdBy = this._authService.getUserName();
            this.components.updatedBy = this._authService.getUserName();
            this.components.uris = this.componentUrlList;
            result = this._componentService.addComponent(this.components)
            operationCode = "Created";
        }
        result.subscribe(x => {
            if(x.responseCode != '409'){
                this._pristine = true;
                this._router.navigate(['components', { compId : this.components.name, operation : operationCode }]);
            }else{
                this.message = "Component [" + this.components.name + "] already exist" ;
                this.response.showErrorMessage(this.message);
                this.pageLoading = false;
            }
        });
    }

     onConfirm(isDelete: any) {
        var result;
        if(isDelete === true){
            this.pageLoading = true;
            if (this.components.compId) {
                result = this._componentService.deleteComponent(this.components.compId);
                result.subscribe(x => {
                    if(x.responseCode != '409'){
                        this._pristine = true;
                        this._router.navigate(['components',{ compId : this.components.name, operation : "Deleted" }]);
                    }
                    else{
                        this.message = x.responseMessage;
                        this.response.showErrorMessage(this.message);
                        this.pageLoading = false;
                    }
             });
            }
        }else if(isDelete === "confirmDelUri"){
            this.pageLoading=true;
            result = this._compUriService.deleteCompUri(this.compUri.compUriId)
            result.subscribe(x => {
                    if(x.responseCode == '409'){
                        this.message =this.baseDomain.responseMessage;
                        this.response.showErrorMessage(this.message);
                        this.components.uris = this.componentUrlList;
                        this.pageLoading = false;
                    }
                    else{
                       this.response.showSuccessMsg("Component URI ["+ this.compUri.uri+"] Deleted Successfully");
                        this.pageLoading = false;
                        var index = this.componentUrlList.indexOf(this.compUri);
                        this.componentUrlList.splice(index,1);
                        this.components.uris = this.componentUrlList;
                    }
            });
        }
     }
    
    onChangeRole(selectElement) {
         if(selectElement != null){
             var role;
             role = this.roleList.filter(
                    result => result.authority == selectElement
             );
            this.compUri.role = role[0];
         }
    }
    
    editComponent(){
       this.title = "Edit Component";
       this.isEditable = true;
       this.isUpdate = true;
    }

    deleteComp(compUri : ComponentURI){
        var index = this.components.uris.indexOf(compUri);
        this.components.uris.splice(index,1);
    }

    removeComponent(){
        this.confirmDialog.showDialogMessage("Are you sure to delete [" + this.components.name +" ] Component");
    }

    resetForm(){
        this.components  = JSON.parse(JSON.stringify(this.componentsCopy));
    }

    createNewCompUri(){
        this.compUri = new ComponentURI();
        this.selectedRoles = new Role();
        this.selectedRoles.authority = 'default';
        this.isCompUriUpdt = false;
    }
    
    addCompUri(compUri : ComponentURI){
        this.componentUrlList.push(this.compUri);
        if(this.id)
        {
            var result;
            this.pageLoading=true;
            this.compUri.createdBy= this._authService.getUserName();
            this.compUri.updatedBy=this._authService.getUserName();
            this.compUri.compId=this.id;
            result = this._compUriService.addCompUri(this.compUri);
            result.subscribe(x => {
                    if(x.responseCode != '409'){
                        this.response.showSuccessMsg("Component URI Added Successfully");
                        this.pageLoading = false;
                        this.components.uris = this.componentUrlList;
                    }
                    else{
                        this.message = x.responseMessage;
                        this.response.showErrorMessage(this.message);
                        this.pageLoading = false;
                    }
            });
        }
    }
    
    deleteCompUri(compUri : ComponentURI){
        if(!this.id){
            var index = this.componentUrlList.indexOf(compUri);
            this.componentUrlList.splice(index,1);
        }
        else{
            this.compUri = compUri;
            this.confirmDialog.showCompUriDialogMessage("Are you sure to delete [" + compUri.uri +" ] Comp URI");
        }
    }

    updateCompUri(compUri : ComponentURI , index:number){
        this.compUri = JSON.parse(JSON.stringify(compUri));
        this.selectedRoles = this.compUri.role;
        this.indexClicked = index;
        this.isCompUriUpdt = true;
    }

    updateExistCompUri(compUri : ComponentURI){
        
        this.componentUrlList[this.indexClicked]= compUri;
        this.indexClicked= -1;
        if(this.id){ 
            var result;
            this.pageLoading=true;
            this.compUri.updatedBy= this._authService.getUserName();
            this.compUri.compId= this.id;
            result = this._compUriService.updateCompUri(compUri)
            result.subscribe(x => {
                    if(x.responseCode != '409'){
                         this.response.showSuccessMsg("Component URI Updated Successfully");
                        this.pageLoading = false;
                        this.components.uris = this.componentUrlList;
                    }else{
                        this.message = x.responseMessage;
                        this.response.showErrorMessage(this.message);
                        this.pageLoading = false;
                    }
            });
        }
    }
}