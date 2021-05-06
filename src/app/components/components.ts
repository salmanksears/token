import {BaseDomain}   from '../shared/components/base-domain.component';
import {ComponentURI} from './component-uri';
import {CompUserRole} from '../users/comp-user-role';

export class Components extends BaseDomain{
        compId : string;
        name : string;    
        sessionLife : string;
        uris : ComponentURI [];
        compRole : CompUserRole[];
    }