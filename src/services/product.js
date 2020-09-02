import api from "./api"

export const ProductService  = {
    createProduct: (data = {}) =>{
        const formData = new FormData();
        Object.keys(data).map((key)=>{
            formData.append(key, data[key]);
        })
        return api.call(`/api/products`, formData, 'POST', 'multipart/form-data')
    },
    getProducts: (query = '', excludes = [])=>{
        return api.call(`/api/products?excludes=${excludes.join(',')}`);
    },
    searchProducts: (query = '')=>{
        return api.call(`/api/products?q=${query}`);
    },
    updateProducts: (tag) => {
        return api.call(`/api/products/${tag._id}`, tag, 'PUT')
    },
    deleteProduct: (id) => {
        return api.call(`/api/products/${id}`, {}, 'DELETE')
    }
}