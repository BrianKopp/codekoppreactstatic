import React from 'react'
import { hot } from "react-hot-loader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import Zoom from 'react-reveal/Zoom';

const Footer = () => (
    <footer className="footer">
    <div className="container">
        <div className="row">
            <div className="col s12 back-to-top-wrapper">
                <Zoom duration={700} delay={300}>
                <a className="btn-circle  waves-effect back-to-top tooltipped animatescroll-link " data-position="top" data-delay="50" data-tooltip="Go To Top" href="#0">
                    <FontAwesomeIcon icon={faAngleUp}/>
                </a>
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