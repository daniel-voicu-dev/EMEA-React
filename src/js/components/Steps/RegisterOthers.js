import React, {useState} from 'react';
import {connect} from 'react-redux';
import Header from "../Header";
import { addUserToOrder} from '../../actions/orderActions';
import { goToAddMoreMembers } from '../../actions/userActions';
import history from "../../history";

const RegisterOthers = (props) => {
  let [PromoCode, setPromoCode] = useState("");
  
  let seeExistingRegistrations = props.registeredUsers.length > 0 ? ( <div><button type="button" onClick={() => history.push("/see-registrations")} className="btn btn-primary px-5">See existing registrations</button></div>) : ("");
  let adminActionBlock = props.admin && document.getElementById('RegisterOthersButton') == null ? (<div className="mb-3">
  {props.eventItems.map(o=> {return(<div className="mb-3"><button type="button" onClick={()=>props.goToAddMoreMembers(o)} id="RegisterOthersButton" className="btn btn-primary px-5">Next Step: Register for {o.ItemDescription}</button></div>)})}
  </div>) : ("");
  let nonAdminActionBlock = (props.isConfirmed === false && props.admin === false) ? (
    <div>
      <div className="mb-3 form-group">
        <label htmlFor="PromoCode">If you have a Promo Code please fill it before continuing with registration.</label>
        <input type="text" id="PromoCode" className="form-control rounded-0 col-4" name="PromoCode" onChange={(e) => setPromoCode(e.currentTarget.value)} /> 
      </div>
      <div className="mb-3">
        {props.eventItems.map(o=> {return (<div className="mb-3"><button type="button" onClick={()=>props.addUserToOrder({"RegistrationForEmail": props.user.Email, "PromoCode": PromoCode, "ItemNo": o.ItemNo, "EventNo": o.EventNo})} className="btn btn-primary px-5">Next Step: Register yourself for {o.ItemDescription}</button></div>)})}
      </div>                      
    </div>) : ("");
  
  return (
    <React.Fragment>
      <Header />
      <div className="container">
        <div className="row">
          <article className="col-12">
            <div className="row">
              <div className="col-4">
                <img className="img-fluid" src="/images/registration-emea-2019.png" alt="" />
              </div>
              <div className="col-8 d-flex align-items-center flex-wrap">
                <div>
                  <h2 className="h2 font-weight-light text-dark">{props.eventName} Registrations</h2>                  
                  {adminActionBlock}
                  {nonAdminActionBlock}
                  {seeExistingRegistrations}                  
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </React.Fragment>
  )
}



const mapStateToProps = (state /*, ownProps*/) => {
  return {
    user: state.user,
    company: state.order.Company.Login,
    admin: state.user.isAdmin,
    isConfirmed: state.user.isConfirmed,
    registeredUsers: state.order.Company.CompanyRegistrations,
    eventName: state.event.EventName,
    unregisteredUsers: state.user.UnregisteredUsers,
    eventItems: state.event.EventItems
  }
}

const mapDispatchToProps = { goToAddMoreMembers, addUserToOrder }

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterOthers)


