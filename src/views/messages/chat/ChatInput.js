import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLaughBeam } from '@fortawesome/free-solid-svg-icons'
const ChatInput = () => {
    return (
        <div class="input">
            <input /><FontAwesomeIcon icon={faLaughBeam}/>
        </div>
    )
}

export default ChatInput
