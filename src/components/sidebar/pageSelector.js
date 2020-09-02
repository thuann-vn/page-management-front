import React, { useRef, useState } from 'react'
import { CSidebarNavDropdown, CSidebarNavItem } from '@coreui/react';
const PageSelector = () => {
    const dropdownRef = useRef();
    const [isShow, setIsShow] = useState(false);
    return (
        <div className="page-selector">
            <CSidebarNavDropdown name="ABC" ref={dropdownRef} show={isShow}>
                <CSidebarNavItem title="PAGE NAME" name="name" onClick={()=>{setIsShow(false); console.log(dropdownRef)}}/>
            </CSidebarNavDropdown>
        </div>
    )
}

export default PageSelector
