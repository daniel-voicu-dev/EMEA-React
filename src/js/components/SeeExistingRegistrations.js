import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import Header from './Header';

@connect ((store) => {
  return {    
    users: store.user.ExistingRegistrations,
    eventName: store.event.EventName   
  }
})
class SeeExistingRegistrations extends Component {
  renderChild(o,i) { 
    return (
      <div className="item" key={i}>
        <p className="name">{o.PersonName} ({o.PersonEmail})</p>
        <p className="priceWithVat">Price with VAT: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(o.AmountInclVAT)}</p>
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
                  <img className="img-fluid" src="/images/registration-asia-2019.png" alt="" />
                </div>
                <div className="col-8 d-flex align-items-center flex-wrap">
                  <div>
                    <h2 className="h2 font-weight-light text-primary">{this.props.eventName} Registrations</h2>
                    <p>Current registrations:</p>
                      <div className="form-group list">
                      {this.props.users.map((o,i)=> {return this.renderChild(o,i)})}
                      </div>
                      <div className="form-group"> 
                          <Link to="/register-others" className="px-5 btn btn-primary">Back</Link>
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

export default SeeExistingRegistrations;