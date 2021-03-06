import React from 'react'
import Emoji from "react-emoji-render";
import CIcon from '@coreui/icons-react';
import { cilClock, cilWarning } from '@coreui/icons';
import {
    CTooltip,
} from '@coreui/react'

import TimeToReadable from 'timetoreadable';
const Message = (props) => {
    var className = 'message';
    if (props.position == 'right') {
        className += ' right';
    }
    if (props.data.unread_count > 0) {
        className += ' unread';
    }
    if (props.data.sticker) {
        className += ' sticker';
    }

    if (props.data.attachments && props.data.attachments.data.length >= 2) {
        className += ' attachments';
    }

    if (props.data.type == 'COMMENT') {
        className += ' comment';
    }

    if (props.data.isSending) {
        className += ' sending';
    }

    if (props.data.sendFailed) {
        className += ' error';
    }

    const getTime = () => {
        return TimeToReadable.Beautify(props.data.created_time);
    }

    const attachmentsRender = (attachments) => {
        if (!attachments) {
            return null;
        }

        return (<div class={attachments.data.length >= 2 ? 'multi-attachments' : ''} key={props.data.id + '_attachments'}>
            {
                attachments.data.map((attachment, index) => {
                    if (attachment.image_data) {
                        return <div class="attachment" key={props.data.id + '_attachment_' + index}><img src={attachment.image_data.preview_url} /></div>
                    }

                    if (attachment.video_data) {
                        return <div class="attachment" key={props.data.id + '_attachment_' + index}><video controls src={attachment.video_data.url} /></div>
                    }
                })}
        </div>)
    }

    return (
        <CTooltip
            content={getTime()}
            placement={props.position  || 'left'}
        >
            <div class={className}>
                <Emoji text={props.data.message ? props.data.message : ''} />
                {
                    props.data.sticker && <img src={props.data.sticker} key={props.data.id + '_sticker'} />
                }
                {
                    props.data.isSending && !props.data.sendFailed && <span className="sending-icon"><CIcon content={cilClock} /></span>
                }
                {
                    props.data.sendFailed && <span className="sending-icon sending-error"><CIcon content={cilWarning} /></span>
                }
                {
                    attachmentsRender(props.data.attachments)
                }
            </div>
        </CTooltip>
    )
}

export default Message
