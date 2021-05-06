import {Injectable}  from '@angular/core';
import {RestService} from '../shared/services/rest.service';

@Injectable()
export class UserService {
	
	private _url = "/users";
		
	constructor(private _restService: RestService){
	}

	getUsers(){
		return this._restService.httpGet(this._url);
	}
    
  	getUser(userId){
		return this._restService.httpGet(this.getUserUrl(userId));
	}
    
  	addUser(user){
		return this._restService.httpPost(this._url, user);
	}
    
  	updateUser(user){
		return this._restService.httpPut(this.getUserUrl(user.userId), user);
	}
    
  	deleteUser(userId){
		return this._restService.httpDelete(this.getUserUrl(userId));
	}
    
  	private getUserUrl(userId){
		return this._url + "/" + userId;
	}
}