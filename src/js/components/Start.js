import React, {Component} from 'react';
import {connect} from 'react-redux';

import Header from "./Header";
import Email from "./Email";

import { getStepOne } from '../actions/userActions';
import store from "../store";

@connect ((store) => {
  return {
    user: store.user,
    event: store.event
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
  // componentWillMount() {
  //   if (Object.keys(this.props.event).length === 0) {
  //     this.props.history.push("/");
  //   }
  // }
  getEmail(email) {
    this.setState({email});     
  }
  handleSend(e) {
    let canSend = this.state.email !== "";
    if (canSend) {
      this.props.dispatch(getStepOne(this.props.history, this.state.email));
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
                  <img className="img-fluid" src="http://placehold.it/1600x1600" alt="" />
                </div>
                <div className="col-8 d-flex align-items-center flex-wrap">                  
                  <div>
                    <h2 className="h2 font-weight-light text-primary">Welcome to Directions EMEA Community</h2>
                    <p className="">Enter you business email to login and register</p>
                    <p className={alertClass}>Please fill in all the fields to continue.</p>
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