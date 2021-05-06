import {Injectable}  from '@angular/core';
import {RestService} from '../shared/services/rest.service';

@Injectable()
export class CompUriService {
	
	private _url = "/compuri";
		
	constructor(private _restService: RestService){
	}

	addCompUri(compuri){
		return this._restService.httpPost(this._url, compuri);
	}

	updateCompUri(compuri){
		return this._restService.httpPut(this.getComponentUrl(compuri.compUriId), compuri);
	}

	deleteCompUri(compUriId){
		return this._restService.httpDelete(this.getComponentUrl(compUriId));
	}

  	private getComponentUrl(getComponents){
		return this._url + "/" + getComponents;
	}
}