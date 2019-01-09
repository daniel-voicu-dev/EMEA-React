import React, {Component} from 'react';
import {connect} from 'react-redux';

import Header from "./Header";
import Email from "./Email";

import { goToLogin,  getCountries } from '../actions/userActions';
import { getEvent} from "../actions/eventActions";
import store from "../store";

@connect ((store) => {
  return {
    user: store.user,
    eventName: store.event.EventName,
    fillInFields: store.event.FillInFields
  }
})

export default class Start extends Component {
  constructor(props) {
    super(props);
    this.state = {      
      email: "",
      alert: false
    };
  }    
  componentWillMount() {    
    this.props.dispatch(getCountries());
    this.props.dispatch(getEvent());
  }
  getEmail(email) {
    this.setState({email});     
  }
  handleSend(e) {
    let canSend = this.state.email !== "";
    if (canSend) {
      this.props.dispatch(goToLogin(this.props.history, this.state.email));
    } else {
      this.setState({alert: true});      
    }
  }
  render() {  
    let canSend = this.state.email !== "" ? true : false; 
    let alertClass = this.state.alert === true ? "alert alert-danger" : "alert alert-danger d-none";   
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
                    <p>To register create a Directions Community User</p>
                    <p>Enter your business email to continue</p>
                    <p className={alertClass}>{this.props.fillInFields}</p>
                    <div id="form">
                      <div className="form-group">                        
                        <Email required={true} readonly={false} getEmail={(email) => {this.getEmail(email)}}/>
                      </div>
                      <div className="form-group">
                        <button type="button" className="px-5 btn btn-primary" onClick={(e) => this.handleSend(e)}>Next</button>   
                      </div>                      
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