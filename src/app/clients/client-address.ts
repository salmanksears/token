import {BaseDomain} from '../shared/components/base-domain.component';

export class ClientAddress extends BaseDomain{

    clientAddresId: string;
    clientId:string;
    ipAddress:string;
    netMask:string;
}