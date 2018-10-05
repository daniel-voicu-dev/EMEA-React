import React, {Component} from 'react';
import {connect} from 'react-redux';

import Header from "./Header";
import Email from "./Email";
import Password from "./Password";

import { getUser } from '../actions/userActions';
import store from "../store";

@connect ((store) => {
  return {
    email: store.user.Email,
    domain: store.user.Domain,
    token: store.user.Token,
    error: store.user.error   
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
  handleSend(e) {
    let canSend = this.state.email !== "" && this.state.password !== "";   
    if (canSend) {
      this.props.dispatch(getUser(this.props.history, this.state.email, this.state.password));
    } else {
      this.setState({alert: true});      
    }
  }
  render() {   
    let alertClass = this.state.alert === true ? "alert alert-danger" : "alert alert-danger d-none";
    let alertGeneralClass = this.props.error !== "" ? "alert alert-danger" : "alert alert-danger d-none";
    return (
      <React.Fragment>
      <Header />
      <div className="container">
        <div className="row">
          <article className="col-12">
            <div className="row">
              <div className="col-4">
                <img className="img-fluid" src="http://registration.dotfusion.ro/RegistrationTest/images/registration2-asia2018.png" alt="" />
              </div>
              <div className="col-8 d-flex align-items-center flex-wrap">
                <div>
                  <h2 className="h2 font-weight-light text-primary">Welcome to Directions EMEA registration process.</h2>
                  <p>Your email address is <strong><u>already registered</u></strong>. Please use your credentials to login.</p>
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
                    <small className="w-100 d-block mt-2"><a href="/reset-password">Forgot your password ?</a></small>
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