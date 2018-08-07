import React from 'react'
import { hot } from 'react-hot-loader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faDesktop, faLaptop, faCalculator, faCloud, faMicrochip, faCoffee} from '@fortawesome/free-solid-svg-icons'
import Waypoint from "react-waypoint";
import { highlightSection } from "../../utils/custom";
import Zoom from 'react-reveal/Zoom';

const Services = () => (
    <section id="service-section" className="service-section">
    <div className="container">
        <div className="row">
            <div className="col s12 section-title">
                <h2>Service</h2>
            </div>

            <Waypoint onEnter={() => {return highlightSection('service')}}>
            <div className="col s12 masonry pd-0 mgt-20">
                <Zoom duration={500} delay={300}>
                <div className="col l4 m6 s12 service-wrapper">
                    <div className="col s12 w-block shadow-bg">
                        <div className="service-center">
                            <FontAwesomeIcon icon={faDesktop} />
                            <div className="service-title">
                                Applications
                            </div>
                        </div>
                        <div className="service-desc">
                            <p>
                                An engineer by heart, I thrive crafting blazing fast, clean, and maintainable code.<br/>(Python, C#, C++)
                            </p>
                        </div>
                    </div>
                </div>
                </Zoom>

                <Zoom duration={500} delay={300}>
                <div className="col l4 m6 s12 service-wrapper">
                    <div className="col s12 w-block shadow-bg">
                        <div className="service-center">
                            <FontAwesomeIcon icon={faLaptop} />
                            <div className="service-title">
                                Front End
                            </div>
                        </div>
                        <div className="service-desc">
                            <p>
                                Angular by day, React by night. I make a slick, responsive, and intuitive websites.<br/>(React, Angular, Javascript)
                            </p>
                        </div>
                    </div>
                </div>
                </Zoom>

                <Zoom duration={500} delay={300}>
                <div className="col l4 m6 s12 service-wrapper">
                    <div className="col s12 w-block shadow-bg">
                        <div className="service-center">
                            <FontAwesomeIcon icon={faCloud} />
                            <div className="service-title">
                                Cloud & Serverless
                            </div>
                        </div>
                        <div className="service-desc">
                            <p>
                                AWS Lambda, S3, IoT, Api Gateway, Dynamo, Athena, EC2, Route 53, Cloud Formation, Code Pipeline, Cognito, etc.
                            </p>
                        </div>
                    </div>
                </div>
                </Zoom>

                <Zoom duration={500} delay={300}>
                <div className="col l4 m6 s12 service-wrapper">
                    <div className="col s12 w-block shadow-bg">
                        <div className="service-center">
                            <FontAwesomeIcon icon={faCalculator} />
                            <div className="service-title">
                                Math & Engineering
                            </div>
                        </div>
                        <div className="service-desc">
                            <p>
                                Optimization, Monte Carlo, advanced mathematical techniques. Nuclear & Mechanical Engineering background.
                            </p>
                        </div>
                    </div>
                </div>
                </Zoom>

                <Zoom duration={500} delay={300}>
                <div className="col l4 m6 s12 service-wrapper">
                    <div className="col s12 w-block shadow-bg">
                        <div className="service-center">
                            <FontAwesomeIcon icon={faMicrochip} />
                            <div className="service-title">
                                Internet of Things
                            </div>
                        </div>
                        <div className="service-desc">
                            <p>
                                Use scalable, maintainable, and productive Internet of Things devices to gain insights, command and control.
                                (AWS IoT, Python, C)
                            </p>
                        </div>
                    </div>
                </div>
                </Zoom>

                <Zoom duration={500} delay={300}>
                <div className="col l4 m6 s12 service-wrapper">
                    <div className="col s12 w-block shadow-bg">
                        <div className="service-center">
                            <FontAwesomeIcon icon={faCoffee} />
                            <div className="service-title">
                                Coffee
                            </div>
                        </div>
                        <div className="service-desc">
                            <p>
                                I can drink a lot of coffee. The beautiful warm, black, & bitter beverage fuels my programming and life endeavors.
                            </p>
                        </div>
                    </div>
                </div>
                </Zoom>
                
            </div>
            </Waypoint>
        </div>
    </div>
</section>
)

export default hot(module)(Services)
