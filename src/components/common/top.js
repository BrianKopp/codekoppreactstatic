import React from 'react'
import { hot } from "react-hot-loader";


const TopSection = ({title, type}) => (
    <div className={"site-header top-section image-bg parallax-section " + (type==='' ? " " : (type==='home' ? "top-section-home" : "top-section-single"))}>
        <div className="overlay-section">
            <div className="container">
                <div className="row">
                    <div className="col s12">
                        <div className="site-header-title">
                            {title}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
)
export default hot(module)(TopSection)
