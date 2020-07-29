import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getThreadFromApi, threadChanged } from '../../store/actions/threadsActions';
import ThreadList from './threads/ThreadList';
import ChatList from './chat/ChatList';
import { receiveMessage } from '../../store/actions/messagesActions';

import Pusher from 'pusher-js';
import Config from '../../constants/Config';
const pusher = new Pusher(Config.pusherAppKey, {
    cluster: Config.pusherCluster,
    encrypted: true
});

const Messages = () => {
    const threads = useSelector(state => state.threads || []);
    const dispatch = useDispatch();
    const [activeThread, setActiveThread] = useState(threads.length? threads[0] : {});
    React.useEffect(()=>{
        dispatch(getThreadFromApi());
    }, []);

    React.useEffect(()=>{
        const channel = pusher.subscribe('notifications');
        channel.bind('message.new', data => {
            console.log('Message new', data);
            dispatch(receiveMessage(data.thread.id, data.message));
            dispatch(threadChanged(data.thread));
        });
    }, []);

    return (
        <>
            <div class="chat-container">
                <ThreadList threads={threads} activeItem={activeThread} onItemClick={(item)=>{ setActiveThread(item)}}></ThreadList>
                <ChatList page_id={'106261714466963'} thread={activeThread}/>
            </div>
        </>
    )
}

export default Messages
