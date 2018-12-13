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
  constructor(props) {
    super(props);
    this.state = {
      PromoCode: ""    
    }
  }
  changeInputTextState(e){
    this.setState({...this.state, [e.currentTarget.attributes.name.value]: [e.currentTarget.value] });
  }
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
                  <h2 className="h2 font-weight-light text-dark">{this.props.eventName} Registrations</h2>
                  {(this.props.admin===true) &&  
                    <div className="mb-3">
                      <button type="button" onClick={()=>this.props.dispatch(goToAddMoreMembers(this.props.history))} className="btn btn-primary px-5">Next Step: Register for {this.props.eventName}</button>
                    </div>
                  }  
                  {this.props.isConfirmed===false && this.props.admin === false &&
                    <div>
                      <div className="mb-3">
                        <button type="button" data-toggle="modal" data-target="#RegisterYourselfModal" className="btn btn-primary px-5">Next Step: Register yourself for {this.props.eventName}</button>
                      </div>
                      <div id="RegisterYourselfModal" className="modal" tabIndex="-1" role="dialog">
                        <div className="modal-dialog" role="document">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="modal-title">Add a promo code</h5>
                              <button type="button" type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div className="modal-body">
                              <div>                               
                                  <div className="form-group">
                                      <label htmlFor="PromoCode">Promo Code</label>
                                      <input type="text" id="PromoCode" className="form-control" name="PromoCode" onChange={(e) => this.changeInputTextState(e)} /> 
                                  </div>
                              </div>
                            </div>
                            <div className="modal-footer">
                              <button type="button" type="button" className="btn btn-primary" onClick={()=>this.props.dispatch(addUserToOrder(this.props.history,{"RegistrationForEmail": this.props.user.Email, "PromoCode": this.state.PromoCode},"/review-register"))}>Register</button>                              
                            </div>
                          </div>
                        </div>
                      </div>
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