import React from 'react'
import { hot } from 'react-hot-loader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons';

const Header = () => (
    <header className="header header-hidden shadow-bg">
        <div className="site-logo"><a href="/" className="animatescroll-link">Code Kopp</a></div>
        <div className="menu-bar waves-effect waves-light">
            <FontAwesomeIcon icon={faBars}/>
        </div>
    </header>
)

export default hot(module)(Header)
