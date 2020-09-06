import React from 'react'
const OrderModalContext = React.createContext({
    opening: false,
    open: ()=> {}
});
export default OrderModalContext;