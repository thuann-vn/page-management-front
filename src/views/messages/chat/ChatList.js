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
    const [newMessages] = useState([]);
    const [typing] = useState(false);
    const dispatch = useDispatch();
    const chatRef = useRef();
    useEffect(() => {
        dispatch(getThreadMessagesFromAPI(thread.id));
        thread.unread_count = 0;
        dispatch(threadChanged(thread));
    }, [thread.id]);

    const onEnterMessage = (text) => {
        const sendMessageAction = sendMessage(thread, text);
        const data = sendMessageAction.payload;
        dispatch(sendMessageAction);
        dispatch(sendMessageToApi(data));
    }
    console.log('Message length' + messages.length);

    return (
        <div className="chat">
            <div id="chat" ref={chatRef}>
                <CustomScroll heightRelativeToParent="100%" keepAtBottom ref={chatRef} scrollTo={chatRef.current?.scrollHeight || 0}>
                    <div className="messages">
                        {/* <div class="time">Today at 11:41</div> */}
                        {
                            messages.map(message => {
                                return (<Message key={message.id} data={message} position={message.from?.id != thread.id ? 'right' : ''}>{message.message}</Message>)
                            })
                        }
                        {typing ? <Typing /> : null}
                    </div>
                </CustomScroll>
            </div>
            <ChatInput thread={thread} onEnter={onEnterMessage} />
        </div>
    )
}

export default ChatList
