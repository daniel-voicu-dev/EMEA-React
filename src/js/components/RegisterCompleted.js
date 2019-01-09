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
                <img className="img-fluid" src="/images/registration-asia-2019.png" alt="" />
              </div>
              <div className="col-8 d-flex align-items-center flex-wrap">
                <div>
                  <h2 className="h2 font-weight-light text-primary mb-3">Thank you for your registration.</h2>
                  <p className="mb-1">You will receive an email shortly with Invoice and Payment link.</p>
                  <p>We look forward to seeing you at Directions ASIA 2019.</p> 
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