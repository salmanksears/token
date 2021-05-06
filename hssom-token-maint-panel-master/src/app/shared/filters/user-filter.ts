import {Injectable, Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'userSearchFilters'
})
@Injectable()
export class UserFilter implements PipeTransform {

    transform(result, args?, userResponse?) {
       if(args != undefined && args.length > 0 && userResponse != undefined){
         let filter_text = args.trim();
           result = userResponse.userResult;
           let filteredResult = result.filter(
                result => {
                    if(result.userName.toLowerCase().indexOf(filter_text.toLowerCase()) !== -1 ||
                       result.userId.toString().toLowerCase().indexOf(filter_text.toLowerCase()) !== -1 
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