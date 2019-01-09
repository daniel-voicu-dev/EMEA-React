import React, {Component} from 'react';
import {connect} from 'react-redux';

import Header from "./Header";
import Email from "./Email";
import Password from "./Password";

import { verifyUserAndGoToNextStep } from '../actions/userActions';
import store from "../store";
import axios from 'axios';
import Noty from 'noty';

@connect ((store) => {
  return {
    email: store.user.Email,
    domain: store.user.Domain,
    token: store.user.Token,
    error: store.user.error,
    eventName: store.event.EventName,
    loginMessage: store.user.LoginMessage
  }
})

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {      
      email: props.email,
      password: "",
      alert: false
    };
  }  
  
  getEmail(email) {
    this.setState({email});
  }
  getPassword(password) {
    this.setState({password});
  }
  resendPassword(e) {
    e.preventDefault();
    axios.post("/api/requestpassword",{"Login": this.props.email}).then((r) => {
      new Noty({
        text: "The password has been sent. Please check your email.",
        theme: 'mint',
        timeout: 3000,
        modal: true,
        layout: "center",
        type: "success"
      }).show();
    }).catch((error)=>{
      new Noty({
        text: "Something has gone wrong. Failed to send the password.",
        theme: 'mint',
        timeout: 1000,
        modal: true,
        layout: "center",
        type: "error"
      }).show();
    })
  }
  handleSend(e) {
    let canSend = this.state.email !== "" && this.state.password !== "";   
    if (canSend) {
      this.props.dispatch(verifyUserAndGoToNextStep(this.props.history, this.state.email, this.state.password));
    } else {
      this.setState({alert: true});      
    }
  }
  render() {   
    let alertClass = this.state.alert === true ? "alert alert-danger" : "alert alert-danger d-none";
    let alertGeneralClass = this.props.error !== "" ? "alert alert-danger" : "alert alert-danger d-none";
    let message = this.props.loginMessage ? (<p>Your email is already registered. Please use your credentials to login.</p>) : (<p>Your email address is <strong><u>already registered</u></strong>. Please use your credentials to login.</p>)
    return (
      <React.Fragment>
      <Header />
      <div className="container">
        <div className="row">
          <article className="col-12">
            <div className="row">
              <div className="col-4">
                <img className="img-fluid" src="/images/registration-asia-2019.png" alt="" />
              </div>
              <div className="col-8 d-flex align-items-center flex-wrap">
                <div>
                  <h2 className="h2 font-weight-light text-dark">{this.props.eventName} Registrations</h2>
                  {message}
                  <p className={alertClass}>Please fill in all the fields to continue.</p>
                  <p className={alertGeneralClass}>{this.props.error}</p>
                  <div>
                    <div className="form-group">
                      <label htmlFor="Email">Email</label>
                      <Email required={true} readonly={true} getEmail={(email) => {this.getEmail(email)}} setValue={this.props.email} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Password">Password</label>
                         <Password required={true} readonly={false} getPassword={(p) => {this.getPassword(p)}} />
                    </div>
                    <button type="button" onClick={(e) => this.handleSend(e)} className="px-5 btn btn-primary">Login</button>
                    <small className="w-100 d-block mt-2 resetPassword"><a href="#" onClick={(e) => this.resendPassword(e)}>Forgot your password ?</a></small>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
      </React.Fragment>
     )
  }
}