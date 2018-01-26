import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import Header from './Header';
import Email from './Email';

class AddNewMember extends Component {
  getEmail() {

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
                    <p>Add a new user to your company.</p>
                    <div>
                      <div className="form-group">
                        <label htmlFor="Email">Email</label>
                        <Email required={true} readonly={false} domain="@test.com" getEmail={(email) => {this.getEmail(email)}} setValue="" />
                      </div>
                      <div className="form-group">
                          <label htmlFor="Password">Password</label>
                          <input type="email" id="Password" className="form-control" />                      
                          <small className="invalid-feedback">
                              Invalid password
                          </small>
                      </div>
                      <div className="form-group">
                          <label htmlFor="FullName">Full Name</label>
                          <input type="email" id="FullName" className="form-control" /> 
                      </div>
                      <div className="form-group">
                          <label htmlFor="Address">Address</label>
                          <input type="email" id="Address" className="form-control" /> 
                      </div>
                      <div className="form-row">
                          <div className="form-group col">
                              <label htmlFor="City">City</label>
                              <input type="email" id="City" className="form-control" /> 
                          </div>
                          <div className="form-group col">
                              <label htmlFor="ZipCode">Zip Code</label>
                              <input type="email" id="ZipCode" className="form-control" /> 
                          </div>
                      </div>
                      <div className="form-group">
                          <label htmlFor="Country">Country</label>
                          <select type="email" id="Country" className="form-control">
                            <option value="">Select a country</option>
                            <option value="US">United States of America</option>
                            <option value="CA">Canada</option>
                          </select> 
                      </div>
                      <div className="form-group">                      
                          <label htmlFor="Company">Company</label>
                          <input type="text" id="Company" className="form-control" defaultValue="Company 1" readOnly />                      
                      </div>
                      <div className="form-group">
                          <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" id="inlineCheckbox1" defaultValue="option1" />
                            <label className="form-check-label" htmlFor="inlineCheckbox1">I have read and agreed with <u>Terms and Conditions</u></label>
                          </div>
                      </div>
                      
                      <div className="form-group">
                          {/*<button type="button" className="px-5 btn btn-primary">Create user</button>*/}
                          
                          <Link to='/add-more-members' className="px-5 btn btn-primary">Create user</Link>
                      </div> 
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

export default AddNewMember;