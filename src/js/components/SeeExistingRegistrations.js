import React, { Component } from 'react';
import {connect} from 'react-redux';
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
        <p className="priceWithVat">Price with VAT: {o.AmountInclVAT}</p>
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
                    <h2 className="h2 font-weight-light text-primary">{this.props.eventName} Registration</h2>
                    <p>Current registrations:</p>
                      <div className="form-group list">
                      {this.props.users.map((o,i)=> {return this.renderChild(o,i)})}
                      </div>
                      <div className="form-group"> 
                          <button type="button" onClick={(e) => this.handleSend(e)} className="px-5 btn btn-primary">Back</button>
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