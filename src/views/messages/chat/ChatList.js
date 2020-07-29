import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Typing from './Typing';
import Message from './Message';
import { getThreadMessagesFromAPI, sendMessage, sendMessageToApi, receiveMessage } from '../../../store/actions/messagesActions';
import ChatInput from './ChatInput';
import ReactTimeAgo from 'react-time-ago';

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
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
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
        <div class="chat">
            <div class="contact bar">
                <div class="pic stark"></div>
                <div class="name">{thread.user?.name}</div>
                <div class="seen"><ReactTimeAgo date={thread.updated_time ? thread.updated_time: new Date()} /></div>
            </div>
            <div class="messages" id="chat" ref={chatRef}>
                <div class="time">Today at 11:41</div>
                {
                    messages.map(message => {
                        return (<Message key={message.id} data={message} position={!message.from || message.from.id == props.page_id ? 'right' : ''}>{message.message}</Message>)
                    })
                }
                {
                    newMessages.map(message => {
                        return (<Message key={message.id} data={message} position='right'></Message>)
                    })
                }
                {typing ? <Typing /> : null}

            </div>
            <ChatInput thread={thread} onEnter={onEnterMessage} />
        </div>
    )
}

export default ChatList
