import {Injectable, Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'clientSearchFilters'
})
@Injectable()
export class ClientFilter implements PipeTransform {

    transform(result, args?, clientResponse?) {
       if(args != undefined && args.length > 0 && clientResponse != undefined){
         let filter_text = args.trim();
           result  = clientResponse.clientResult;
           let filteredResult = result.filter(
                clients => {
                    if(clients.clientCode.toLowerCase().indexOf(filter_text.toLowerCase()) !== -1 ||
                       clients.clientSecret.toLowerCase().indexOf(filter_text.toLowerCase()) !== -1 ||
                       clients.clientId.toString().toLowerCase().indexOf(filter_text.toLowerCase()) !== -1 ||
                       clients.tokenLife.toString().toLowerCase().indexOf(filter_text.toLowerCase()) !== -1 
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