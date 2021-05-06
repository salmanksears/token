import {Injectable} from '@angular/core';
import {RestService} from '../shared/services/rest.service';

@Injectable()
export class ComponentsService {
	
	private _url = "/comp";
		
	constructor(private _restService: RestService){
	}

	getComponents(){
		return this._restService.httpGet(this._url);
	}
    
  	getComponent(compId){
		return this._restService.httpGet(this.getComponentUrl(compId));
	}
    
	addComponent(component){
		return this._restService.httpPost(this._url, component);
	}

	updateComponent(component){
		return this._restService.httpPut(this.getComponentUrl(component.compId), component);
	}

	deleteComponent(compId){
		return this._restService.httpDelete(this.getComponentUrl(compId));
	}

  	private getComponentUrl(getComponents){
		return this._url + "/" + getComponents;
	}
}