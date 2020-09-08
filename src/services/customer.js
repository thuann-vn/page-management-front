import api from "./api"

export const CustomerService  = {
    getCustomer: (id)=>{
        return api.call(`/api/customer/${id}`);
    },
    updateCustomer: (id, data) => {
        return api.call(`/api/customer/${id}`, data, 'PUT');
    },
    getTags: (id)=>{
        return api.call(`/api/customer/${id}/tags`);
    },
    addTags: (id, tags)=>{
        return api.call(`/api/customer/${id}/tags`, {tags}, 'POST');
    },
    getActivities: (id)=>{
        return api.call(`/api/customer/${id}/activities`);
    },
}