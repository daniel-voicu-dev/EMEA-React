import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Header from "./Header";

export default class RegisterOthers extends Component {  
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
                  <p>Would you like to add further participants to this registration ?</p>
                  <div className="mb-3">
                    <Link to="/add-more-members" className="btn btn-primary px-5">Yes. I would like to add additional participants.</Link>
                  </div>
                  <div>
                    <Link to="/review-register" className="btn btn-primary px-5">No. Please take me to registration.</Link>
                  </div>
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