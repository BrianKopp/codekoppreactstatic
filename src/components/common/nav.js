import React, { Component } from 'react'
import { hot } from "react-hot-loader";
import { Link } from 'react-static';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

class Nav extends Component {
	render() {
		const isHome = this.props.isHome || false;
		return (
			<nav className="main-nav hidden hero-height">
			<div className="menu-close waves-effect waves-light"><FontAwesomeIcon icon={faTimes}/></div>
			<ul>
					<li><Link exact to="/" className="animatescroll-link">Home</Link></li>
					<li><Link to="/#service-section" className="animatescroll-link service-section-nav">Service</Link></li>
					<li><Link to="/#skill-section" className="animatescroll-link skill-section-nav">Skill</Link></li>
					<li><Link to="/#experience-section" className="animatescroll-link experience-section-nav">Experience</Link></li>
					<li><Link to="/#reference-section" className="animatescroll-link reference-section-nav">Reference</Link></li>
					<li><Link to={isHome ? "/#blog-section": "/blog"} className="animatescroll-link blog-section-nav">Blog</Link></li>
					<li><Link to="/#contact-section" className="animatescroll-link contact-section-nav">Contact</Link></li>
			</ul>
		</nav>
		);
	}
}
export default hot(module)(Nav)