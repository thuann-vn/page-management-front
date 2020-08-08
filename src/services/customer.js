import api from "./api"

export const CustomerService  = {
    getCustomer: (id)=>{
        return api.call(`/api/customer/${id}`);
    },
    getTags: (id)=>{
        return api.call(`/api/customer/${id}/tags`);
    },
    addTags: (id, tags)=>{
        return api.call(`/api/customer/${id}/tags`, {tags}, 'POST');
    },
}