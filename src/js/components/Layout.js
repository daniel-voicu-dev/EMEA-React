import React from 'react';
import {Route, HashRouter} from 'react-router-dom';

import PickEvent from "./Steps/PickEvent";
import Start from "./Steps/Start";
import Login from "./Steps/Login";
import CreateUser from "./CreateUser";
import RegisterOthers from "./Steps/RegisterOthers";
import ReviewRegister from "./ReviewRegister";
import RegisterCompleted from "./RegisterCompleted";
import AddMoreMembers from "./AddMoreMembers";
import AddNewMember from "./AddNewMember";
import PickCompany from "./PickCompany";
import SeeExistingRegistrations from './SeeExistingRegistrations';

import "../../sass/main.sass";

const Layout = () => {
  return (
    <HashRouter basename="/">
      <React.Fragment> 
        <Route exact path='/' component={PickEvent} /> 
        <Route path='/start' component={Start} />
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

export default Layout
