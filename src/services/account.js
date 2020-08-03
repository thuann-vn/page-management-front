import api from "./api"

export const AccountService  = {
    completeSetup: ()=>{
        return api.call('/api/account/complete-setup', {}, 'POST');
    },
    getSetupStatus: ()=>{
        return api.call('/api/account/get-setup-status');
    },
}