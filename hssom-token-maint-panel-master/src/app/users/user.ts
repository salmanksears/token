import {BaseDomain}   from '../shared/components/base-domain.component';
import {Role}         from '../roles/role';
import {Components}   from '../components/components';
import {CompUser}     from './comp-user';
import {CompUserRole} from './comp-user-role';

export class User extends BaseDomain
{
    userId : string;
    userName : string;
    enabled : boolean;
    roles : Role[];
    component : Components[];
    compUser : CompUser[];
}