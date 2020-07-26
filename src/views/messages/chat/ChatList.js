import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Typing from './Typing';
import Message from './Message';
import { getThreadMessagesFromAPI } from '../../../store/actions/messagesActions';
import ChatInput from './ChatInput';
const ChatList = (props) => {
    const {thread} = props;
    const messages = useSelector(state => state.messages[thread.id] || []);
    console.log(thread);
    const [typing, setTyping] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getThreadMessagesFromAPI(thread.id));
    }, [thread.id]);

    return (
        <div class="chat">
            <div class="contact bar">
                <div class="pic stark"></div>
                <div class="name">{thread.user.name}</div>
                <div class="seen">{thread.updated_time}</div>
            </div>
            <div class="messages" id="chat">
                <div class="time">Today at 11:41</div>
                {
                    messages.map(message => {
                        return (<Message key={message.id} data={message} position={message.from.id == props.page_id ? 'right' : ''}>{message.message}</Message>)
                    })
                }
                {typing ? <Typing /> : null}
                
            </div>
            <ChatInput />
        </div>
    )
}

export default ChatList
