import {Component, OnInit,ViewChild }                      from '@angular/core';
import {FormBuilder, FormGroup, Validators,FormControl}    from '@angular/forms';
import {RouterLink, CanDeactivate, Router, ActivatedRoute} from '@angular/router';
import {BasicValidators}                                   from '../shared/validators/basic-validators';
import {ClientService}                                     from './clients.service';
import {AuthService}                                       from '../shared/services/auth.service';
import {Client}                                            from './client';
import {ClientAddress}                                     from './client-address'
import {SpinnerComponent}                                  from '../shared/components/spinner.component';
import {DialogModalComponent}                              from '../shared/components/dialog-modal.component';
import {Components}                                        from '../components/components';
import {ComponentsService}                                 from '../components/components.service';
import {Collapse}                                          from '../shared/components/collapse.component';
import {ResponseMessageComponent}                          from '../shared/components/response-message.component';
import {ComponentURI}                                      from '../components/component-uri'
@Component({
    templateUrl: 'app/clients/clients-form.component.html'
})
export class ClientFormComponent implements OnInit {

    @ViewChild(DialogModalComponent) confirmDialog : DialogModalComponent;  // DialogModalComponent is a ViewChild
    @ViewChild(ResponseMessageComponent) responseObj : ResponseMessageComponent;
    title: string;
    client = new Client();
    clientAddress = new ClientAddress();
    private _pristine = false;
    private isEditable = false;
    pageLoading = true;
    isNew = false;
    isUpdate = false;
    clientCopy = new Client();
    selectedComp = new Components();
    addComp = new Components();
    selComp = new Components();
    dummyComp = new Components();
    selectedCompList = [];
    componentList = [];
    componentListNA = [];
    message : string;
    isClose : boolean;
    isCollapsedContent = true;
    defaultTokenLife= "999999999999999";
    defTokenLifeFlag= false;
    clientAddressList=[];
    clientAddForm: FormGroup;
    clientCompFrom:FormGroup;
    isAddressUpdt=false;
    indexClicked = -1;
    indexClickedComp = -1;
    isCompUpdt = false;
    selectedUri = new ComponentURI();
    addUri = new ComponentURI();
    dummyUri = new ComponentURI();
    uriList = [];
    compList=[];
    addedUri = [];
    id : string;
   
    constructor(
        fb: FormBuilder,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _clientService: ClientService,
        private _authService: AuthService,
        private _componentsService : ComponentsService
    ) {
       
        
        /* this.clientAddForm = fb.group({
            ipAddress:['',Validators.compose([Validators.required,
                             BasicValidators.isNumber])],
            netMask:['', Validators.compose([Validators.required,
                             BasicValidators.isNumber])]
        });
        this.clientCompFrom = fb.group({
            selectedComp:['',Validators.compose([Validators.required,
                              BasicValidators.isComponentSelected])],
            selectedUri:['', Validators.compose([Validators.required,
                              BasicValidators.isCompUriSelected])]
        }); */
    }

    ngOnInit() {
        var isLoaded= false;
        this._activatedRoute.params.subscribe(params => {
            this.id = params['id'];
        });
        this.title = this.id ? "Show Clients" : "New Clients";
        this._componentsService.getComponents()
            .subscribe(
            data => {
              this.componentList = data.comps;
            },
            error => {
                alert('Error occured!');
                console.log('Error occured during service call');
                this.pageLoading = false;
            },
            ()=>{
                console.log('Service call finished.');
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
        this._clientService.getClient(this.id)
            .subscribe(
            data => {
                this.client = data.clients[0];
                this.clientCopy= JSON.parse(JSON.stringify(this.client));
                this.compList =  JSON.parse(JSON.stringify(this.clientCopy.comps));
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
                console.log('Service call finished.');
                if(isLoaded)
                    this.pageLoading = false;
                else 
                    isLoaded = true;
                this.clientAddressList = this.client.addresses;
            }
            );
    }

    routerCanDeactivate() {
        if (!this._pristine) {
            return confirm('You have unsaved changes. Are you sure you want to navigate away?');
        }
        return true;
    }

    addUpdateClient() {
        var result;
        var operationCode;
        this.pageLoading = true;
        this.selectedCompList = [];
        if (this.client.clientId) {
            this.client.updatedBy = this._authService.getUserName();
            this.client.comps = this.compList;
            this.client.addresses = this.clientAddressList;
            result = this._clientService.updateClient(this.client);
            operationCode = "Updated";
        }else {
            this.client.createdBy = this._authService.getUserName();
            this.client.updatedBy = this._authService.getUserName();
            this.client.comps = this.compList;  
            this.client.addresses = this.clientAddressList;
            result = this._clientService.addClient(this.client)
            operationCode = "Created";
        }
        result.subscribe(x => {
            if(x.responseCode != '409'){
                this._pristine = true;
                this._router.navigate(['clients', { clientCode : this.client.clientCode, operation : operationCode }]);
            }else{
                this.message = "Client [" + this.client.clientCode + "] already exist" ;
                this.responseObj.showErrorMessage(this.message);
                this.pageLoading = false;
            }
        });
    }

     onConfirm(isDelete: boolean) {
        var result;
        if(isDelete){
            this.pageLoading = true;
            if (this.client.clientId) {
            result = this._clientService.deleteClient(this.client.clientId);
            result.subscribe(x => {
            this._pristine = true;
            this._router.navigate(['clients',{ clientCode : this.client.clientCode, operation : "Deleted" }]);
            });
            }
        }
     }

    navigateToComp(comp:Components){
       this._router.navigate(['components', 'show' , comp.compId]);
    }

    editClient(){
       this.title = "Edit Clients";
       this.isEditable = true;
       this.isUpdate = true;
       this.clientAddressList = this.client.addresses;
    }

    removeClient(){
        this.confirmDialog.showDialogMessage("Are you sure to delete [" + this.client.clientCode +" ] Client");
    }

    resetForm(){
        this.client= JSON.parse(JSON.stringify( this.clientCopy));
        this.clientAddressList =  this.client.addresses;
        this.compList = JSON.parse(JSON.stringify( this.client.comps));
    }

    setDefTokenLife(flag){
        if(flag){
          this.client.tokenLife = this.defaultTokenLife;
          this.defTokenLifeFlag=true;
        }else{
          this.defTokenLifeFlag = false;
        }
    }

    //Methods for Performing opertion on Client Address starts
    saveClientAddress(clientAddress:ClientAddress){
       this.clientAddressList.push(clientAddress);
    }

    deleteClientAddress(clientAddress:ClientAddress){
        var index = this.clientAddressList.indexOf(clientAddress);
        this.clientAddressList.splice(index,1);
    }

    updateClientAddress(clientAddress:ClientAddress){
        this.clientAddressList[this.indexClicked]= clientAddress;
        this.indexClicked= -1;
    }

    addClientAddress(){
        this.clientAddress =   new ClientAddress();
        this.isAddressUpdt = false;
    }

    viewClientAdddress(clientAddress:ClientAddress,index:number){
        this.clientAddress=JSON.parse(JSON.stringify(clientAddress));
        this.isAddressUpdt=true;
        this.indexClicked= index;
    }
    //Methods for Performing opertion on Client Address ends

    //Methods for Performing operation on Client Components Starts
    addCompURI(){
        this.isCompUpdt = false;
        this.selectedComp = new Components();
        this.componentListNA =  JSON.parse(JSON.stringify(this.componentList));
        if(this.compList != null && this.compList.length > 0)
        {
            for (var i = 0; i < this.compList.length; i++) {
                this.selComp = this.compList[i];
                this.componentListNA = this.componentListNA.filter(
                    result => result.compId != this.selComp.compId
                );
            }
        }
    }
    
    deleteCompURI(component:Components){
        var index = this.compList.indexOf(component);
        this.compList.splice(index,1);
    }

    saveCompURI(){
        this.addComp = JSON.parse(JSON.stringify( this.selectedComp));
        this.addComp.uris = this.uriList;
        this.compList.push(JSON.parse(JSON.stringify(this.addComp)));
        this.addComp = new Components();
    }

    updateCompURI(){ 
        var updateComp = new Components();
        updateComp = JSON.parse(JSON.stringify( this.selectedComp));
        this.addedUri = this.addedUri.concat(this.uriList);
        updateComp.uris = this.addedUri ;
        this.compList[this.indexClickedComp] = JSON.parse(JSON.stringify( updateComp));
        updateComp = new Components();
        this.indexClickedComp = -1;
    }

    deleteURI(index:number){
        this.addedUri.splice(index,1);
    }

    setSelectedComp(selectElement){
        var component;
        component = this.componentList.filter(
                    result => result.name == selectElement
        );
        this.selectedComp = component[0];
        this.addComp = JSON.parse(JSON.stringify( this.selectedComp));
        this.addComp.uris = null;
    }

    setSelectedURI(selectElement){
        this.uriList = [];
        for (var i = 0; i < selectElement.options.length; i++) {
            var optionElement = selectElement.options[i];
            if (optionElement.selected == true) {          
                this.uriList.push(JSON.parse(JSON.stringify(this.selectedComp.uris[i])));   
            }
        }     
    }

    viewCompURI(comp:Components,index:number){
        this.isCompUpdt = true;
        this.addedUri = [];
        this.selectedComp = JSON.parse(JSON.stringify(comp)) ;
        this.addComp=JSON.parse(JSON.stringify(comp)) ;
        this.addedUri = JSON.parse(JSON.stringify(this.addComp.uris));
        var allUriList =[];
        var uriListNA= [];
        this.uriList =[];
        this.indexClickedComp = index;
        console.log("View comp" + this.componentList);
        for (var i = 0; i<this.componentList.length;i++){
           this.dummyComp =  this.componentList[i];
            if(this.dummyComp.compId === this.selectedComp.compId)
            {
               allUriList    = JSON.parse(JSON.stringify(this.dummyComp.uris));
               uriListNA = JSON.parse(JSON.stringify(this.dummyComp.uris));
               for (var i = 0; i < this.addedUri.length; i++) {
                 this.dummyUri = this.addedUri[i];
                 uriListNA = uriListNA.filter(
                    result =>  result.compUriId  != this.dummyUri.compUriId
                );
            }
              break;
            }
        }
        this.selectedComp.uris= uriListNA;
    }

    //Methods for Performing operation on Client Components Ends
}