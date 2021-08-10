import React from 'react';
import './sidebar.css';
import StorefrontIcon from '@material-ui/icons/Storefront';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import {
    Link
  } from 'react-router-dom';

function SideBar() {
    
    return(
        <div className="sidebar">
            <Link to="/produtos"><StorefrontIcon className="StorefrontIcon" fontSize="large" /></Link>
            <Link to={`/perfil/`}><AccountCircleIcon className="AccountCircleIcon" fontSize="large" /></Link>
            <Link to="/"><CancelIcon className="CancelIcon" fontSize="large" /></Link>
        </div>
    )
}

export default SideBar;