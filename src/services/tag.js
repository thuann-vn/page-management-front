import api from "./api"

export const TagService  = {
    getTags: (excludes)=>{
        return api.call(`/api/tags?excludes=${excludes.join(',')}`);
    },
}