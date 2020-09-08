import React, { useRef, useState, useEffect } from 'react'
import { CSidebarNavDropdown, CSidebarNavItem } from '@coreui/react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPages } from '../../store/actions/pagesActions';
import { setSelectedPage } from '../../store/actions/settingsActions';
import { receiveMessage } from '../../store/actions/messagesActions';
import { threadChanged } from '../../store/actions/threadsActions';
import PusherService from '../../services/pusher';
import JwtDecode from 'jwt-decode';

const PageSelector = () => {
    const dropdownRef = useRef();
    const [isShow, setIsShow] = useState(false);
    
    const dispatch = useDispatch();
    const pages = useSelector(state => state.pages || []);
    const settings = useSelector(state => state.settings || []);
    var defaultPage = pages.length ? pages[0] : null;
    const currentPage = useSelector(state => state.settings.currentPage || defaultPage)
    useEffect(() => {
        dispatch(fetchPages());
    }, []);
    
    //Subscribe notifications
    React.useEffect(()=>{
        var tokenDecoded = JwtDecode(settings.token);
        const channel = PusherService.subscribe('notifications.' + tokenDecoded.user._id);
        channel.bind('message.new', data => {
            console.log(data);
            dispatch(receiveMessage(data.thread.id, data.message));
        });

        channel.bind('thread.update', data => {
            console.log('Thread changed', data);
            dispatch(threadChanged(data.customer_id, data.message));
        });

        channel.bind('thread.add', data => {
            console.log('Thread Add', data);
            dispatch(threadChanged(data.customer_id, data.message));
        });
    }, []);

    const selectPage = (page)=>{
        dispatch(setSelectedPage(page));
        setIsShow(false);
    }
    return (
        <div className="page-selector">
            <CSidebarNavDropdown name={currentPage? currentPage.name : 'Loading...'} show={isShow} >
                {
                    pages.map(page => {
                        return <CSidebarNavItem key={`page_${page.id}`} title={page.category} name={page.name} onClick={()=>{selectPage(page)}} className={page.id ==currentPage.id ? 'c-active' :''}/>
                    })
                }
            </CSidebarNavDropdown>
        </div>
    )
}

export default PageSelector
