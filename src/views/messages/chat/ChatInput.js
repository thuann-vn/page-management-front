import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLaughBeam } from '@fortawesome/free-solid-svg-icons'
import { FacebookService } from '../../../services/facebook'
import { sendMessageToApi, sendMessage } from '../../../store/actions/messagesActions'
import InputEmoji from "react-input-emoji";
import CIcon from '@coreui/icons-react'
import { cilInbox } from '@coreui/icons'
import AddOrderModal from '../../../components/orders/addOrderModal'
import OrderModalContext from '../../../contexts/orderModalContext'
const ChatInput = (props) => {
    const {thread} = props;
    const dispatch = useDispatch();
    const [value, setValue] = React.useState('');

    //Orders
    const [orderModalShow, setOrderModalShow] = useState(false);
    
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
                    placeholder="Nhập tin nhắn..."
                    keepOpenend={true}
                />
                <OrderModalContext.Consumer>
                    {({opening, open}) => (
                        <CIcon className="btn-add-order" content={cilInbox} size={48} onClick={()=> open(true)}/>
                    )}
                </OrderModalContext.Consumer>
                
        </div>
    )
}

export default ChatInput
