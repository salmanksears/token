import {Injectable}                    from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Subject}                       from 'rxjs/Rx';
import {Observable}                    from 'rxjs/Rx';
import {LoginUser}                     from '../../login/login-user';
import {LoginResponse}                 from '../../login/login-response';
import {EnvVarConfig}                         from '../config/environment-config';
import {AuthHttp, JwtHelper, tokenNotExpired} from 'angular2-jwt';

@Injectable()
export class AuthService {
    
    private authURL =  EnvVarConfig.getEnvironmentVariable('endPointAuth');
	
    private _headers = new Headers({ 'Content-Type': 'application/json' });
	private _options = new RequestOptions({ headers: this._headers });
    
    private _jwtToken: string;
    private _loggedIn = false;
    private _isAuth = false;
    private _userName = '';
    private tokenExpired = false;
    private _displayName = '';
    public name = new Subject();
    public showNavBar = new Subject();
    private _lastRouteAttempt = '';
    private base64EncodedClient = '';
    private base64EncodedLDAP = '';
    constructor(private _http: Http){
        
    }
    
    setJWTToken(jwtToken: string){
        this._jwtToken = jwtToken;
    }
    
    getJWTToken(): string{
        return this._jwtToken;
    }

    login(base64Ldap:string, base64Client:string, userID:string){
        
        var loginResponse = new LoginResponse();
        
        console.log('auth url : '+ this.authURL);
        
        return  this._http.get(this.authURL, this.getAuthHeader(base64Ldap,base64Client))
        .map(res => 
            {
                loginResponse = JSON.parse(JSON.stringify(res.json()));
                console.log('response :: '+loginResponse);
                this._displayName = loginResponse.userDetails.displayName;
                this._userName = userID;
                this.base64EncodedClient = base64Client;
                this.base64EncodedLDAP = base64Ldap;
                this._loggedIn = true;
                this._jwtToken = loginResponse.token;
            }).catch((error : any) => Observable.throw(error));
     }
    
    isLoggedIn(){
        return this._loggedIn;
    }
    
    isAuthorized(){
        return this._isAuth;
    }
    
    getUserName(){
        return this._userName;
    }

    getDisplayName(){
        return this._displayName;
    }
    
    setLastRouteAttempt(lastRouteAttempt: string){
        this._lastRouteAttempt = lastRouteAttempt;
    }
    
    getLastRouteAttempt(): string{
        return this._lastRouteAttempt;
    }

    getAuthHeader(base64Ldap:string,base64Client:string): RequestOptions{
        let _headers = new Headers({ "Content-Type": "application/json" }); 
        let authHeaders = new Headers(_headers);
        authHeaders.append('upauth', base64Ldap);
        authHeaders.append('Authorization', base64Client);
        authHeaders.append('Accept', "application/json");
        return new RequestOptions({ headers: authHeaders });
	}

    resetLoggedInDetails(){
        this._displayName = '';
        this._userName = '';
        this._lastRouteAttempt = '';
        this.base64EncodedClient='';
        this.base64EncodedLDAP='';
    }

    getBase64EncodedClient(){
        return this.base64EncodedClient;
    }

    getBase64LDAP(){
        return this.base64EncodedLDAP;
    }
}