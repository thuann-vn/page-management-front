import React, { Component }  from 'react';
import NumberFormat from "react-number-format"
import Config from "../constants/Config";

const MoneyFormat = (props)=>{
    return (<NumberFormat {...props} displayType={'text'} prefix={Config.currencySymbol} thousandSeparator={true}/>)
}

export default MoneyFormat;