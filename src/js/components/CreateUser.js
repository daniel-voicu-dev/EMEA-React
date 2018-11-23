import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Header from "./Header"
import Email from "./Email"
import CountrySelect from "./CountrySelect"
import Company from "./Company"
import {createUser, updateUserCompanyNo} from "../actions/userActions"
@connect ((store) => {
  return {   
    email: store.user.Email, 
    countries: store.user.CountryList,   
    error: store.user.error,
    companies: store.user.CompanyList,
    eventName: store.event.EventName,
    companyList: store.user.CompanyList
  }
})


export default class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {       
      email: props.email,
      password: "",
      name: "",
      address: "",
      city: "",
      zip: "",
      country: "",
      company: "",
      phone: "",
      terms: false,
      alert: false
    };
  }
  componentDidMount() {
    if (this.props.companyList.length === 1) {               
      let selectedCompany = this.props.companyList[0];  
      let company = selectedCompany.No;
      let address = selectedCompany.Address;
      let city = selectedCompany.City;
      let zip = selectedCompany.PostCode;
      let country = selectedCompany.CountryCode;
      let phone = selectedCompany.PhoneNo;      
      this.props.dispatch(updateUserCompanyNo(company)); 
      this.setState({company});
      this.setState({address});
      this.setState({city});
      this.setState({zip});
      this.setState({country});
      this.setState({phone});
    }
  }
  componentDidUpdate() {
    console.log(this.props.companyList.length);
    console.log(this.props.companyList);
    if (this.props.companyList.length === 1) {
      var selectedCompany = this.props.companyList[0];
      let address = selectedCompany.Address;
      let city = selectedCompany.City;
      let zip = selectedCompany.PostCode;
      let country = selectedCompany.CountryCode;
      let phone = selectedCompany.PhoneNo;
      let company = selectedCompany.No;
      if (this.state.company === "") {
        this.setState({company});
      }
      if (this.state.address === "") {
        this.setState({address});
      }
      if (this.state.city === "") {
        this.setState({city});
      }
      if (this.state.zip === "") {
        this.setState({zip});
      }
      if (this.state.country === "") {
        this.setState({country});
      }
      if (this.state.phone === "") {
        this.setState({phone});
      }
    }
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
    this.props.dispatch(updateUserCompanyNo(company));
    this.setState({company});
    console.log("company",company);
    let selectedCompany = this.state.companyList.filter(v => {return v.No === company})[0];
    console.log("selectedCompany",selectedCompany);
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
  }
  setTerms(e) {    
    let terms = !this.state.terms;
    this.setState({terms});
  }
  getPhone(phone) {
    this.setState({phone});
  }
  handleSend(e) {
    let canSend = this.state.email !== "" && this.state.password !== "" && this.state.name !== "" && this.state.address !== "" && this.state.city !== "" && this.state.country !== "" && this.state.zip !== "" && this.state.company !== "" && this.state.terms === true;   
    if (canSend) {
      this.props.dispatch(createUser(this.props.history, this.state));
    } else {
      this.setState({alert: true});      
    }
  }
  render() {
    let alertClass = this.state.alert === true ? "alert alert-danger" : "alert alert-danger d-none";
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
                <p>We could not find a user for your email address. In order to continue please create an account.</p>
                <p className={alertClass}>Please fill in <strong>all the fields</strong> and accept <strong>terms and conditions</strong> to continue</p>
                <div>

                  <Company getValue={(company) => this.getCompany(company)}/>
                  <div className="form-group">
                    <label htmlFor="Email">Email*</label>
                    <Email required={true} readonly={true} getEmail={(email) => {this.getEmail(email)}} setValue={this.props.email} />
                  </div>
                  <div className="form-group">
                      <label htmlFor="Password">Password*</label>
                      <input type="password" id="Password" className="form-control" onChange={(e) => this.getPassword(e.currentTarget.value)} />                      
                      <small className="invalid-feedback">
                          Invalid password
                      </small>
                  </div>
                  <div className="form-group">
                      <label htmlFor="FullName">Full Name*</label>
                      <input type="email" id="FullName" className="form-control" onChange={(e) => this.getName(e.currentTarget.value)} /> 
                  </div>
                  <div className="form-group">
                      <label htmlFor="Address">Address*</label>
                      <input type="email" id="Address" className="form-control" onChange={(e) => this.getAddress(e.currentTarget.value)} defaultValue={this.state.address} /> 
                  </div>
                  <div className="form-row">
                      <div className="form-group col">
                          <label htmlFor="City">City*</label>
                          <input type="email" id="City" className="form-control" onChange={(e) => this.getCity(e.currentTarget.value)} defaultValue={this.state.city}/> 
                      </div>
                      <div className="form-group col">
                          <label htmlFor="ZipCode">Zip Code*</label>
                          <input type="email" id="ZipCode" className="form-control" onChange={(e) => this.getZip(e.currentTarget.value)} defaultValue={this.state.zip}/> 
                      </div>
                  </div>
                  <div className="form-group">
                      <label htmlFor="Phone">Phone*</label>
                      <input type="text" id="Phone" className="form-control" onChange={(e) => this.getPhone(e.currentTarget.value)} defaultValue={this.state.phone} /> 
                  </div>
                  <div className="form-group">
                      <label htmlFor="Country">Country*</label>
                      <CountrySelect id="Country" firstOption="Select a country" required="true" getValue={(v) => this.getCountry(v)} setValue={this.state.country} options={this.props.countries} />
                      
                  </div>
                  
                  <div className="form-group">
                      <div className="form-check form-check-inline">
                       <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" onChange={(e)=>{this.setTerms(e)}}/>
                        
                        <p className="form-check-label" htmlFor="inlineCheckbox1" >I have read and agreed with <u data-toggle="modal" data-target="#TermsModal">Terms and Conditions</u></p>
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
                          <div>
                          <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac arcu vitae ipsum porta mollis quis nec odio. Nulla at leo ipsum. Donec luctus, leo ut convallis molestie, ipsum elit blandit ex, a commodo mauris sem vitae purus. Phasellus lorem mauris, maximus nec urna in, auctor laoreet metus. Phasellus a lacinia sapien. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aenean pulvinar et magna ac hendrerit. Aliquam vitae placerat urna. Duis laoreet erat non lorem placerat, at dictum mauris posuere. Maecenas non tincidunt lectus. Mauris id elit id diam auctor varius vel id elit. Mauris ut nibh in lacus maximus hendrerit ac quis elit. Nunc nisl sem, volutpat ultrices tortor a, interdum dignissim justo.
                          </p>

                          <p>Duis tincidunt dolor nisi, nec aliquet libero tincidunt in. Morbi dictum egestas metus. Maecenas tincidunt vel sem ac porta. Etiam rhoncus sagittis facilisis. Phasellus ex turpis, feugiat eget malesuada sit amet, tincidunt nec libero. Nulla dapibus est augue, id convallis ex viverra vel. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Suspendisse porta et mauris id blandit. Aliquam eu porttitor odio. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla ac eros leo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
                          
                          <p>Pellentesque varius, ante sit amet placerat dignissim, nunc arcu molestie lectus, ut ornare libero nibh sagittis lorem. Aenean eu lacinia metus, vel convallis risus. Aliquam erat volutpat. Nulla non rhoncus urna. Duis nec urna vitae lacus varius tincidunt in nec elit. Etiam lacus sem, tempor rhoncus suscipit blandit, iaculis ac sapien. Aenean eu eros id tellus hendrerit ultricies quis vel erat. Donec pharetra venenatis laoreet. Integer quis sem ut magna dignissim elementum. Nullam consectetur nunc scelerisque elit varius congue. Maecenas ac iaculis massa. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum est risus, rhoncus malesuada ligula quis, semper volutpat tellus. Maecenas et purus id mauris pharetra tristique at ac sapien. Ut condimentum, risus pretium pellentesque vehicula, orci massa cursus tellus, nec elementum nisi metus interdum urna.</p>
                          </div>
                        </div>
                        
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <p className={alertClass}>Please fill in <strong>all the fields</strong> and accept <strong>terms and conditions</strong> to continue</p>
                  </div>
                  <div className="form-group">                      
                      <button type="button" onClick={(e) => this.handleSend(e)} className="px-5 btn btn-primary">Continue</button>
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
