import {Injectable, Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'compSearchFilters'
})
@Injectable()
export class ComponentFilter implements PipeTransform {

    transform(result, args?, compResponse?) {
       if(args != undefined && args.length > 0 && compResponse != undefined){
         let filter_text = args.trim();
           result = compResponse.compResult;
           let filteredResult = result.filter(
                result => {
                    if(result.name.toLowerCase().indexOf(filter_text.toLowerCase()) !== -1 ||
                       result.sessionLife.toString().toLowerCase().indexOf(filter_text.toLowerCase()) !== -1 ||
                       result.compId.toString().toLowerCase().indexOf(filter_text.toLowerCase()) !== -1
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