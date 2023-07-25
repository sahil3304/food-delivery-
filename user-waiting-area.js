import React from 'react';
import logo from './assets2/connoisseur-logo.png';
import { Helmet } from 'react-helmet';
import './user-waiting-area.css';
export default function user_waiting_area(){
    return(
        <div className='parent-class'>
        <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@600&display=swap" rel="stylesheet" />
        </Helmet>
            <div className='img'><center><img src={logo} className='logo-img'></img></center></div>
            <div className='order-conf'><font className='confirmation-txt'>Waiting for order confirmation...</font></div>
            <div className='boring-txt'>A text message that might keep you engaged for the next 5 minutes... Honestly there is nothing interesting here...</div>
        </div>
    )
};