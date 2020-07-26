import React, { lazy } from 'react'
import { FacebookService } from '../../services/facebook'
const Chat = () => {
    React.useEffect(()=>{
        FacebookService.pages().then(results => {
            console.log(results);
        })
    })
    return (
        <>
            <div class="chat-container">
                <div class="contacts">
                    <div class="contact">
                        <div class="pic rogers"></div>
                        <div class="badge"></div>
                        <div class="name"></div>
                        <div class="message"></div>
                    </div>
                </div>
                <div class="chat">
                    <div class="contact bar">
                        <div class="pic stark"></div>
                        <div class="name">Tony Stark</div>
                        <div class="seen">Today at 12:56</div>
                    </div>
                    <div class="messages" id="chat">
                        <div class="time">Today at 11:41</div>
                        <div class="message parker">Hey, man! What's up, Mr Stark? 👋</div>
                        <div class="message stark">Kid, where'd you come from? </div>
                        <div class="message parker">Field trip! 🤣</div>
                        <div class="message parker">Uh, what is this guy's problem, Mr. Stark? 🤔</div>
                        <div class="message stark">Uh, he's from space, he came here to steal a necklace from a wizard.</div>
                        <div class="message stark">
                            <div class="typing typing-1"></div>
                            <div class="typing typing-2"></div>
                            <div class="typing typing-3"></div>
                        </div>
                    </div>
                    <div class="input"><i class="fas fa-camera"></i><i class="far fa-laugh-beam"></i>
                        <input /><i class="fas fa-microphone"></i>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Chat
