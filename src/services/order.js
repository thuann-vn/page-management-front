import api from "./api"

export const OrderService  = {
    createOrder: (data = {}) =>{
        return api.call(`/api/orders`, data, 'POST')
    },
    getOrders: ()=>{
        return api.call(`/api/orders`);
    },
    getCustomerOrders: (customerId)=>{
        return api.call(`/api/orders?customer_id=${customerId}`);
    },
    updateOrder: (tag) => {
        return api.call(`/api/orders/${tag._id}`, tag, 'PUT')
    },
    deleteOrder: (id) => {
        return api.call(`/api/orders/${id}`, {}, 'DELETE')
    }
}