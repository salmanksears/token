import {Injectable}  from '@angular/core';
import {RestService} from '../shared/services/rest.service';

@Injectable()
export class RoleService {
	
	private _url = "/roles";
		
	constructor(private _restService: RestService){
	}

	getRoles(){
		return this._restService.httpGet(this._url);
	}
    
  	getRole(roleId){
		return this._restService.httpGet(this.getRoleUrl(roleId));
	}
    
	addRole(role){
		return this._restService.httpPost(this._url, role);
	}

	updateRole(role){
		return this._restService.httpPut(this.getRoleUrl(role.roleId), role);
	}

	deleteRole(roleId){
		return this._restService.httpDelete(this.getRoleUrl(roleId));
	}

  	private getRoleUrl(roleId){
		return this._url + "/" + roleId;
	}
}