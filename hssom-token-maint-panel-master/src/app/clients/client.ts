
import {BaseDomain} from '../shared/components/base-domain.component';
import {Components} from '../components/components';
import {ClientAddress} from './client-address';

export class Client extends BaseDomain{
        clientId : string;
        clientCode : string;
        clientSecret : string;
        enabled : boolean;
        tokenLife : string;
        comps : Components[];
        addresses:ClientAddress[];
    }