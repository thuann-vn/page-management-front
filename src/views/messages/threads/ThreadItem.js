import React from 'react'
import ReactTimeAgo from 'react-time-ago'

const ThreadItem = (props) => {
    var contactClass = ['contact'];
    if(props.active){
        contactClass.push('active');
    }
    if(props.data.unread_count){
        contactClass.push('un_read');
    }
    return (
        <div class={contactClass.join(' ')}>
            <div class="pic"></div>
            {props.data.unread_count > 0 ? (<div class="badge">{props.data.unread_count}</div>) : null}
            <div class="name">{props.data.user.name}<div class="time"><ReactTimeAgo date={props.data.updated_time}/></div></div>
            <div class="message">{props.data.snippet}</div>
        </div>
    )
}

export default ThreadItem;