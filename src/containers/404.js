import React, { Component } from 'react'
import { Link } from 'react-static'
import { hot } from 'react-hot-loader'
//
import {fadeOutPreloader, setupCustom} from '../utils/custom'

class NotFound extends Component {
  componentDidMount() {
    fadeOutPreloader();
    setupCustom();
  }
  render() {
    return (
      <section id="error-404-section" className="error-404-section">
      <div className="container">
        <div className="row">
          <div className="col s12">
            <div className="col s12 blog-wrapper w-block shadow-bg al-center" style={{padding:"150px 50px"}}>
              <h2>Sorry, We couldn't find anything</h2>
              <Link exact to="/" className="btn-custom waves-effect waves-light">Home</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
        )
  }
}
export default hot(module)(NotFound)
