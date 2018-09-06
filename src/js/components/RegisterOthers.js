import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Header from "./Header";
import store from "../store";
import { addUserToOrder, getCompanyInfo, addCurrentUserToOrder } from '../actions/orderActions';
@connect ((store) => {
  return {    
    user: store.user,
    company: store.order.Company.Login,
    admin: store.user.isAdmin,
    registeredUsers: store.order.Company.CompanyRegistrations
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
                <img className="img-fluid" src="http://placehold.it/1600x1600" alt="" />
              </div>
              <div className="col-8 d-flex align-items-center flex-wrap">
                <div>
                  <h2 className="h2 font-weight-light text-primary">Welcome to Directions EMEA registration process.</h2>

                  {this.props.admin===true &&                   
                    <p>Would you like to add further participants to this registration ?</p>
                  }  
                  {this.props.admin===true &&  
                    <div className="mb-3">
                      <button type="button" onClick={()=>this.props.dispatch(addCurrentUserToOrder(this.props.history,this.props.user.Email, "/add-more-members"))} className="btn btn-primary px-5">Register a colleague for Directions EMEA 2018</button>
                    </div>
                  }  
                
                  <div className="mb-3">
                    <button type="button" onClick={()=>this.props.dispatch(addCurrentUserToOrder(this.props.history,this.props.user.Email,"/review-register"))} className="btn btn-primary px-5">Register yourself for Directions EMEA 2018</button>
                  </div>
                  {this.props.registeredUsers.length > 0 && 
                    <div>
                      <Link to="/already-registered" className="btn btn-primary px-5">See existing registrations</Link>
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