import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
const ChatInput = () => {
    return (
        <div class="input"><i class="fas fa-camera"></i><i class="far fa-laugh-beam"></i>
            <input /><i class="fas fa-microphone"></i>
        </div>
    )
}

export default ChatInput
