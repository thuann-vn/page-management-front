import React, { useRef, useState, useEffect } from 'react'
import { CSidebarNavDropdown, CSidebarNavItem } from '@coreui/react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPages } from '../../store/actions/pagesActions';
import { setSelectedPage } from '../../store/actions/settingsActions';
const PageSelector = () => {
    const dropdownRef = useRef();
    const [isShow, setIsShow] = useState(false);
    
    const dispatch = useDispatch();
    const pages = useSelector(state => state.pages || []);
    var defaultPage = pages.length ? pages[0] : null;
    const currentPage = useSelector(state => state.settings.currentPage || defaultPage)
    useEffect(() => {
        dispatch(fetchPages());
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
