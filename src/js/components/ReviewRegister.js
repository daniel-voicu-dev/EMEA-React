import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Header from "./Header";
import {apiDomain} from "./../actions/variables";
import axios from 'axios';
import { getCompanyInfo, registerUsers, addUsersToBeConfirmedList } from '../actions/orderActions';

@connect ((store) => {
  return {
    users: store.order.Users,
    company: store.order.Company,
    price: store.event.itemPrice,
    admin: store.user.isAdmin,
    countries: store.user.CountryList,
    domain: store.user.Domain,
    event: store.event.eventNo,
    login: store.user.Email

  }
})
export default class ReviewRegister extends Component {  
  constructor(props) {
    super(props);
    this.state = {      
      // users: props.users,      
      // company: props.company,
      // quantity: props.users.length,
      // price: props.price,
      currency: "EURO"
      // CompanyAddress: props.Company.Address,
      // CompanyState: "Washington",
      // CompanyCity: props.Company.City,
      // CompanyCountry: "United States of America",
      // CompanyPostalCode: props.Company.PostCode
    };
  }  
  // componentWillMount() {
  //   axios.get("resources/getReview.json").then((r)=> {
  //     this.setState({users: r.data.users});
  //     this.setState({company: r.data.company});
  //     this.setState({quantity: r.data.quantity});
  //     this.setState({price: r.data.price});
  //     this.setState({currency: r.data.currency});
  //   });
  // }
  // componentWillMount() {
  //   this.props.dispatch(getCompanyInfo(this.state.user.company.CompanyNo))
  // }
  componentWillMount() {
   
    
      let domain = this.props.domain;
      domain = domain.substr(1);
      let eventNo = this.props.event;
      console.log("ENTER", eventNo);
      axios.post(apiDomain + "/api/getregistrations", {"EventNo": eventNo,"LoginOrDomain": domain}).then(r => {
        let userRegisteredButNotConfirmed = r.data.CompanyRegistrations.filter(o => {return o.EventNo === eventNo})[0].PersonRegistrations.filter(obj => {
          return obj.RegistrationInvoiceNo === "" && obj.CreatedByContactEmail === this.props.login;
        })
        let usersToBeConfirmed = userRegisteredButNotConfirmed.reduce((r,v,k) => {return [...r, {"Name": v.PersonEmail, "Login": v.PersonEmail}]},[]);
        // console.log(usersToBeConfirmed)
        this.props.dispatch(addUsersToBeConfirmedList(usersToBeConfirmed));
        // console.log("userAlreadyRegistered",userAlreadyRegistered);

      })
    
  }
  confirmRegistration() {
    // console.log("confirm");
    this.props.dispatch(registerUsers(this.props.history));
  }
  render() {    
    let country = this.props.countries.filter(x=> {return x.Code===this.props.company.CountryCode})[0].Name;  
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
              <h2 className="h2 font-weight-light text-dark">Welcome to {this.props.eventName} Registration</h2>
                <p>Please review your registration before confirming it. After confirmation we will send you an invoice and a link for credit card payment.</p>
                <div className="">
                  <p className="mb-1 text-primary font-weight-bold">These are the participants included in your registration:</p>
                  <ul className="list-unstyled">
                  { this.props.users.length > 0 &&
                    this.props.users.map((o,i) => {return (<li key={i}><strong>{o.Name}</strong></li>)})
                  }  
                  </ul>
                  <p className="mb-1 text-primary font-weight-bold">Company details:</p>  
                      <ul className="list-unstyled">                    
                        <li><strong>{this.props.company.Name}</strong></li>
                        <li>{this.props.company.Address}</li>                        
                        <li>{this.props.company.City}, {this.props.company.PostCode}</li>
                        <li>{country}</li>
                      </ul> 
                    <p className="mb-0 text-primary font-weight-bold">
                      Order total: {this.props.users.length} x {this.props.price} {this.props.currency} = {this.props.users.length*this.props.price} {this.state.currency}*
                    </p>
                    <small>* prices do not include VAT or other applicable taxes</small>
                </div>
                <div className="mt-3">
                  { this.props.admin===true &&
                    <Link to="/add-new-member" className="btn btn-dark px-5 mr-3">Add new user</Link>                  
                  }
                 
                  <button type="button" onClick={()=>this.confirmRegistration()} className="btn btn-primary px-5">Confirm registration</button>
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