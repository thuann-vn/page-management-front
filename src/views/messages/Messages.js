import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getThreadFromApi, threadChanged } from '../../store/actions/threadsActions';
import ThreadList from './threads/ThreadList';
import ChatList from './chat/ChatList';
import { receiveMessage } from '../../store/actions/messagesActions';

import Pusher from 'pusher-js';
import Config from '../../constants/Config';
import CustomerPanel from '../../components/customerPanel/customerPanel';
import AddOrderModal from '../../components/orders/addOrderModal';
const pusher = new Pusher(Config.pusherAppKey, {
    cluster: Config.pusherCluster,
    encrypted: true
});

const Messages = () => {
    const pages = useSelector(state => state.pages || []);
    var defaultPage = pages.length ? pages[0] : null;
    const currentPage = useSelector(state => state.settings.currentPage || defaultPage);
    const allThreads = useSelector(state => state.threads || {})
    
    const [threads, setThreads] = useState(allThreads[currentPage.id] || []);
    const dispatch = useDispatch();
    const [activeThread, setActiveThread] = useState(threads.length? threads[0] : {});
    
    React.useEffect(()=>{
        dispatch(getThreadFromApi(currentPage.id));
    }, [currentPage]);

    React.useEffect(()=>{
        if(allThreads[currentPage.id]){
            var newThreads = [...allThreads[currentPage.id]];
            setThreads(newThreads);

            if(!activeThread){
                setActiveThread(newThreads.length ? newThreads[0] : null);
            }
        }
    }, [currentPage, allThreads]);

    return (
        <div class="chat-container">
            <ThreadList threads={threads} activeItem={activeThread} onItemClick={(item)=>{ setActiveThread(item)}}></ThreadList>
            <ChatList thread={activeThread}/>
            <CustomerPanel id={activeThread.id}/>
            <AddOrderModal customerId={activeThread.id}></AddOrderModal>
        </div>
    )
}

export default Messages
