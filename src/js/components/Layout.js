import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, Link, BrowserRouter as Router, HashRouter} from 'react-router-dom';

import store from "../store";
import Start from "./Start";
import Login from "./Login";
import CreateUser from "./CreateUser";
import RegisterOthers from "./RegisterOthers";
import ReviewRegister from "./ReviewRegister";
import RegisterCompleted from "./RegisterCompleted";
import "../../sass/main.sass";



@connect ((store) => {
  return {
    event: store.event
  }
})


export default class Layout extends Component {
  render() {
    console.log(this.props);
    return (
      <HashRouter basename="/">
        <React.Fragment>
          <Route exact path='/' component={Start} />
          <Route path='/login' component={Login} />
          <Route path='/create-user' component={CreateUser} />
          <Route path='/register-others' component={RegisterOthers} />
          <Route path='/review-register' component={ReviewRegister} />
          <Route path='/registration-completed' component={RegisterCompleted} />
        </React.Fragment>
      </HashRouter>
    );
  }
}