import {Injectable}  from '@angular/core';
import {RestService} from '../shared/services/rest.service';

@Injectable()
export class ClientService {
	
	private _url = "/clients";
		
	constructor(private _restService: RestService){
	}

	getClients(){
		return this._restService.httpGet(this._url);
	}
    
  	getClient(clientId){
		return this._restService.httpGet(this.getClientUrl(clientId));
	}
    
	addClient(client){
		return this._restService.httpPost(this._url, client);
	}

	updateClient(client){
		return this._restService.httpPut(this.getClientUrl(client.clientId), client);
	}

	deleteClient(clientId){
		return this._restService.httpDelete(this.getClientUrl(clientId));
	}

  	private getClientUrl(clientId){
		return this._url + "/" + clientId;
	}
	
	getCompNAClient(clientId){
		return this._restService.httpGet(this._url+"/compNAClient/"+clientId);
	}
}