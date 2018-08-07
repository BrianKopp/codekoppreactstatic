import React from 'react'
import { hot } from 'react-hot-loader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import Waypoint from "react-waypoint";
import { highlightSection } from "../../utils/custom";

const Education = () => (
    <section id="education-section" className="education-section">
    <div className="container">
        <div className="row">
            <div className="col s12 section-title">
                <h2>Education</h2>
            </div>
            <div className="col s12">
                <Waypoint onEnter={() => {return highlightSection('education')}}>
                <div className="col s12 section-content pd-0">
                    <ul className="timeline">

                        <li className="wow fadeIn" data-wow-duration="0.5s" data-wow-delay="0.3s" data-wow-offset="0">
                            <div className="timeline-badge">
                                <a><i><FontAwesomeIcon icon={faCircle}/></i></a>
                            </div>
                            <div className="timeline-panel w-block shadow-bg pd-30">
                                <div className="timeline-tag">
                                    Kansas State University
                                </div>
                                <div className="timeline-title timeline-title-alt">
                                    Mechanical & Nuclear Engineering
                                </div>
                                <div className="timeline-time">2008-2012</div>
                            </div>
                        </li>

                        <li className="clearfix no-float"></li>
                    </ul>
                </div>
                </Waypoint>
            </div>
        </div>
    </div>
</section>
)

export default hot(module)(Education)
