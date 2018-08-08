
import React, { Component } from 'react'
import {array} from 'prop-types'
import $ from 'jquery'

//

import BlogBlurb from '../components/blog/BlogBlurb'
import CommonHead from '../components/common/common_head'
import Footer from '../components/common/footer'
import { withRouteData } from 'react-static';

import {fadeOutPreloader, setupCustom} from '../utils/custom'

class Blog extends Component {
  componentDidMount() {
    fadeOutPreloader();
    setupCustom();
  }
  
  render() {
    const posts = this.props.posts;
    const blogTitle = this.props.blogTitle ? `Posts about ${this.props.blogTitle}` : 'blog';
    return (
      <div id="blog">
        <CommonHead title={blogTitle} type='' />
        <section id="all-blog-section" className="all-blog-section">
          <div className="container">
            <div className="row">
              <div className="col s12 masonry pd-0">
                {posts.map(post => (
                  <BlogBlurb key={post.data.slug} post={post}/>
                ))}
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
      );
  }
}
Blog.propTypes = {
  posts: array.isRequired
};
export default withRouteData(Blog);