import React, { useState } from 'react'
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'
import OrderModalContext from '../contexts/orderModalContext'

const TheLayout = () => {
  const [orderModalOpening, setOrderModalOpening] = useState(false);
  
  return (
    <div className="c-app c-default-layout">
      <TheSidebar/>
      <div className="c-wrapper">
        <TheHeader/>
        <div className="c-body">
          <OrderModalContext.Provider value={{opening: orderModalOpening, open: setOrderModalOpening}}>
            <TheContent/>
          </OrderModalContext.Provider>
        </div>
      </div>
    </div>
  )
}

export default TheLayout
