import React, { useState, useEffect } from 'react'
import ThreadItem from './ThreadItem'
import CustomScroll from 'react-custom-scroll';
import { CInput } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilSearch, cilX } from '@coreui/icons';
import { search } from "ss-search"

const ThreadList = (props) => {
    const [threads, setThreads] = useState(props.threads || []);
    const [searchText, setSearchText] = useState('');
    
    React.useEffect(()=>{
        setThreads([...props.threads]);
        setSearchText('');
    }, [props.threads]);

    const clickEvent = (item)=>{
        props.onItemClick(item);
    }

    const searchThread = (q = '')=>{
        setSearchText(q);
        const results = search(props.threads, ['name'], q);
        setThreads(results);
    }

    return (
        <div className="contacts-container">
            <div className="contacts-header">
                <span className="search-icon">
                    <CIcon content={cilSearch} />
                </span>
                <CInput placeholder="Tìm kiếm..." value={searchText} onChange={(e)=>searchThread(e.target.value)}></CInput>
                {
                    searchText ? (
                        <span className="clear-icon">
                            <CIcon content={cilX}  onClick={()=>searchThread('')}/>
                        </span>
                    ) : null
                }
                
            </div>
            <CustomScroll heightRelativeToParent="100%">
                <div className="contacts">
                    {threads.map((item)=>{
                        return (
                            <div key={item.id} onClick={()=>clickEvent(item)}>
                                <ThreadItem active={item.id == props.activeItem.id} data={item}></ThreadItem>
                            </div>
                        )
                    })}
                </div>
            </CustomScroll>
        </div>
        
    )
}

export default ThreadList;