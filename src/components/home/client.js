import React from 'react'
import { hot } from "react-hot-loader";
import Waypoint from "react-waypoint";
import { highlightSection } from "../../utils/custom";

const Client = () => (
    <section id="client-section" className="client-section">
    <div className="container">
        <div className="row">
            <div className="col s12 section-title">
                <h2>Client</h2>
            </div>
            <Waypoint onEnter={() => {return highlightSection('client')}}>
            <div className="col s12 client-wrapper">
                <div className="col s12 client-carousel w-block shadow-bg pd-0">
                    
                    <div className="item">
                        <img src="img/client/c.jpg" className="tooltipped" data-position="top" data-delay="50" data-tooltip="Client Name" alt=""/>
                    </div>
                    <div className="item">
                        <img src="img/client/c.jpg" className="tooltipped" data-position="top" data-delay="50" data-tooltip="Client Name" alt=""/>
                    </div>
                </div>
            </div>
            </Waypoint>
        </div>
    </div>
</section>
)
export default hot(module)(Client)