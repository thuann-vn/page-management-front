import api from "./api"

export const CustomerService  = {
    getCustomer: (id)=>{
        return api.call(`/api/customer/${id}`);
    },
}