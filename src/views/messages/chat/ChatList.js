import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Typing from './Typing';
import Message from './Message';
import { getThreadMessagesFromAPI, sendMessage, sendMessageToApi, receiveMessage } from '../../../store/actions/messagesActions';
import ChatInput from './ChatInput';
import ReactTimeAgo from 'react-time-ago';
import CustomScroll from 'react-custom-scroll';

import { threadChanged } from '../../../store/actions/threadsActions';
const ChatList = (props) => {
    const { thread } = props;
    const messages = useSelector(state => state.messages[thread.id] || []);
    const [newMessages, setNewMessages] = useState([]);
    const [typing, setTyping] = useState(false);
    const dispatch = useDispatch();
    const chatRef = useRef();
    useEffect(() => {
        dispatch(getThreadMessagesFromAPI(thread.id));
        thread.unread_count = 0;
        dispatch(threadChanged(thread));
    }, [thread.id]);


    useEffect(() => {
        scrollToBottom();
        setNewMessages([]);
    }, [messages.length, newMessages.length]);

    const scrollToBottom = () => {
        if (chatRef) {
            // chatRef.current.updateScrollPosition = chatRef.current.scrollHeight;
        }
    };

    const onEnterMessage = (text) => {
        const sendMessageAction = sendMessage(thread, text);
        const data = sendMessageAction.payload;
        setNewMessages([...newMessages, data]);
        dispatch(sendMessageAction);
        dispatch(sendMessageToApi(data));
    }

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
                        {
                            newMessages.map(message => {
                                return (<Message key={message.id} data={message} position='right'></Message>)
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
