import React from 'react'
import { hot } from "react-hot-loader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import Zoom from 'react-reveal/Zoom';
import { Link } from 'react-static';

const Footer = () => (
    <footer className="footer">
    <div className="container">
        <div className="row">
            <div className="col s12 back-to-top-wrapper">
                <Zoom duration={700} delay={300}>
                <Link className="btn-circle waves-effect back-to-top tooltipped animatescroll-link" exact to="/#about-section">
                    <FontAwesomeIcon icon={faAngleUp}/>
                </Link>
                </Zoom>
                <div className="copyright-text">
                    &copy; All rights Reserved.
                </div>
            </div>
        </div>
    </div>
</footer>
)
export default hot(module)(Footer)