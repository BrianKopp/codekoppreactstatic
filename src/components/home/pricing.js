import React from 'react'
import { hot } from "react-hot-loader";
import Waypoint from "react-waypoint";
import { highlightSection } from "../../utils/custom";

const Pricing = () => (
    <section id="pricing-section" className="pricing-section">
    <div className="container">
        <div className="row">
            <div className="col s12 section-title">
                <h2>Pricing</h2>
            </div>

            <Waypoint onEnter={() => {return highlightSection('pricing')}}>
            <div className="col s12 masonry pd-0">
                
                <div className="col l4 m6 s12 mgt-20">
                    <div className="col s12 pricing-wrapper pd-0 wow fadeInLeft" data-wow-duration="0.5s" data-wow-delay="0.3s" data-wow-offset="0">
                        <div className="col s12 w-block shadow-bg">
                            <div className="pricing-title">
                                Basic
                            </div>
                            <div className="pricing-price">
                                $50/YEAR
                            </div>
                            <div className="pricing-data">
                                <p>1 Website</p>
                                <p>1GB Storage</p>
                                <p>10GB Bandwidth</p>
                                <p>100 Email Accounts</p>
                                <p>Unlimited Plugins<span>New</span></p>
                                <p>24/7 Support</p>
                            </div>
                            <div className="pricing-order">
                                <a className="btn-custom waves-effect" href="#0">Order Now</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col l4 m6 s12 mgt-20">
                    <div className="col s12 pricing-wrapper pd-0 wow zoomIn" data-wow-duration="0.5s" data-wow-delay="0.3s" data-wow-offset="0">
                        <div className="col s12 w-block shadow-bg">
                            <div className="pricing-title">
                                Economy
                            </div>
                            <div className="pricing-price">
                                $100/YEAR
                            </div>
                            <div className="pricing-data">
                                <p>5 Websites</p>
                                <p>10GB Storage</p>
                                <p>Unlimited Bandwidth</p>
                                <p>500 Email Accounts</p>
                                <p>Unlimited Plugins<span>New</span></p>
                                <p>24/7 Support</p>
                            </div>
                            <div className="pricing-order">
                                <a className="btn-custom waves-effect" href="#0">Order Now</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col l4 m6 s12 mgt-20">
                    <div className="col s12 pricing-wrapper pd-0 wow fadeInRight" data-wow-duration="0.5s" data-wow-delay="0.3s" data-wow-offset="0">
                        <div className="col s12 w-block shadow-bg">
                            <div className="pricing-title">
                                Delux
                            </div>
                            <div className="pricing-price">
                                $200/YEAR
                            </div>
                            <div className="pricing-data">
                                <p>Unlimited Websites</p>
                                <p>Unlimited Storage</p>
                                <p>Unlimited Bandwidth</p>
                                <p>Unlimited Email Accounts</p>
                                <p>Unlimited Plugins<span>New</span></p>
                                <p>24/7 Support</p>
                            </div>
                            <div className="pricing-order">
                                <a className="btn-custom waves-effect" href="#0">Order Now</a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            </Waypoint>

        </div>
    </div>
</section>
)
export default hot(module)(Pricing)