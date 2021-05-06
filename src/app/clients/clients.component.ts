import {Component,OnInit}                    from '@angular/core';
import {ClientService}                       from './clients.service';
import {RouterLink, Router, ActivatedRoute } from '@angular/router';
import {SpinnerComponent}                    from '../shared/components/spinner.component';
import {ResponseMessageComponent}            from '../shared/components/response-message.component';
import {ClientFilter}                        from '../shared/filters/client-filter';

@Component({
    templateUrl: 'app/clients/clients.component.html'
})

export class ClientsComponent implements OnInit{
     
   clients = [];
   pageLoading = true;
   anyClient = false;
   isEditable = false;
   displayMsg = false;
   clientMessage : String;
   messageType : String;
   message : String;
   selectClientId : String;
   rowsOnPage : Number;
   
   constructor(private _clientService: ClientService,
               private _router: Router,
               private _activatedRoute: ActivatedRoute){
    }

   ngOnInit(){
	
        this._activatedRoute.params.subscribe(params => {
            this.clientMessage = params['clientCode'];
        });
        this.display(this.clientMessage);
        this.rowsOnPage = 10;
		this._clientService.getClients()
       .subscribe(
            data => {
               this.clients = data.clients;
            },
            error => {
                alert('Error occured!');
                console.log('Error occured during service call');
                this.pageLoading = false;
            },
            ()=>{
                console.log('Service call finished.');
                console.log(this.clients);
                if(this.clients.length > 0){
                   this.pageLoading = false;
                   this.anyClient = true;
                }
            }
        );
	} 

    updateClient(client : any){
        this._router.navigate(['clients' ,'show', client.clientId]);
        console.log(client);
    }

    addNewClient(){
        this._router.navigate(['clients', 'new']);
    }

    over(client : any){
        this.selectClientId = client.clientId;
    }

    tableMouseOut(){
        this.selectClientId = null;
    }

    display(clientMessage){
        if(clientMessage != null && clientMessage.length > 0){
            var processType;
            this._activatedRoute.params.subscribe(params => {
                processType = params['operation'];
            });
            this.displayMsg = true;
            this.messageType = "SUCCESS";
            this.message = "Client " + this.clientMessage + " is " + processType + " successfully" ;
        }
    }
}
    