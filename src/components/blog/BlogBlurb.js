import React, { Component } from 'react'
import { Link } from 'react-static'
import { hot } from 'react-hot-loader'
//
import Fade from 'react-reveal/Fade';


class BlogBlurb extends Component {
    render() {
      console.debug(this.props.post);
      return (
        <div className="col m6 s12 mgt-20">
            <Fade duration={500} delay={300}>
            <div className="col s12 blog-wrapper w-block shadow-bg pd-0">
                <div className="col s12 blog-img pd-0 image-bg" data-image-bg={`/img/blog/mid/${this.props.post.data.image_name}` || "img/blog/b.jpg"}>
                    <div className="blog-date waves-effect waves-light">{new Date(this.props.post.data.date).toLocaleDateString()}</div>
                </div>
                <div className="col s12 blog-desc pd-30">
                    <div className="blog-title">
                        <Link to={`/blog/post/${this.props.post.data.slug}/`}>{this.props.post.data.title}</Link>
                    </div>
                    <div className="blog-content">
                        <p>{this.props.post.data.blurb}</p>
                    </div>
                    <div className="blog-more">
                        <Link to={`/blog/post/${this.props.post.data.slug}/`} className="btn-custom waves-effect mgt-10 mgb-10">Read More</Link>
                    </div>
                </div>
            </div>
            </Fade>
        </div>
      )
    }
  }
export default hot(module)(BlogBlurb)
