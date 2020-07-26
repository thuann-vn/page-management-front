import React from 'react'
import ThreadItem from './ThreadItem'
const ThreadList = (props) => {
    const clickEvent = (item)=>{
        props.onItemClick(item);
    }
    return (
        <div class="contacts">
            {props.threads.map((item)=>{
                return (
                    <div key={item.id} onClick={()=>clickEvent(item)}>
                        <ThreadItem active={item.id == props.activeItem.id} data={item}></ThreadItem>
                    </div>
                )
            })}
        </div>
    )
}

export default ThreadList;