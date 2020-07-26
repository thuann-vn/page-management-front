import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getThreadFromApi } from '../../store/actions/threadsActions';
import ThreadList from './threads/ThreadList';
import ChatList from './chat/ChatList';
const Messages = () => {
    const threads = useSelector(state => state.threads || []);
    const dispatch = useDispatch();
    const [activeThread, setActiveThread] = useState(threads.length? threads[0] : {});
    
    React.useEffect(()=>{
        dispatch(getThreadFromApi());
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
