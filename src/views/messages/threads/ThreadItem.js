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
        <div className={contactClass.join(' ')}>
            <div className="pic" style={{backgroundImage: `url("${props.data.avatar ? props.data.avatar : '/avatars/default.jpg'}")`}}></div>
            {props.data.unread_count > 0 ? (<div className="badge">{props.data.unread_count}</div>) : null}
            <div className="name">{props.data.name || 'Unknown'}<div className="time"><ReactTimeAgo date={props.data.last_update || new Date()}/></div></div>
            <div className="message">{props.data.snippet}</div>
        </div>
    )
}

export default ThreadItem;