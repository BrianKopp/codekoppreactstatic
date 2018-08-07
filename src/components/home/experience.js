import React from 'react'
import { hot } from 'react-hot-loader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import Waypoint from "react-waypoint";
import { highlightSection } from "../../utils/custom";

import Fade from 'react-reveal/Fade';


const Experience = () => (
    <section id="experience-section" className="experience-section">
    <div className="container">
        <div className="row">
            <div className="col s12 section-title">
                <h2>Experience</h2>
            </div>
            <div className="col s12">
                <Waypoint onEnter={() => {return highlightSection('experience')}}>
                <div className="col s12 section-content pd-0">
                    <ul className="timeline">							
                        <Fade duration={500} delay={300}>
                        <li>
                            <div className="timeline-badge">
                                <a><i><FontAwesomeIcon icon={faCircle}/></i></a>
                            </div>
                            <div className="timeline-panel w-block shadow-bg pd-30">
                                <div className="timeline-tag">
                                    Atonix
                                </div>
                                <div className="timeline-title timeline-title-alt">
                                    Software Engineer
                                </div>
                                <div className="timeline-desc">
                                    <p>
                                        Translate business and technical requirements into powerful software solutions within a collaborative
                                        agile environment. Document, design, and implement enhancements to enterprise software with strict
                                        attention to detail. Produce clean, effective, and efficient code in multiple object-oriented environments
                                        (C#, C++, python, etc.). Investigate, troubleshoot, and debug software maintenance items.
                                    </p>
                                </div>
                                <div className="timeline-time">2018-Present</div>
                            </div>
                        </li>
                        </Fade>
                        <Fade duration={500} delay={300}>
                        <li className="timeline-inverted">
                            <div className="timeline-badge">
                                <a><i><FontAwesomeIcon icon={faCircle}/></i></a>
                            </div>
                            <div className="timeline-panel w-block shadow-bg pd-30">
                                <div className="timeline-tag">
                                    Black & Veatch
                                </div>
                                <div className="timeline-title timeline-title-alt">
                                    Solutions Engineer
                                </div>
                                <div className="timeline-desc">
                                    <p>
                                        Develop prototype solutions by applying advanced mathematical techniques to real-world problems,
                                        including mixed-integer linear programming and Monte Carlo simulation.
                                        Deliver in-person and virtual sales presentations to prospective clients to increase corporate revenues.
                                        Serve as client interface throughout project lifecycle, ensuring enhanced customer satisfacton.
                                        Produce and provide hands-on training to increase client skill levels.
                                    </p>
                                </div>
                                <div className="timeline-time">2014-2018</div>
                            </div>
                        </li>
                        </Fade>
                        <Fade duration={500} delay={300}>
                        <li>
                            <div className="timeline-badge">
                                <a><i><FontAwesomeIcon icon={faCircle}/></i></a>
                            </div>
                            <div className="timeline-panel w-block shadow-bg pd-30">
                                <div className="timeline-tag">
                                    Black & Veatch
                                </div>
                                <div className="timeline-title timeline-title-alt">
                                    Mechanical Engineer
                                </div>
                                <div className="timeline-desc">
                                    <p>
                                        Support C++ MFC (EPRI Vista) rankine-cycle power plant modeling software. Implement technical enhancements.
                                        Produce and lead user training. Review industry research. Analyze power systems. Conduct exploratory studies.
                                        Submit reports. Deliver sales and report presentations.
                                    </p>
                                </div>
                                <div className="timeline-time">2018-Present</div>
                            </div>
                        </li>
                        </Fade>
                        <Fade duration={500} delay={300}>
                        <li className="timeline-inverted">
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
                                <div className="timeline-desc">
                                    <p>
                                        Rigorous coursework in mathematics and physics. Graduate-level electives included reactor physics,
                                        radiation detection, shielding, and monte carlo methods.
                                        Tutoring & grading as teacher's assistant. Implemented numerical methods as research assistant for
                                        H-He neutron source application. Played trombone in marching band and basketball band.
                                    </p>
                                </div>
                                <div className="timeline-time">2014-2018</div>
                            </div>
                        </li>
                        </Fade>

                        <li className="clearfix no-float"></li>
                    </ul>
                </div>
                </Waypoint>
            </div>
        </div>
    </div>
</section>
)

export default hot(module)(Experience)
