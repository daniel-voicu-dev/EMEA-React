import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import Header from './Header';
import {connect} from 'react-redux';
import { addUserToOrder, removeUserFromOrder, addUserListToOrder } from '../actions/orderActions';
@connect ((store) => {
  return {
    currentUser: store.user.Email,
    users: store.user.UnregisteredUsers,
    order: store.order.Users,
    eventName: store.event.EventName
  }
})
class AddMoreMembers extends Component {
  constructor(props) {
    super(props);
    this.state = {      
      "usersToRegister": []
    };
  }    
  handleCheck(e,name, email){   
    if(e.target.checked === true ) {
      //add
      this.setState({usersToRegister: [...this.state.usersToRegister, {"email": email,"promo":""}]}); 
      // dispatch({type: "ADD_USER_TO_ORDER", payload: {"Name": email, "Login": email}});
    } else {
      //remove
      this.setState({usersToRegister: [...this.state.usersToRegister.filter(v=>{return v.email !== email})]});
      // dispatch({type: "REMOVE_USER_FROM_ORDER", payload: {"Name": email, "Login": email}});
    }
  } 
  handlePromoCode(e, email) {    
    if (this.state.usersToRegister.filter(o => o.email == email).length > 0) {
      let userArray = this.state.usersToRegister.reduce((r,v,k)=>{
        return v.email === email ? [...r,{...v,"promo": e.currentTarget.value}] : [...r,v]
      },[]);
      this.setState({usersToRegister: userArray});
    } 
  }
  renderChild(o,i) {
    let id= "check-" + i;
    // let defaultCheck = this.props.order.filter(x=> {return x.Login === o.Email}).length > 0;
    let defaultCheck = false;    
    let isChecked = this.state.usersToRegister.filter(obj => obj.email === o.Email).length > 0;
    console.log(isChecked);
    let promoCodeInput = isChecked ? 
      (<div className="col-4">
        <input type="text" className="form-control" onChange={(e) => this.handlePromoCode(e, o.Email)} data-email={o.Email} placeholder="Enter a promo code" />
      </div>) : 
      ""
    if(o.Email === this.props.currentUser) {
      return (
        <div className="form-group" key={i}>
          <div className="col mb-2">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value={o.Email} id={id} defaultChecked={defaultCheck} onChange={(e)=>this.handleCheck(e,o.Name, o.Email)}/>
              <label className="form-check-label text-primary" htmlFor={id}>
                <strong>{o.Name}(Admin)</strong>
              </label>
            </div>
          </div>
          {promoCodeInput}          
        </div>
        
      );
    } 
    return (
      <div className="form-group" key={i}>
        <div className="col mb-2">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value={o.Email} id={id} defaultChecked={defaultCheck} onChange={(e)=>this.handleCheck(e,o.Name, o.Email)} />
            <label className="form-check-label" htmlFor={id}>
              {o.Name} ({o.Email})
            </label>
          </div>
        </div>
        {promoCodeInput}
      </div>  
      
    )
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
                    <h2 className="h2 font-weight-light text-primary">{this.props.eventName} Registrations</h2>
                    <p>We have found the following list of users assigned to your company. Please select the users you want to add to registration or <Link to="/add-new-member">add new user</Link> for your company.</p>
                    <div action="">
                      {this.props.users.map((o,i)=> {return this.renderChild(o,i)})}                      
                    </div>
                    <div className="mt-3">
                      <Link to="/add-new-member" className="btn btn-dark mr-3">Add User</Link>
                      <button type="button" onClick={() => this.props.dispatch(addUserListToOrder(this.props.history,this.state.usersToRegister,"/review-register"))} className="btn btn-primary">Next Step: Registration</button>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AddMoreMembers;