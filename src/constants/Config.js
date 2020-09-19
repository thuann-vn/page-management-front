require('dotenv').config();

export default {
    apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:8080',
    facebookID: '302064867211847',
    facebookSecret: '58643928fca5597ae9e9e9735a323657',
    pusherAppKey: '3284fd45b16e22872327',
    pusherCluster: 'ap1',
    currency: 'VND',
    currencySymbol: '₫'
}