import React from 'react'
import ReactTimeAgo from 'react-time-ago'

const ThreadItem = (props) => {
    var contactClass = ['contact'];
    if(props.active){
        contactClass.push('active');
    }
    return (
        <div className={contactClass.join(' ')}>
            <div class="pic"></div>
            {props.data.unread_count > 0 ? (<div class="badge"></div>) : null}
            <div class="name">{props.data.user.name}</div>
            <div class="message">{props.data.snippet}</div>
            <div class="time"><ReactTimeAgo date={props.data.updated_time}/></div>
        </div>
    )
}

export default ThreadItem;