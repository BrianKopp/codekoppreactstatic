import React, { Component } from 'react'
import { withRouteData, Link } from 'react-static';
import $ from 'jquery'
//
import CommonHead from '../components/common/common_head'
import Footer from '../components/common/footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faTags } from '@fortawesome/free-solid-svg-icons';

import {fadeOutPreloader, setupCustom} from '../utils/custom'

import './Post.css'

class Post extends Component {
  componentDidMount() {
    fadeOutPreloader();
		setupCustom();
		hljs.initHighlighting();
	}
	componentDidUpdate() {
		hljs.initHighlighting();
	}
	render() {
    const {post, recentPosts, categories} = this.props;
    return (
      <div id="post">
        <CommonHead title='' type='single' />
        <div className="single-blog-section">
			    <div className="container">
			    	<div className="row">
			    		<div className="col l8 s12 single-blog-wrapper">
			    			<div className="col s12 w-block shadow-bg pd-0">
                  <div className="col s12 single-blog-thumbnail pd-0">
			    					<img src={`/img/blog/full/${post.data.image_name}` || "/img/blog/b.jpg"} alt="" />
			    				</div>
			    				<div className="col s12 pd-50 pd-md-40 pd-sm-30">
			    					<div className="single-blog-title">
			    						{post.data.title}
			    					</div>
			    					<div className="blog-data">
											<span>{new Date(post.data.date).toLocaleDateString()}</span>
			    					</div>
										<div className="blog-data">
											<Link exact to='/blog' className='m0'>All Posts</Link>
										</div>
			    					<div className="single-blog-content">
                      <div dangerouslySetInnerHTML={{ __html: post.contents}} />
			    					</div>
			    					<div className="single-blog-taxonomy">
			    						<div className="single-blog-category">
												<FontAwesomeIcon className="single-blog-taxonomy-item" icon={faFolder}/>
			    							<div>
                          {post.data.categories.map(category => (
                            <Link key={category} exact to={`/blog/category/${category}/`}>{category}</Link>
                          ))}
			    							</div>                      
			    						</div>
			    						<div className="single-blog-tags mgt-15">
												<FontAwesomeIcon className="single-blog-taxonomy-item" icon={faTags}/>
			    							<div>
                          {post.data.tags.map(tag => (
                            <Link key={tag} exact to="">{tag}</Link>
                          ))}
			    							</div>                  
			    						</div>
			    					</div>
			    				</div>
			    			</div>
              </div>
			    		<div className="col l4 s12 sidebar-wrapper">
			    			<div className="col s12 single-sidebar w-block shadow-bg pdt-30 pdr-30 pdb-40 pdl-30">
			    				<div className="sidebar-title">
			    					Recent Posts
			    				</div>
			    				<div className="related-post-content">
                    {recentPosts.map(recentPost => (
                      <div key={recentPost.data.slug} className="related-post-single">
                        <div className="related-post-img image-bg" data-image-bg={`/img/blog/tn/${recentPost.data.image_name}` || "/img/blog/b.jpg"}></div>
                        <div className="related-post-title">
                          <Link exact to={`/blog/post/${recentPost.data.slug}/`}>{recentPost.data.title}</Link>
                        </div>
                      </div>
                    ))}
                  </div>
			    			</div>
			    			<div className="col s12 single-sidebar w-block shadow-bg pd-30">
			    				<div className="sidebar-content">
			    					<div className="sidebar-title">Categories</div>
			    				</div>
			    				<ul className="category-sidebar-list">
                    {categories.map(cat => (
                      <li key={cat} className="category-sidebar-list">
												<FontAwesomeIcon className="single-blog-taxonomy-item" icon={faTags}/>
												<Link exact to={`/blog/category/${cat}/`}>{cat}</Link>
											</li>
                    ))}
			    				</ul>
			    			</div>
			    		</div>
			    	</div>
			    </div>
		    </div>
        <Footer />
      </div>
      );
  }
}
export default withRouteData(Post);