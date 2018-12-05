import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, Link, BrowserRouter as Router, HashRouter} from 'react-router-dom';

import store from "../store";
import Event from "./Event";
import Start from "./Start";
import Login from "./Login";
import CreateUser from "./CreateUser";
import RegisterOthers from "./RegisterOthers";
import ReviewRegister from "./ReviewRegister";
import RegisterCompleted from "./RegisterCompleted";
import AddMoreMembers from "./AddMoreMembers";
import AddNewMember from "./AddNewMember";
import PickCompany from "./PickCompany";
import "../../sass/main.sass";
import SeeExistingRegistrations from './SeeExistingRegistrations';



@connect ((store) => {
  return {
    event: store.event
  }
})


export default class Layout extends Component {  
  render() {    
    return (
      <HashRouter basename="/">
        <React.Fragment>         
          <Route exact path='/' component={Start} />
          <Route path='/login' component={Login} />
          <Route path='/create-user' component={CreateUser} />
          <Route path='/register-others' component={RegisterOthers} />
          <Route path='/review-register' component={ReviewRegister} />
          <Route path='/registration-completed' component={RegisterCompleted} />
          <Route path='/add-more-members' component={AddMoreMembers} />
          <Route path='/add-new-member' component={AddNewMember} />
          <Route path='/pick-company' component={PickCompany} />
          <Route path='/see-registrations' component={SeeExistingRegistrations} />
        </React.Fragment>
      </HashRouter>
    );
  }
}