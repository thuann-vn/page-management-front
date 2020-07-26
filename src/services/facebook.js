import api from "./api"

export const FacebookService  = {
    pages: ()=>{
        return api.call('/api/facebook/pages', {});
    },
    threads: (pageId) => {
        return api.call('/api/facebook/threads', {
            pageId
        });
    },
}