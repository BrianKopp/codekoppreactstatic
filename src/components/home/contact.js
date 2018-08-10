import React, {Component} from 'react'
import { hot } from "react-hot-loader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faInfoCircle, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import Waypoint from "react-waypoint";
import { highlightSection, initGoogleMap } from "../../utils/custom";
import axios from 'axios';

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showValidation: false,
            nameMissing: false,
            emailMissing: false,
            emailInvalid: false,
            messageEmpty: false,
            formSubmitted: false
        };
        this.name = React.createRef();
        this.email = React.createRef();
        this.message = React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event) {
        event.preventDefault();
        console.debug('submitted form');
        this.setState({showValidation: true});
        let valid = true;
        if (!/\S/.test(this.name.current.value)) {
            this.setState({nameMissing: true})
            valid = false;
        } else {
            this.setState({nameMissing: false})
        }
        if (!/\S/.test(this.email.current.value)) {
            this.setState({emailMissing: true})
            valid = false;
        } else {
            this.setState({emailMissing: false})
        }
        if (!validateEmail(this.email.current.value)) {
            this.setState({emailInvalid: true})
            valid = false;
        } else {
            this.setState({emailInvalid: false})
        }
        if (!/\S/.test(this.message.current.value)) {
            this.setState({messageEmpty: true})
            valid = false;
        } else {
            this.setState({messageEmpty: false})
        }

        if (valid) {
            this.setState({formSubmitted: true});
            axios.post('https://hcut85qoch.execute-api.us-east-1.amazonaws.com/prod', {
                name: this.name.current.value,
                email: this.email.current.value,
                message: this.message.current.value
            })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error(error.response);
            });
        }
    }
    componentDidMount() {
        initGoogleMap();
    }
    render() {
        return (
            <section id="contact-section" className="contact-section">
            <div className="container">
                <div className="row">
                    <div className="col s12 section-title">
                        <h2>Contact</h2>
                    </div>
                    <div className="col s12 pd-0 mgt-20">
                        <div className="col l5 s12 contact-map">
                            <div className="col s12 w-block shadow-bg pd-0">
                                <div className="col s12 g-map-wrapper pd-0">
                                    <div id="g-map" style={{height:'438px'}}>	
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="map"></div>
                        <Waypoint onEnter={() => {return highlightSection('contact')}}>
                        <div className="col l7 s12 contact-form">
                            <div className="col s12 w-block shadow-bg pd-40">
                                {!this.state.formSubmitted &&
                                <form id="c-form" className="c-form" autoComplete="off" onSubmit={this.handleSubmit}>
                                    <fieldset>
                                        <input id="name" type="text" name="name" className="c-form-input" placeholder="Name" defaultValue="" ref={this.name} />
                                        {this.state.showValidation && this.state.nameMissing && 
                                            <div className="form-error">
                                            <p>Name is missing</p>
                                        </div>
                                        }
                                        <input id="email" type="text" name="email" className="c-form-input" placeholder="Email" defaultValue="" ref={this.email} />
                                        {this.state.showValidation && this.state.emailMissing && 
                                            <div className="form-error">
                                                <p>Email is missing</p>
                                            </div>
                                        }
                                        {this.state.showValidation && this.state.emailInvalid && !this.state.emailMissing &&
                                            <div className="form-error">
                                                <p>Email is invalid</p>
                                            </div>
                                        }
                                        <input id="message" type="text" name="message" className="c-form-input" placeholder="Message" defaultValue="" ref={this.message} />
                                        {this.state.showValidation && this.state.messageEmpty && 
                                            <div className="form-error">
                                                <p>Message is empty</p>
                                            </div>
                                        }
                                        <button className="btn-custom waves-effect" type="submit" name="button">Send Message</button>
                                        <FontAwesomeIcon id="c-form-spinner" icon={faCircleNotch}/>
                                    </fieldset>
                                </form>
                                }
                                {this.state.formSubmitted &&
                                    <div><h3>Thanks!</h3><p>Talk to you soon!</p></div>
                                }
                            </div>
                        </div>
                        </Waypoint>
                    </div>
                </div>
            </div>
        </section>
                );

    }
}
export default hot(module)(Contact)