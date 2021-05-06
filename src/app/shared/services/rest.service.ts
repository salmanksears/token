import {Injectable}                    from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable}                    from 'rxjs/Rx';
import {AuthService}                   from './auth.service';
import {EnvVarConfig}                  from '../config/environment-config';
import {LoginResponse}                 from '../../login/login-response';
import {AuthHttp, JwtHelper, tokenNotExpired} from 'angular2-jwt';

@Injectable()
export class RestService{
    
    private authURL =  EnvVarConfig.getEnvironmentVariable('endPointAuth');
    tokenMaintClientID = "authPanel";
    tokenMaintUserID = this._authService.getUserName();
    private tokenExpErrorData="{\"responseCode\":\"99\",\"responseMessage\":\"Token regenerate failure\",\"messages\":[\"Token expired\"],\"messagesAsSet\":[\"Token expired\"]}";

    constructor(private _http: Http,
        private _authService: AuthService) {
	}
    
    httpGet(url: string){
       if(this.isTokenExpired()==false){
                return this._http.get(this._resolveUrl(url), this._getServiceHeader()).map(res => res.json()).catch((error : any) => Observable.throw(error.json()));
           } else{
                return this.regenerateToken().
                flatMap(
                    result => {
                        var loginResponse = new LoginResponse();
                        loginResponse = JSON.parse(JSON.stringify(result));
                        var token = loginResponse.token;
                        this._authService.setJWTToken(token);
                        return this._http.get(this._resolveUrl(url), this._getServiceHeader()).map(res => res.json()).catch((error : any) => Observable.throw(error.json()));
                    }
                );
            }
    }
    
    httpPost(url: string, requestObj: any){
        if(this.isTokenExpired()==false){
                 return this._http.post(this._resolveUrl(url), JSON.stringify(requestObj),this._getServiceHeader()).map(res => res.json()).catch((error : any) => Observable.throw(error.json()));
           } else{
                return this.regenerateToken().
                flatMap(
                    result => {
                        var loginResponse = new LoginResponse();
                        loginResponse = JSON.parse(JSON.stringify(result));
                        var token = loginResponse.token;
                        this._authService.setJWTToken(token);
                          return this._http.post(this._resolveUrl(url), JSON.stringify(requestObj),this._getServiceHeader()).map(res => res.json()).catch((error : any) => Observable.throw(error.json()));
                    }
                );
         }
    }
    
    httpPut(url: string, requestObj: any){
         if(this.isTokenExpired()==false){
                 return this._http.put(this._resolveUrl(url), JSON.stringify(requestObj),this._getServiceHeader()).map(res => res.json()).catch((error : any) => Observable.throw(error.json()));
           } else{
                return this.regenerateToken().
                flatMap(
                    result => {
                        var loginResponse = new LoginResponse();
                        loginResponse = JSON.parse(JSON.stringify(result));
                        var token = loginResponse.token;
                        this._authService.setJWTToken(token);
                        return this._http.put(this._resolveUrl(url), JSON.stringify(requestObj),this._getServiceHeader()).map(res => res.json()).catch((error : any) => Observable.throw(error.json()));
                    }
                );
         }
	}
    
    httpDelete(url: string){
         if(this.isTokenExpired()==false){
                return this._http.delete(this._resolveUrl(url),this._getServiceHeader()).map(res => res.json()).catch((error : any) => Observable.throw(error.json()));
           } else{
                return this.regenerateToken().
                flatMap(
                    result => {
                        var loginResponse = new LoginResponse();
                        loginResponse = JSON.parse(JSON.stringify(result));
                        var token = loginResponse.token;
                        this._authService.setJWTToken(token);
                        return this._http.delete(this._resolveUrl(url),this._getServiceHeader()).map(res => res.json()).catch((error : any) => Observable.throw(error.json()));
                    }
                );
           
            }
	}
    
    private _resolveUrl(url: string){
        return EnvVarConfig.getEnvironmentVariable('endPointService') + url;
    }

    private _getServiceHeader(): RequestOptions{
        let _headers = new Headers({ "Content-Type": "application/json" });
        let origToken = this._authService.getJWTToken(); 
        let authHeaders = new Headers(_headers);
        authHeaders.append('clientid', this.tokenMaintClientID);
        authHeaders.append('userid', this._authService.getUserName());
        authHeaders.append('Accept', "application/json");
        authHeaders.append("Authorization", "Bearer "+origToken);
        return new RequestOptions({ headers: authHeaders });
	}

    private isTokenExpired(){
        var jwtHelper = new JwtHelper();
        var tokenExpired = jwtHelper.isTokenExpired( this._authService.getJWTToken())
        if(tokenExpired){
            return true;
        }
        return false;
    }

     regenerateToken(){
           var base64Client = this._authService.getBase64EncodedClient();
           var base64LDAP = this._authService.getBase64LDAP();
           return this._http.get(this.authURL, this.authURL.getAuthHeader(base64LDAP,base64Client)).map(res => res.json()).catch((error : any) => {
                        var reason="Token Regenerate Failure";
                        return Observable.throw(JSON.parse(this.tokenExpErrorData));   
           });
   
    }
}