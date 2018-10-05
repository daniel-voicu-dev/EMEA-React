import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, Link, BrowserRouter as Router, HashRouter} from 'react-router-dom';
import Header from "./Header";
import axios from 'axios';

import { setEvent } from '../actions/eventActions';
import { getCountries } from '../actions/userActions';
import store from "../store";

@connect ((store) => {
  return {
    event: store.event
  }
})


export default class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {      
      events: [],
      selectedEvent: {},
      alert: false
    };
  }  
  componentWillMount() {   
    axios.get("resources/getEvent.json").then(r=>{
      let events = r.data.eventItems;
      this.setState({events});
    })    
    this.props.dispatch(getCountries());
  }  
  setEvent(e) {
    let selectedEvent = this.state.events.filter(x=>x.eventNo === e.currentTarget.value)[0] !== undefined ? this.state.events.filter(x=>x.eventNo === e.currentTarget.value)[0] : {};
    
    this.props.dispatch(setEvent(selectedEvent));
    this.setState({selectedEvent});
    this.setState({alert: false});
  }
  goToStart() {
    if (Object.keys(this.state.selectedEvent).length > 0) {
      this.props.history.push("/start");
    } else {
      this.setState({alert: true});
    }
  }
  render() {      
    let alertClass = this.state.alert === true ? "alert alert-danger" : "alert alert-danger d-none";   
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
                    <p className="">In order to continue please select an event.</p>
                    <p className={alertClass}>Please select an event to continue</p>                 
                    <select onChange={(e)=>this.setEvent(e)} className="form-control mb-3">
                      <option value="">Please select an event</option>
                      {this.state.events.map((o,i)=> {return( <option key={i} value={o.eventNo}>{o.eventName}</option>)})}
                    </select>
                    <button type="button" onClick={() => this.goToStart()} className="btn btn-primary px-5">Next</button>
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