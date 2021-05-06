
export class EnvVarConfig {

    public static getEnvironmentVariable(value) {
        var environment:string;
        var data = {};
        environment = window.location.hostname;
        switch (environment) {
            case'localhost':
                data = {
                    endPointService : 'http://172.29.77.205:8180/HSSOMTokenMaintService/services',
                    environmentType : 'LOCAL',
                    endPointAuth    : 'https://hfdvhshasvc1.vm.itg.corp.us.shldcorp.com:12143/HSSOMAuthService/services/auth/token?attributes=mail,title,cn,sn,shcdisplayname',
                    tokenServClientCode   : 'TokenMaintUI',
                    tokenServClientSecret : 'h5S0mToK3nM41nTU1'
                };
                break;
             case 'hfdvhshaapp1.vm.itg.corp.us.shldcorp.com':
                data = {
                    endPointService : 'https://hfdvhshasvc1.vm.itg.corp.us.shldcorp.com:12743/HSSOMTokenMaintService/services',
                    environmentType : 'DEV',
                    endPointAuth    : 'https://hfdvhshasvc1.vm.itg.corp.us.shldcorp.com:12143/HSSOMAuthService/services/auth/token?attributes=mail,title,cn,sn,shcdisplayname',
                    tokenServClientCode   : 'TokenMaintUI',
                    tokenServClientSecret : 'h5S0mToK3nM41nTU1'
                };
                break;
             case 'hfqahshaapp1.vm.itg.corp.us.shldcorp.com':
                data = {
                    endPointService : 'https://hfdvhshasvc1.vm.itg.corp.us.shldcorp.com:12843/HSSOMTokenMaintService/services',
                    environmentType : 'QA',
                    endPointAuth    : 'https://hfdvhshasvc1.vm.itg.corp.us.shldcorp.com:12243/HSSOMAuthService/services/auth/token?attributes=mail,title,cn,sn,shcdisplayname',
                    tokenServClientCode   : 'TokenMaintUI',
                    tokenServClientSecret : 'h5S0mToK3nM41nTU1'
                };
                break;
             case 'hstokenadmin.intra.searshc.com':
                data = {
                    endPointService : 'https://hstokenmaint.intra.searshc.com/HSSOMTokenMaintService/services',
                    environmentType : 'PROD',
                    endPointAuth    : 'https://hssomauthservice.intra.searshc.com/HSSOMAuthService/services/auth/token?attributes=mail,title,cn,sn,shcdisplayname',
                    tokenServClientCode   : 'TokenMaintUI',
                    tokenServClientSecret : 'h5S0mToK3nM41nTU1'
                };
                break;
        }
        return data[value];
    }


}