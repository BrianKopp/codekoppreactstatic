import React, {Component} from 'react'
import { hot } from "react-hot-loader";
import { Link, withRouteData } from 'react-static';
import {array} from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faImage } from '@fortawesome/free-solid-svg-icons';
import Waypoint from "react-waypoint";
import { highlightSection } from "../../utils/custom";

class Portfolio extends Component {
    render() {
        const {items} = this.props;
        const {categories} = [].concat.apply([], items.map(i => {return i.tags}));
        return (
            <section id="portfolio-section" className="portfolio-section">
            <div className="container">
                <div className="row">
                    <div className="col s12 section-title">
                        <h2>Portfolio</h2>
                    </div>
                    <div className="col s12">
                        <Waypoint onEnter={() => {return highlightSection('portfolio')}}>
                        <div className="col s12 section-content pd-0">					
                            <ul className="filter">
                                <li><a className="active" href="#" data-filter="*">All</a></li>
                                <li><a href="#" data-filter=".python">Python</a></li>
                                <li><a href="#" data-filter=".go">Go</a></li>
                                <li><a href="#" data-filter=".javascript">Javascript</a></li>
                                <li><a href="#" data-filter=".angular">Angular</a></li>
                                <li><a href="#" data-filter=".react">React</a></li>
                            </ul>
                            
                            <ul className="portfolio-items">
                                {items.map(item => (
                                    <li key={item.id} className={`portfolio-content shadow-bg ${item.tags.join(' ')}`}>
                                    <figure>
                                        <img src="/img/portfolio/p.jpg" alt="" />
                                        <figcaption>
                                            <div className="portfolio-intro">
                                                <div className="portfolio-intro-category">
                                                    {item.tags.map(tag => (
                                                        <p key={tag}>{tag}</p>
                                                    ))}
                                                </div>
                                                <div className="portfolio-intro-title">
                                                    <Link exact to={`/portfolio/${item.id}`}>{item.title}</Link>
                                                </div>
                                                <div className="portfolio-intro-image">
                                                    <a className="btn-circle waves-effect portfolio-mfp tooltipped" data-position="top" data-delay="50" data-tooltip="View Photo" href="/img/portfolio/p.jpg">
                                                        <FontAwesomeIcon icon={faImage}/>
                                                    </a>
                                                </div>
                                                <div className="portfolio-intro-detail">
                                                    <a className="btn-circle waves-effect tooltipped" data-position="top" data-delay="50" data-tooltip="View Demo" href="#0" target="_blank">
                                                        <FontAwesomeIcon icon={faLink}/>
                                                    </a>
                                                </div>
                                            </div>
                                        </figcaption>
                                    </figure>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        </Waypoint>
                        <div className="col s12 portfolio-all al-center">
                            <a href="portfolio.html" className="btn-circle waves-effect tooltipped" data-position="top" data-delay="50" data-tooltip="All Portfolio"><span></span><span></span></a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        )
    }
}
Portfolio.propTypes = {
    items: array.isRequired
}
export default withRouteData(Portfolio);