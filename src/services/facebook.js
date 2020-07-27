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
    messages: (threadId) => {
        return api.call('/api/facebook/messages?threadId='+ threadId);
    },
    sendMessage: (data) => {
        return api.call('/api/facebook/postMessage', data, 'POST');
    },
}