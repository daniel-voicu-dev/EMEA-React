import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import Header from './Header';
import {connect} from 'react-redux';
import { addUserToOrder, removeUserFromOrder } from '../actions/orderActions';
@connect ((store) => {
  return {
    currentUser: store.user.Email,
    users: store.order.Company.UnregisteredPerson,
    order: store.order.Users
  }
})
class AddMoreMembers extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {      
      
  //   };
  // }  
  handleCheck(e){
    console.dir(e.target);
    console.log(e.target.checked);
    if(e.target.checked === true ) {
      this.props.dispatch(removeUserFromOrder(e.target.value));
    } else {
      this.props.dispatch(addUserToOrder(e.target.value));
    }
    // e.target.checked = !e.target.checked;

  } 
  renderChild(o,i) {
    let id= "check-" + i;
    let defaultCheck = this.props.order.filter(o=>o.Login === e.target.value).length > 1;
    console.log(defaultCheck);
    if(o.Email === this.props.currentUser) {
      return (
        <div className="form-check" key={i}>
          <input className="form-check-input" type="checkbox" value={o.Email} id={id} defaultChecked="true" onChange={(e)=>this.handleCheck(e)}/>
          <label className="form-check-label text-primary" htmlFor={id}>
            <strong>{o.Name}(Admin)</strong>
          </label>
        </div>
      );
    } 
    return (
      <div className="form-check" key={i}>
        <input className="form-check-input" type="checkbox" value={o.Email} id={id} onChange={(e)=>this.handleCheck(e)} />
        <label className="form-check-label" htmlFor={id}>
          {o.Name}
        </label>
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
                  <img className="img-fluid" src="http://placehold.it/1600x1600" alt="" />
                </div>
                <div className="col-8 d-flex align-items-center flex-wrap">
                  <div>
                    <h2 className="h2 font-weight-light text-primary">Welcome to Directions EMEA registration process.</h2>
                    <p>We have found the following list of users assigned to your company. Please select the users you want to add to registration or <Link to="/add-new-user">add new user</Link> for your company.</p>
                    <div action="">
                      {this.props.users.map((o,i)=> {return this.renderChild(o,i)})}                      
                    </div>
                    <div className="mt-3">
                      <Link to="/add-new-member" className="btn btn-dark mr-3">Add new user</Link>
                      <Link to="/register-others" className="btn btn-primary">Take me to registration</Link>
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