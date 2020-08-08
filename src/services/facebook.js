import api from "./api"

export const FacebookService  = {
    pages: ()=>{
        return api.call('/api/facebook/pages', {});
    },
    pageSetup: (page)=>{
        return api.call('/api/facebook/page-setup', page, 'POST');
    },
    threads: (pageId) => {
        return api.call('/api/facebook/threads', {
            pageId
        });
    },
    messages: (threadId, page = 1) => {
        return api.call(`/api/facebook/messages?threadId=${threadId}&page=${page}`);
    },
    sendMessage: (data) => {
        return api.call('/api/facebook/postMessage', data, 'POST');
    },
}