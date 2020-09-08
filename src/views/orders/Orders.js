import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getThreadFromApi, threadChanged } from '../../store/actions/threadsActions';
import OrderList from './orders/OrderList';
import ChatList from './chat/ChatList';
import { receiveMessage } from '../../store/actions/messagesActions';

import Pusher from 'pusher-js';
import Config from '../../constants/Config';
import CustomerPanel from '../../components/customerPanel/customerPanel';
import AddOrderModal from '../../components/orders/addOrderModal';
import OrderPanel from '../../components/orders/orderPanel';
const pusher = new Pusher(Config.pusherAppKey, {
    cluster: Config.pusherCluster,
    encrypted: true
});

const Orders = () => {
    const pages = useSelector(state => state.pages || []);
    var defaultPage = pages.length ? pages[0] : null;
    const currentPage = useSelector(state => state.settings.currentPage || defaultPage)
    const allThreads = useSelector(state => state.threads || {})
    
    const [threads, setThreads] = useState(allThreads[currentPage.id] || []);
    const dispatch = useDispatch();
    const [activeThread, setActiveThread] = useState(threads.length? threads[0] : {});
    
    React.useEffect(()=>{
        var newThreads = [...allThreads[currentPage.id]];
        setThreads(newThreads);
        setActiveThread(newThreads.length ? newThreads[0] : null);
        dispatch(getThreadFromApi(currentPage.id));
    }, [currentPage]);

    return (
        <div class="chat-container">
            <OrderList threads={threads} activeItem={activeThread} onItemClick={(item)=>{ setActiveThread(item)}}/>
            <ChatList thread={activeThread}/>
            <OrderPanel id={activeThread.id}/>
            <AddOrderModal customerId={activeThread.id}></AddOrderModal>
        </div>
    )
}

export default Orders
