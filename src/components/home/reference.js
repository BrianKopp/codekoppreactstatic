import React from 'react'
import { hot } from "react-hot-loader";
import Waypoint from "react-waypoint";
import { highlightSection } from "../../utils/custom";


const Reference = () => (
    <section id="reference-section" className="reference-section">
    <div className="container">
        <div className="row">
            <div className="col s12 section-title">
                <h2>Reference</h2>
            </div>
            <div className="col s12">
                <Waypoint onEnter={() => {return highlightSection('reference')}}>
                <div className="reference-wrapper col s12 w-block shadow-bg">
                    <div className="reference-carousel">
                        <div className="item">
                            <div className="reference-author">
                                Carrie Rubalcava
                            </div>
                            <div className="reference-company">
                                Black & Veatch
                            </div>
                            <div className="reference-content">
                                <p>
                                Not only is a Brian a top performer, his character and values are also
                                a big differentiator. Having the intelligence to make good business 
                                decisions while maintaining integrity, trustworthiness, and respect distinguishes
                                 Brian as a true Leader. Brian is truly invaluable on teams and in
                                  high demand on projects. It was a pleasure working with him.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                </Waypoint>
            </div>
        </div>
    </div>
</section>
)
export default hot(module)(Reference)