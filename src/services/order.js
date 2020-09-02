import api from "./api"

export const OrderService  = {
    createOrder: (data = {}) =>{
        return api.call(`/api/orders`, data, 'POST')
    },
    getOrders: ()=>{
        return api.call(`/api/orders`);
    },
    updateOrder: (tag) => {
        return api.call(`/api/orders/${tag._id}`, tag, 'PUT')
    },
    deleteOrder: (id) => {
        return api.call(`/api/orders/${id}`, {}, 'DELETE')
    }
}