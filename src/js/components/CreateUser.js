import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Header from "./Header"
import Email from "./Email"
export default class CreateUser extends Component {
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
                <p>We could not find a user for your email address. In order to continue please create an account.</p>
                <div>
                  <div className="form-group">
                    <label htmlFor="Email">Email</label>
                    <input type="email" id="Email" className="form-control" value="" />
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
                      <p className="alert alert-primary">There is no company assosciated with this email. You need to <a href="#" data-toggle="modal" data-target="#AddCompanyModal"><u><strong>create a Company</strong></u></a> to continue.</p> 
                      <label htmlFor="Company">Company</label>
                      <select type="email" id="Company" className="form-control">
                        <option value="">Select a company</option>
                        <option value="C1">Company 1</option>
                        <option value="C2">Company 2</option>
                      </select>
                      <button type="button" className="btn btn-dark mt-2" data-toggle="modal" data-target="#AddCompanyModal">Add a company</button> 
                      <div id="AddCompanyModal" className="modal" tabIndex="-1" role="dialog">
                          <div className="modal-dialog" role="document">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5 className="modal-title">Add Company</h5>
                                <button type="button" type="button" className="close" data-dismiss="modal" aria-label="Close">
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                              <div className="modal-body">
                                <div>
                                    <div className="form-group">
                                        <label htmlFor="CompanyAdd">Company</label>
                                        <input type="text" id="CompanyAdd" className="form-control" /> 
                                    </div>
                                </div>
                              </div>
                              <div className="modal-footer">
                                <button type="button" type="button" className="btn btn-primary">Save changes</button>
                                <button type="button" type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                              </div>
                            </div>
                          </div>
                        </div>
                  </div>
                  <div className="form-group">
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" />
                        <label className="form-check-label" htmlFor="inlineCheckbox1">I have read and agreed with <u>Terms and Conditions</u></label>
                      </div>
                  </div>
                  
                  <div className="form-group">
                      {/*<button type="button" className="px-5 btn btn-primary">Continue</button> */}
                      <Link to="/" className="px-5 btn btn-primary">Continue</Link>
                  </div> 
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
