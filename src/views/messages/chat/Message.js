import React from 'react'
const Message = (props) => {
    var className = 'message';
    if(props.position == 'right'){
        className+= ' right';
    }
    return (
        <div class={className}>
            {props.children}

            {
                props.data.attachments ? props.data.attachments.data.map((attachment)=>{
                    return attachment.image_data ? <img src={attachment.image_data.preview_url}/> : null
                }): null
            }
        </div>
    )
}

export default Message
