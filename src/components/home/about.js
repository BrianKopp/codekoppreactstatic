import React from 'react'
import { hot } from "react-hot-loader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import {faFacebook, faTwitter, faGooglePlus, faGithub, faLinkedin} from '@fortawesome/free-brands-svg-icons'
import Waypoint from "react-waypoint";
import { highlightSection } from "../../utils/custom";
import Fade from 'react-reveal/Fade'

const About = () => (
    <section id="about-section" className="about-section">
    <Waypoint onEnter={() => {return highlightSection('about')}}>
    <div className="section-content">
        <div className="container">
            <div className="row">
                <Fade up duration={1000} delay={300}>
                <div className="col s12">
                    <div className="col s12 w-block shadow-bg pd-0">
                        <div className="col m5 s12 about-img parallax-layer al-center pd-50">
                            <a className="btn-circle waves-effect download-resume tooltipped" data-position="top" data-delay="50" data-tooltip="Download Resume" href="#0">
                                <FontAwesomeIcon icon={faDownload}/>
                            </a>
                            <img className="about-img-content hoverable z-depth-2" src="/img/me.jpg" />
                            <div className="about-name">Brian Kopp</div>
                            <div className="about-title">Software Engineer</div>
                        </div>
                        <div className="col m7 s12 about-data-wrapper pd-50">
                            <div className="about-desc pd-0">
                                <div className="about-section-title">About Me</div>
                                <div className="about-data">
                                    <p>
                                        Hi! Thanks for stopping by! I'm a lifelong learner who made his way from
                                        nuclear engineering to software development. I have always loved discovering
                                        and learning about new techniques to solve challenging problems. These days,
                                        I spend my time solving problems in C#, C++, Python and Javascript.
                                        Take a look at what I'm working on!
                                    </p>
                                    
                                    <div><span>Age</span>28</div>
                                    <div><span>Address</span>6754 Spruce Hill Ct, Colorado Springs</div>
                                    <div><span>Email</span>briankopp.usa@gmail.com</div>
                                    <div><span>Phone</span>816-309-2843</div>
                                    <div><span>Website</span>http://www.codekopp.com</div>
                                </div>
                            </div>
                        </div>
                        <div className="about-social col s12 pd-0">
                            <a className="waves-effect waves-light" href="#0"><FontAwesomeIcon icon={faFacebook}/></a>
                            <a className="waves-effect waves-light" href="#0"><FontAwesomeIcon icon={faTwitter}/></a>
                            <a className="waves-effect waves-light" href="#0"><FontAwesomeIcon icon={faGooglePlus}/></a>
                            <a className="waves-effect waves-light" href="#0"><FontAwesomeIcon icon={faGithub}/></a>
                            <a className="waves-effect waves-light" href="#0"><FontAwesomeIcon icon={faLinkedin}/></a>
                        </div>
                    </div>
                </div>
                </Fade>
            </div>
        </div>
    </div>
    </Waypoint>
</section>
)
export default hot(module)(About)