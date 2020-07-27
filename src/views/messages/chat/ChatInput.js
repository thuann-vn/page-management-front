import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLaughBeam } from '@fortawesome/free-solid-svg-icons'
import { FacebookService } from '../../../services/facebook'
import { sendMessageToApi, sendMessage } from '../../../store/actions/messagesActions'
import InputEmoji from "react-input-emoji";
const ChatInput = (props) => {
    const {thread} = props;
    const [value, setValue] = React.useState('');
    const dispatch = useDispatch();
    
    const onEnter =(text)=>{
        if(!text){
            return;
        }

        props.onEnter(text);
    }

    return (
        <div class="input">
                <InputEmoji
                    value={value}
                    onChange={(text) => {setValue(text)}}
                    cleanOnEnter
                    onEnter={onEnter}
                    placeholder="Type a message"
                    keepOpenend={true}
                />
        </div>
    )
}

export default ChatInput
