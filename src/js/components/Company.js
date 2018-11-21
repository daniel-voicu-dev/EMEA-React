import React, { Component } from 'react'
import {connect} from 'react-redux'
import CompanySelect from "./CompanySelect"
import CountrySelect from "./CountrySelect"
import Email from "./Email"
import {registerCompany, updateUserCompanyNo} from "../actions/userActions";

@connect ((store) => {
  return { 
    companyList: store.user.CompanyList,
    companySelected: store.user.CompanyNo !== undefined ? store.user.CompanyNo : "",
    domain: store.user.Domain,
    countries: store.user.CountryList,
    admin: store.user.isAdmin   
  }
})
export default class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      address: "",
      address2: "",
      city: "",
      phone: "",
      country: "",
      alert: false,
      zip: "",
      companyVATNo: ""          
    }
  }  
  getZip(zip) {
    this.setState({zip});    
  }
  getCompanyVATNo(companyVATNo) {
    this.setState({companyVATNo});    
  }
  getEmail(email) {
    this.setState({email});    
  }
  getName(name) {
    this.setState({name});    
  }
  getAddress(address){
    this.setState({address});
  } 
  getAddress2(address2){
    this.setState({address2});
  } 
  getCity(city) {
    this.setState({city});
  }
  getPhone(phone) {
    this.setState({phone});
  }
  getCountry(country) {
    this.setState({country});
  }
  getCompany(company) {
    this.props.getValue(company);
    this.props.dispatch(updateUserCompanyNo(company));
  }
  handleSendAddress(e) {
    let canSend = this.state.name !== "" && this.state.address !== "" && this.state.city !== "" && this.state.phone !== "";   
    if (canSend) {
      // this.props.dispatch(createUser(this.props.history, this.state));           
      this.props.dispatch(registerCompany(this.state));
      this.setState({name: ""});
      this.setState({address: ""});
      this.setState({address2: ""});
      this.setState({city: ""});
      this.setState({phone: ""});
      this.setState({zip: ""});
      this.setState({companyVATNo: ""});
    } else {
      this.setState({alert: true});      
    }
  }


  render() {
    let alertClass = this.state.alert === true ? "alert alert-danger" : "alert alert-danger d-none";
    return (
      <div className="form-group">
        { this.props.companyList.length === 0 &&
        <p className="alert alert-primary">There is no company assosciated with this email. You need to <a href="#" data-toggle="modal" data-target="#AddCompanyModal"><u><strong>create a Company</strong></u></a> to continue.</p> 
        }
        <label htmlFor="Company">Company</label>
        <CompanySelect id="Company" firstOption="Select a company" required="true" getValue={(v) => this.getCompany(v)} options={this.props.companyList} setValue={this.props.companySelected} />
        {this.props.companyList.length === 0 &&
          <button type="button" className="btn btn-dark mt-2" data-toggle="modal" data-target="#AddCompanyModal">Add a company</button> 
        }
        
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
                      <p className={alertClass}>Please fill in all the fields to create the company.</p>
                      <div className="form-group">
                          <label htmlFor="CompanyName">Name</label>
                          <input type="text" id="CompanyName" className="form-control"  onChange={(e) => this.getName(e.currentTarget.value)} value={this.state.name} /> 
                      </div>
                      <div className="form-group">
                        <label htmlFor="CompanyEmail">Email</label>
                        <Email required={true} readonly={false} domain={this.props.domain} getEmail={(email) => {this.getEmail(email)}} setValue={this.props.email} />
                      </div>
                      <div className="form-group">
                          <label htmlFor="CompanyAddress">Address</label>
                          <input type="text" id="CompanyAddress" className="form-control"  onChange={(e) => this.getAddress(e.currentTarget.value)} value={this.state.address} /> 
                      </div>
                      <div className="form-group">
                          <label htmlFor="CompanyAddress2">Address2</label>
                          <input type="text" id="CompanyAddress2" className="form-control"  onChange={(e) => this.getAddress2(e.currentTarget.value)} value={this.state.address2} /> 
                      </div>
                      <div className="form-group">
                          <label htmlFor="CompanyCity">City</label>
                          <input type="text" id="CompanyCity" className="form-control"  onChange={(e) => this.getCity(e.currentTarget.value)} value={this.state.city} /> 
                      </div>
                      <div className="form-group">
                          <label htmlFor="CompanyCountry">Country</label>
                          <CountrySelect id="Country" firstOption="Select a country" required="true" getValue={(v) => this.getCountry(v)} options={this.props.countries}  /> 
                      </div>
                      <div className="form-group">
                          <label htmlFor="CompanyPhone">Phone</label>
                          <input type="text" id="CompanyPhone" className="form-control"  onChange={(e) => this.getPhone(e.currentTarget.value)} value={this.state.phone} /> 
                      </div>
                      <div className="form-group">
                          <label htmlFor="CompanyZip">Zip</label>
                          <input type="text" id="CompanyZip" className="form-control"  onChange={(e) => this.getZip(e.currentTarget.value)} value={this.state.zip} /> 
                      </div>
                      <div className="form-group">
                          <label htmlFor="CompanyVATNo">VAT Registration Number</label>
                          <input type="text" id="CompanyVATNo" className="form-control"  onChange={(e) => this.getCompanyVATNo(e.currentTarget.value)} value={this.state.companyVATNo} /> 
                      </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" type="button" className="btn btn-primary" onClick={(e)=>{this.handleSendAddress(e)}}>Save changes</button>
                  <button type="button" type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
    </div>
    );
  }
}

