import api from "./api"

export const PageService  = {
    getPages: (excludes = [])=>{
        return api.call(`/api/pages`);
    },
}