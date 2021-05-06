
import {UserDetails} from './user-details';
export class LoginResponse {

    CorrelationId : string;
    ResponseCode : string;
    ResponseMessage : string;
    token : string;
    tokenLife:string;
    userDetails:UserDetails;
    messages: string[];

}