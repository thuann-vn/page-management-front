import api from "./api"

export const TagService  = {
    createTag: (data) =>{
        return api.call(`/api/tags`, data, 'POST')
    },
    getTags: (excludes = [])=>{
        return api.call(`/api/tags?excludes=${excludes.join(',')}`);
    },
    updateTag: (tag) => {
        return api.call(`/api/tags/${tag._id}`, tag, 'PUT')
    },
    deleteTag: (id) => {
        return api.call(`/api/tags/${id}`, {}, 'DELETE')
    }
}