import React from 'react'
import { hot } from "react-hot-loader";
import Waypoint from "react-waypoint";
import { highlightSection, fireProgressBar } from "../../utils/custom";


const Skills = () => (
    <section id="skill-section" className="skill-section">
    <div className="container">
        <div className="row">
            <div className="col s12 section-title">
                <h2>Skill</h2>
            </div>
            <div className="col s12">
                <Waypoint onEnter={() => {return highlightSection('skill')}}>
                <div className="col s12 section-content skill-wrapper w-block shadow-bg pdt-50 pdr-40 pdb-50 pdl-40">
                    
                    <div className="col l6 s12 skill-data">

                        <div className="progress-bar-wrapper">
                            <p className="progress-text">
                                C#
                                <span>90%</span>
                            </p>
                            <Waypoint onEnter={() => { fireProgressBar('csprogress') }}>
                                <div className="progress-bar">
                                    <span id="csprogress" data-percent="90"></span>
                                </div>
                            </Waypoint>
                        </div>

                        <div className="progress-bar-wrapper">
                            <p className="progress-text">
                                C++
                                <span>70%</span>
                            </p>
                            <Waypoint onEnter={() => { fireProgressBar('cppprogress') }}>
                                <div className="progress-bar">
                                    <span id="cppprogress" data-percent="70"></span>
                                </div>
                            </Waypoint>
                        </div>

                        <div className="progress-bar-wrapper">
                            <p className="progress-text">
                                Python
                                <span>80%</span>
                            </p>
                            <Waypoint onEnter={() => { fireProgressBar('pyprogress') }}>
                                <div className="progress-bar">
                                    <span id="pyprogress" data-percent="80"></span>
                                </div>
                            </Waypoint>
                        </div>

                    </div>

                    <div className="col l6 s12 skill-data skill-data-alt">

                        <div className="progress-bar-wrapper">
                            <p className="progress-text">
                                AWS
                                <span>70%</span>
                            </p>
                            <Waypoint onEnter={() => { fireProgressBar('awsprogress') }}>
                                <div className="progress-bar">
                                    <span id="awsprogress" data-percent="70"></span>
                                </div>
                            </Waypoint>
                        </div>

                        <div className="progress-bar-wrapper">
                            <p className="progress-text">
                                Javascript
                                <span>50%</span>
                            </p>
                            <Waypoint onEnter={() => { fireProgressBar('jsprogress') }}>
                                <div className="progress-bar">
                                    <span id="jsprogress" data-percent="50"></span>
                                </div>
                            </Waypoint>
                        </div>

                        <div className="progress-bar-wrapper">
                            <p className="progress-text">
                                SQL
                                <span>90%</span>
                            </p>
                            <Waypoint onEnter={() => { fireProgressBar('sqlprogress') }}>
                                <div className="progress-bar">
                                    <span id="sqlprogress" data-percent="90"></span>
                                </div>
                            </Waypoint>
                        </div>

                    </div>

                </div>
                </Waypoint>
            </div>
        </div>
    </div>
</section>
)
export default hot(module)(Skills)