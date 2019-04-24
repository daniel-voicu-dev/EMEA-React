import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Header from "./Header";
import {apiDomain} from "./../actions/variables";
import axios from 'axios';
import { registerUsers, addUsersToBeConfirmedList, updateOrderTotal } from '../actions/orderActions';

@connect ((store) => {
  return {
    users: store.order.Users,
    company: store.order.Company,
    price: store.event.UnitPrice,
    admin: store.user.isAdmin,
    countries: store.user.CountryList,
    domain: store.user.Domain,
    event: store.event.EventNo,
    login: store.user.Email,
    currency: store.event.Currency,
    culture: store.event.Culture,
    eventName: store.event.EventName

  }
})
export default class ReviewRegister extends Component {  
  constructor(props) {
    super(props);
    this.state = {            
      total: 0,
      totalVAT: 0,
      orderlines: []      
    };
  }  
  
  componentWillMount() {
      let domain = this.props.domain;
      domain = domain.substr(1);
      let eventNo = this.props.event;      
      axios.post(apiDomain + "/api/getregistrations", {"EventNo": eventNo,"LoginOrDomain": domain}).then(r => {        
        var getAllRegistrations = r.data.CompanyRegistrations.filter(o => {return o.EventNo === eventNo}).reduce((r,v,k) => {return [...r, ...v.PersonRegistrations]},[]);
        var orderForCurrentLogin = getAllRegistrations.filter(obj => {
          return obj.RegistrationInvoiceNo === "" && obj.CreatedByContactEmail === this.props.login;
        });        
        if (orderForCurrentLogin.length > 0) {         
          let total = orderForCurrentLogin.reduce((r,v,k) => {return r = r + v.Amount}, 0);          
          let totalVAT = orderForCurrentLogin.reduce((r,v,k) => {return r = r + v.AmountInclVAT}, 0);   
          let users = orderForCurrentLogin.reduce((r,v,k) => {return [...r,{"Name": v.PersonName, "Login": v.PersonEmail}]},[]);
          this.setState({orderlines: users});
          this.setState({total: total});     
          this.setState({totalVAT: totalVAT});        
        } else {
          throw new Error("There was no registration available for this user");
        }
      })    
  }

  confirmRegistration() {  
    this.props.dispatch(registerUsers(this.props.history));
  }

  render() {    
    let country = this.props.countries.filter(x=> {return x.Code===this.props.company.CountryCode})[0].Name;     
    let total = new Intl.NumberFormat(this.props.culture, { style: 'currency', currency: this.props.currency }).format(parseFloat(this.state.total));
    let totalVat = new Intl.NumberFormat(this.props.culture, { style: 'currency', currency: this.props.currency }).format(parseFloat(this.state.totalVAT));
    return (
      <React.Fragment>
        <Header />
        <div className="container">
          <div className="row">
            <article className="col-12">
              <div className="row">
                <div className="col-4">
                  <img className="img-fluid" src="/images/registration-emea-2019.png" alt="" />
                </div>
                <div className="col-8 d-flex align-items-center flex-wrap">
                  <div>
                  <h2 className="h2 font-weight-light text-dark">{this.props.eventName} Registrations</h2>
                    <p>Please review your registration before confirming it. After confirmation - we will send you an email with a PDF invoice and a link for credit card payment.</p>
                    <div className="">
                      <p className="mb-1 text-primary font-weight-bold">These are the participants included in your registration:</p>
                      <ul className="list-unstyled">
                      { this.state.orderlines.length > 0 &&
                        this.state.orderlines.map((o,i) => {return (<li key={i}><strong>{o.Name}</strong></li>)})
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
                          Order total: {total}
                        </p>
                        <p className="mb-0 text-primary font-weight-bold">
                          Order total(with VAT): {totalVat}
                        </p>
                    </div>
                    <div className="mt-3">
                      { this.props.admin===true &&
                        <Link to="/add-more-members" className="btn btn-dark px-5 mr-3">Add new user to the registration</Link>                  
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