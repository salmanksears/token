import {FormControl} from '@angular/forms';

export class BasicValidators{
    static isAlpha(control: FormControl){
       var valid = /^[a-zA-Z. ]*$/.test(control.value);
        if (valid) {
            return null;
        }
        return { "isAlpha": true };
    }
    
    static isNumber(control: FormControl){
       var valid = /^[0-9. ]*$/.test(control.value);
        if (valid) {
            return null;
        }
        return { "isNumber": true };
    }

    static isComponentSelected(control: FormControl){
        var valid = control.value;
        if(typeof(valid.compId) != 'undefined'){
               return null;
        }else{
            return { "isComponentSelected" : true };
        }
    }
    static isRoleSelected(control: FormControl){
        var valid = control.value;
        if(typeof(valid.roleId) != 'undefined'){
               return null;
        }else{
            return { "isRoleSelected" : true };
        }
    }

    static isCompUriSelected(control: FormControl){
        var valid = control.value;
        if(typeof(valid.compUriId) != 'undefined'){
            return null;
        }else{
            return { "isCompUriSelected" : true };
        }
    }
    
}