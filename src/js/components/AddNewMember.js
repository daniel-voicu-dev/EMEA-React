import React, { Component } from 'react';
import {connect} from 'react-redux';
import Header from './Header';
import Email from './Email';
import Company from "./Company"
import Terms from "./Terms"
import CountrySelect from "./CountrySelect";
import {addNewMember} from "../actions/userActions"
@connect ((store) => {
  return {
    domain: store.user.Domain,
    company: store.user.CompanyList,   
    countries: store.user.CountryList, 
    users: store.order.Company.Persons,
    error: store.user.error,
    companyList: store.user.CompanyList,
    eventName: store.event.EventName,
    companyNo: store.user.CompanyNo   
  }
})
class AddNewMember extends Component {
  constructor(props) {
    super(props);
    this.state = {       
      email: "",
      password: "",
      name: "",
      address: props.company[0].Address,
      city: props.company[0].City,
      zip: props.company[0].PostCode,
      country: props.company[0].CountryCode,
      //company: "",
      // companyNo: props.company.CompanyNo,
      phone: props.company[0].PhoneNo,
      terms: false,
      alert: false,
      userAlert: false,
      Email2 :"",
      PIBusinessCentral: false,
      PICustomerEngagement: false,
      PIOther: false,
      PIPowerPlatform: false,
      FFConsulting: false,
      FFDevelopment: false,
      FFManagement: false,
      FFSalesMarketing: false,
      JobTitle: null,
      OptOut: false   
    };
  }  
  getEmail(email) {
    this.setState({alert: false});
    this.setState({email});
    // let userExists = this.props.users.filter(x=>x.Email === email).length > 0;
    // if (userExists) {
    //   this.setState({userAlert: true});
    // } else {
    //   this.setState({userAlert: false});
    // }
    
  }
  getEmail2(email) {
    this.setState({Email2: email});
  }
  getPassword(password) {
    this.setState({password});
    this.setState({alert: false});
  }
  getName(name) {
    this.setState({name});
    this.setState({alert: false});
  }
  getAddress(address){
    this.setState({address});
    this.setState({alert: false});
  } 
  getCity(city) {
    this.setState({city});
    this.setState({alert: false});
  }
  getZip(zip) {
    this.setState({zip});
    this.setState({alert: false});
  }
  getCountry(country) {
    this.setState({country});
    this.setState({alert: false});
  }
  getCompany(company) {
    this.setState({company});
    //console.log("company",company);
    let selectedCompany = this.props.companyList.filter(v => {return v.No === company})[0];
    //console.log("selectedCompany",selectedCompany);
    let address = selectedCompany.Address;
    let city = selectedCompany.City;
    let zip = selectedCompany.PostCode;
    let country = selectedCompany.CountryCode;
    let phone = selectedCompany.PhoneNo;
    this.setState({address});
    this.setState({city});
    this.setState({zip});
    this.setState({country});
    this.setState({phone});
    this.setState({alert: false});
  }
  setTerms(e) {    
    let terms = !this.state.terms;
    console.log(terms);
    this.setState({terms});
    this.setState({alert: false});
  }
  getPhone(phone) {
    this.setState({phone});
    this.setState({alert: false});
  }
  changeCheckboxState(e) {       
    this.setState({...this.state, [e.currentTarget.attributes.name.value]: !this.state[e.currentTarget.attributes.name.value] });
  }
  changeInputTextState(e){
    this.setState({...this.state, [e.currentTarget.attributes.name.value]: [e.currentTarget.value] });
  }
  handleSend(e) {
    let canSend = this.state.email !== "" && this.state.password !== "" && this.state.name !== "" && this.state.address !== "" && this.state.city !== "" && this.state.country !== "" && this.state.zip !== "" && this.state.company !== "" && this.state.terms === true && this.state.userAlert === false;  
    var companyNo = this.props.companyNo; 
    if (canSend) {
      //this.props.dispatch(addNewMember(this.props.history, this.state));
      
      let obj = {
          "Login": this.state.email,
          "Password": this.state.password,
          "Name": this.state.name,
          "Address": this.state.address,
          "Address2": "",
          "City": this.state.city,
          "CountryCode": this.state.country,
          "PhoneNo": this.state.phone,
          "PostCode": this.state.zip,
          "CompanyNo": companyNo,
          "VATRegistrationNo": null,
          "Email2": this.state.Email2,
          "PIBusinessCentral": this.state.PIBusinessCentral,
          "PICustomerEngagement": this.state.PICustomerEngagement,
          "PIOther": this.state.PIOther,
          "PIPowerPlatform": this.state.PIPowerPlatform,
          "FFConsulting": this.state.FFConsulting,
          "FFDevelopment": this.state.FFDevelopment,
          "FFManagement": this.state.FFManagement,
          "FFSalesMarketing": this.state.FFSalesMarketing,
          "JobTitle": this.state.JobTitle,
          "OptOut": this.state.OptOut
      }      
      this.props.dispatch(addNewMember(this.props.history, obj));
    } else {
      this.setState({alert: true});      
    }
  }
  render() {
    let alertClass = this.state.alert === true ? "alert alert-danger" : "alert alert-danger d-none";
    let userAlertClass = this.state.userAlert === true ? "alert alert-danger" : "alert alert-danger d-none";
    let dynamicAlertClass = this.props.error !== "" ? "alert alert-danger" : "alert alert-danger d-none";
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
                    <p>Add a new user to your company.</p>
                    <p className={alertClass}>Please fill in all the fields and accept <strong>terms and conditions</strong> to continue</p>
                    <p className={userAlertClass}>User already exists.</p>
                    <p className={dynamicAlertClass}>{this.props.error}</p>
                    <div>
                      <Company getValue={(company) => this.getCompany(company)} readOnly="true"/>
                      <div className="form-group">
                        <label htmlFor="Email">Email</label>
                        <Email required={true} readonly={false} domain={this.props.domain} getEmail={(email) => {this.getEmail(email)}} setValue="" />
                      </div>
                      <div className="form-group">
                          <label htmlFor="Password">Password</label>
                          <input type="password" id="Password" className="form-control rounded-0" onChange={(e) => this.getPassword(e.currentTarget.value)} />                      
                          <small className="invalid-feedback">
                              Invalid password
                          </small>
                      </div>
                      <div className="form-group">
                          <label htmlFor="FullName">Full Name*</label>
                          <input type="text" id="FullName" className="form-control rounded-0" onChange={(e) => this.getName(e.currentTarget.value)} /> 
                      </div>
                      <div className="form-group">
                          <label htmlFor="Address">Address*</label>
                          <input type="text" id="Address" className="form-control rounded-0" onChange={(e) => this.getAddress(e.currentTarget.value)} defaultValue={this.state.address} /> 
                      </div>
                      <div className="form-row">
                          <div className="form-group col">
                              <label htmlFor="City">City*</label>
                              <input type="text" id="City" className="form-control rounded-0" onChange={(e) => this.getCity(e.currentTarget.value)} defaultValue={this.state.city} /> 
                          </div>
                          <div className="form-group col">
                              <label htmlFor="ZipCode">Zip Code*</label>
                              <input type="text" id="ZipCode" className="form-control rounded-0" onChange={(e) => this.getZip(e.currentTarget.value)} defaultValue={this.state.zip} /> 
                          </div>
                      </div>
                      <div className="form-group">
                          <label htmlFor="Phone">Phone*</label>
                          <input type="text" id="Phone" className="form-control rounded-0" onChange={(e) => this.getPhone(e.currentTarget.value)} defaultValue={this.state.phone} /> 
                      </div>
                      <div className="form-group">
                          <label htmlFor="Country">Country*</label>                      
                          <CountrySelect id="Country" firstOption="Select a country" required="true" getValue={(v) => this.getCountry(v)} setValue={this.state.country} options={this.props.countries} />
                      </div>  
                      <div className="form-group">
                        <label htmlFor="Email2">CC email</label>
                        <Email required={false} readonly={false} getEmail={(email) => {this.getEmail2(email)}}  />
                      </div>
                      <div className="form-group">
                          <label htmlFor="JobTitle">Job Title</label>
                          <input type="text" id="JobTitle" className="form-control rounded-0" name="JobTitle" onChange={(e) => this.changeInputTextState(e)} /> 
                      </div>
                      <div className="form-group">
                          <label>You Product Interest</label>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" name="PIBusinessCentral" id="PIBusinessCentral" onChange={(e) => this.changeCheckboxState(e)} />
                            <label className="form-check-label" htmlFor="PIBusinessCentral">Business Central</label>
                          </div> 
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" name="PIPowerPlatform" id="PIPowerPlatform" onChange={(e) => this.changeCheckboxState(e)} />
                            <label className="form-check-label" htmlFor="PIPowerPlatform">Power Platform</label>
                          </div>    
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" name="PICustomerEngagement" id="PICustomerEngagement" onChange={(e) => this.changeCheckboxState(e)} />
                            <label className="form-check-label" htmlFor="PICustomerEngagement">Customer Engagement</label>
                          </div>  
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" name="PIOther" id="PIOther" onChange={(e) => this.changeCheckboxState(e)} />
                            <label className="form-check-label" htmlFor="PIOther">Other</label>
                          </div>
                      </div>
                      <div className="form-group">
                          <label>You Functional Focus</label>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" name="FFManagement" id="FFManagement" onChange={(e) => this.changeCheckboxState(e)} />
                            <label className="form-check-label" htmlFor="FFManagement">Management</label>
                          </div> 
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" name="FFSalesMarketing" id="FFSalesMarketing" onChange={(e) => this.changeCheckboxState(e)} />
                            <label className="form-check-label" htmlFor="FFSalesMarketing">Sales Marketing</label>
                          </div>    
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" name="FFDevelopment" id="FFDevelopment" onChange={(e) => this.changeCheckboxState(e)} />
                            <label className="form-check-label" htmlFor="FFDevelopment">Development</label>
                          </div>  
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" name="FFConsulting" id="FFConsulting" onChange={(e) => this.changeCheckboxState(e)} />
                            <label className="form-check-label" htmlFor="FFConsulting">Consulting</label>
                          </div>
                      </div>        
                      <div className="form-group">
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" name="OptOut" id="OptOut" onChange={(e) => this.changeCheckboxState(e)} />
                          <label className="form-check-label" htmlFor="OptOut">Opt out from Directions Community Network</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" onChange={(e)=>{this.setTerms(e)}}/>
                            
                            <p className="form-check-label" htmlFor="inlineCheckbox1" >I have read and agreed with <u data-toggle="modal" data-target="#TermsModal" className="pointer">Terms and Conditions</u></p>
                          </div>
                      </div>
                      <div id="TermsModal" className="modal" tabIndex="-1" role="dialog">
                        <div className="modal-dialog modal-lg" role="document"> 
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="modal-title">Terms and Conditions</h5>
                              <button type="button" type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div className="modal-body">
                              <Terms />
                            </div>
                            
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <p className={alertClass}>Please fill in all the fields and accept <strong>terms and conditions</strong> to continue.</p>
                      </div>
                      <div className="form-group"> 
                          <button type="button" onClick={(e) => this.handleSend(e)} className="px-5 btn btn-primary">Create user</button>
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