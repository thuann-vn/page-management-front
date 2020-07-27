import React from 'react'
const Message = (props) => {
    var className = 'message';
    if(props.position == 'right'){
        className+= ' right';
    }
    if(props.data.unread_count > 0){
        className+= ' unread';
    }
    if(props.data.sticker){
        className+= ' sticker';
    }
    return (
        <div class={className}>
            {props.children}

            {
                props.data.sticker && <img src={props.data.sticker} key={props.data.id + '_sticker'}/>
            }
            {
                props.data.attachments ? props.data.attachments.data.map((attachment, index)=>{
                    if(attachment.image_data){
                        return <img src={attachment.image_data.preview_url} key={props.data.id + '_attachment_' + index}/>
                    }

                    if(attachment.video_data){
                        return <video controls src={attachment.video_data.url} key={props.data.id + '_attachment_' + index}/>
                    }

                    return attachment.image_data ? <img src={attachment.image_data.preview_url} key={'attachment'}/> : null
                }): null
            }
        </div>
    )
}

export default Message
