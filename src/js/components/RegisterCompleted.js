import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Header from "./Header";

export default class RegisterFinished extends Component {  
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
                  <h2 className="h2 font-weight-light text-primary mb-3">Thank you for your registration.</h2>
                  <p className="mb-1">We will send you an invoice and a link for payment with Stripe.</p>
                  <p>We are looking forward to seeing you at EMEA 2018.</p> 
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