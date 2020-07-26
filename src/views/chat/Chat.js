import React, { lazy, useState } from 'react'
import { FacebookService } from '../../services/facebook'
import { useStore, useSelector, useDispatch } from 'react-redux'
import { getThreadFromApi } from '../../store/actions/threadsActions';
import ThreadList from './threads/ThreadList';
const Chat = () => {
    const threads = useSelector(state => state.threads || []);
    const dispatch = useDispatch();
    const [activeThread, setActiveThread] = useState(threads.length? threads[0] : {});
    
    React.useEffect(()=>{
        dispatch(getThreadFromApi());
    });

    return (
        <>
            <div class="chat-container">
                <ThreadList threads={threads} activeItem={activeThread} onItemClick={(item)=>{ setActiveThread(item)}}></ThreadList>
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
