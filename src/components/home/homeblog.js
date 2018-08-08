import React, {Component} from 'react'
import { hot } from "react-hot-loader";
import {Link, withRouteData} from 'react-static';
import {array} from 'prop-types'

import Waypoint from "react-waypoint";
import { highlightSection } from "../../utils/custom";
import BlogBlurb from '../blog/BlogBlurb';

class HomeBlog extends Component {
    render() {
        const {posts} = this.props;
        return (
            <section id="blog-section" className="blog-section">
            <div className="container">
                <div className="row">
                    <div className="col s12 section-title">
                        <h2>Blog</h2>
                    </div>
                        
                    <Waypoint onEnter={() => {return highlightSection('blog')}}>
                    <div className="col s12 masonry pd-0">
                        {posts.map(post => (
                            <BlogBlurb key={post.data.slug} post={post} />
                        ))}
                    </div>
                    </Waypoint>
                    
                    <div className="col s12 blog-all al-center">
                        <Link exact to='/blog/' className="btn-custom waves-effect">All Blog Posts</Link>
                    </div>
                </div>
            </div>
        </section>
        )
    }
}
HomeBlog.protTypes = {
    posts: array.isRequired
}
export default withRouteData(HomeBlog);