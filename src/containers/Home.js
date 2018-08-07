import React, { Component } from 'react'
import {array} from 'prop-types'
import { withRouteData } from 'react-static';

import CommonHead from '../components/common/common_head'
import Footer from '../components/common/footer'
import PostScript from '../components/common/post_scripts'

import About from '../components/home/about'
import Services from '../components/home/services'
import Skills from '../components/home/skills'
import Experience from '../components/home/experience'
import Portfolio from '../components/common/portfolio'
import Reference from '../components/home/reference'
import HomeBlog from '../components/home/homeblog'
import Contact from '../components/home/contact'

// utils
import {fadeOutPreloader, setupCustom} from '../utils/custom'

class Home extends Component {
  componentDidMount() {
    fadeOutPreloader();
    setupCustom();
  }
  render() {
    const {posts, portfolioItems} = this.props;
    return (
      <div id="home">
        <CommonHead title='' type='home'/>
        <About />
        <Services />
        <Skills />
        <Experience />
        <Reference />
        <HomeBlog posts={posts}/>
        <Contact />
        <Footer />
        <PostScript />
      </div>
    )
  }
}
Home.propTypes = {
  posts: array.isRequired,
  portfolioItems: array.isRequired
};
export default withRouteData(Home);