import {Injectable, Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'roleSearchFilters'
})
@Injectable()
export class RoleFilter implements PipeTransform {

    transform(result, args?, roleResponse?) {
       if(args != undefined && args.length > 0 && roleResponse != undefined){
         let filter_text = args.trim();
           result  = roleResponse.roleResult;
           let filteredResult = result.filter(
                result => {
                    if(result.authority.toLowerCase().indexOf(filter_text.toLowerCase()) !== -1 ||
                       result.roleId.toString().toLowerCase().indexOf(filter_text.toLowerCase()) !== -1
                     )
                     return true;
                     else
                     return false;
                }
            );
            
              return filteredResult;
       }else{
        return result;
       }
    }
}