import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Typing from './Typing';
import Message from './Message';
import { getThreadMessagesFromAPI, sendMessage, sendMessageToApi } from '../../../store/actions/messagesActions';
import ChatInput from './ChatInput';
import CustomScroll from 'react-custom-scroll';

import { threadChanged } from '../../../store/actions/threadsActions';
const ChatList = (props) => {
    const { thread } = props;
    const messages = useSelector(state => state.messages[thread.id] || []);
    const [page, setPage] = useState(1);
    const [typing] = useState(false);
    const dispatch = useDispatch();
    const chatRef = useRef();
    const [isLoadable, setIsLoadable] = useState(true);
    const [loading, setIsLoading] = useState(false);

    useEffect(() => {
        dispatch(getThreadMessagesFromAPI(thread.id));
        thread.unread_count = 0;
        setPage(1);
        dispatch(threadChanged(thread));
    }, [thread.id]);

    const onEnterMessage = (text) => {
        const sendMessageAction = sendMessage(thread, text);
        const data = sendMessageAction.payload;
        dispatch(sendMessageAction);
        dispatch(sendMessageToApi(data));
    }

    const loadMoreMessage = () => {
        if (loading) {
            return;
        }
        var nextPage = page + 1;
        setPage(nextPage);
        setIsLoading(true);
        dispatch(getThreadMessagesFromAPI(thread.id, nextPage, (result)=>{
            setIsLoading(false);
            if(!result.data.length){
                setIsLoadable(false);
            }
        }));
    }

    const _onScroll = (event) => {
        if (event.currentTarget.scrollTop <= 50 && isLoadable) {
            loadMoreMessage();
        }
    }

    return (
        <div className="chat">
            <div id="chat" ref={chatRef}>
                <CustomScroll heightRelativeToParent="100%" keepAtBottom ref={chatRef} scrollTo={chatRef.current?.scrollHeight || 0} onScroll={_onScroll}>
                    <div className="messages">
                        {loading ? <Typing /> : null}
                        {/* <div class="time">Today at 11:41</div> */}
                        {
                            messages.map(message => {
                                return (<Message key={message.id} data={message} position={message.from?.id != thread.id ? 'right' : ''}>{message.message}</Message>)
                            })
                        }
                    </div>
                </CustomScroll>
            </div>
            <ChatInput thread={thread} onEnter={onEnterMessage} />
        </div>
    )
}

export default ChatList
