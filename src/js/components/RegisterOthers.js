import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Header from "./Header";
import store from "../store";
import { addUserToOrder, getCompanyInfo, addCurrentUserToOrder } from '../actions/orderActions';
import { goToAddMoreMembers } from '../actions/userActions';
@connect ((store) => {
  return {    
    user: store.user,
    company: store.order.Company.Login,
    admin: store.user.isAdmin,
    isConfirmed: store.user.isConfirmed,
    registeredUsers: store.order.Company.CompanyRegistrations,
    eventName: store.event.EventName,
    unregisteredUsers: store.user.UnregisteredUsers
  }
})

export default class RegisterOthers extends Component {  
  // componentWillMount() {
  //   this.props.dispatch(getCompanyInfo(this.props.company));
  // }  
  render() {    
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
                  <h2 className="h2 font-weight-light text-dark">{this.props.eventName} Registration</h2>

                  {(this.props.admin===true && this.props.unregisteredUsers.length > 0) &&                  
                    <p>Would you like to add further participants to this registration ?</p>
                  }  
                  {(this.props.admin===true && this.props.unregisteredUsers.length > 0) &&  
                    <div className="mb-3">
                      <button type="button" onClick={()=>this.props.dispatch(goToAddMoreMembers(this.props.history))} className="btn btn-primary px-5">Register a colleague for {this.props.eventName}</button>
                    </div>
                  }  
                  {this.props.isConfirmed===false &&  
                    <div className="mb-3">
                      <button type="button" onClick={()=>this.props.dispatch(addUserToOrder(this.props.history,this.props.user.Email,"/review-register"))} className="btn btn-primary px-5">Register yourself for {this.props.eventName}</button>
                    </div>
                  }
                  {this.props.registeredUsers.length > 0 && 
                    <div>
                      <button type="button" onClick={() => this.props.history.push("/see-registrations")} className="btn btn-primary px-5">See existing registrations</button>
                    </div>
                  }
                  
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