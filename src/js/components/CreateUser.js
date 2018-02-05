import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Header from "./Header"
import Email from "./Email"
import Select from "./Select"
import Company from "./Company"

@connect ((store) => {
  return {   
    email: store.user.Email,    
    error: store.user.error    
  }
})


export default class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {      
      companyList: [],
      companySelected: "",
      email: props.email,
      password: "",
      name: "",
      address: "",
      city: "",
      zip: "",
      country: "",
      company: "",
      terms: false,
      alert: false      
    };
  }  
  getEmail(email) {
    this.setState({email});
  }
  getPassword(password) {
    this.setState({password});
  }
  getName(name) {
    this.setState({name});
  }
  getAddress(address){
    this.setState({address});
  } 
  getCity(city) {
    this.setState({city});
  }
  getZip(zip) {
    this.setState({zip});
  }
  getCountry(country) {
    this.setState({country});
  }
  getCompany(company) {
    this.setState({company});
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
                <p>We could not find a user for your email address. In order to continue please create an account.</p>
                <div>
                  <div className="form-group">
                    <label htmlFor="Email">Email</label>
                    <Email required={true} readonly={true} getEmail={(email) => {this.getEmail(email)}} setValue={this.props.email} />
                  </div>
                  <div className="form-group">
                      <label htmlFor="Password">Password</label>
                      <input type="password" id="Password" className="form-control" onChange={(e) => this.getPassword(e.currentTarget.value)} />                      
                      <small className="invalid-feedback">
                          Invalid password
                      </small>
                  </div>
                  <div className="form-group">
                      <label htmlFor="FullName">Full Name</label>
                      <input type="email" id="FullName" className="form-control" onChange={(e) => this.getName(e.currentTarget.value)} /> 
                  </div>
                  <div className="form-group">
                      <label htmlFor="Address">Address</label>
                      <input type="email" id="Address" className="form-control" onChange={(e) => this.getAddress(e.currentTarget.value)}  /> 
                  </div>
                  <div className="form-row">
                      <div className="form-group col">
                          <label htmlFor="City">City</label>
                          <input type="email" id="City" className="form-control" onChange={(e) => this.getCity(e.currentTarget.value)} /> 
                      </div>
                      <div className="form-group col">
                          <label htmlFor="ZipCode">Zip Code</label>
                          <input type="email" id="ZipCode" className="form-control" onChange={(e) => this.getZip(e.currentTarget.value)} /> 
                      </div>
                  </div>
                  <div className="form-group">
                      <label htmlFor="Country">Country</label>
                      <select type="email" id="Country" className="form-control" onChange={(e) => this.getCountry(e.currentTarget.value)}>
                        <option value="">Select a country</option>
                        <option value="US">United States of America</option>
                        <option value="CA">Canada</option>
                      </select> 
                  </div>
                  <Company />
                  <div className="form-group">
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" />
                        <label className="form-check-label" htmlFor="inlineCheckbox1">I have read and agreed with <u>Terms and Conditions</u></label>
                      </div>
                  </div>
                  
                  <div className="form-group">                      
                      <button type="button" className="px-5 btn btn-primary">Continue</button>
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
