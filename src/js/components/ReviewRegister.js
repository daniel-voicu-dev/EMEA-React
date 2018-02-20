import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Header from "./Header";

import axios from 'axios';
import { getCompanyInfo } from '../actions/orderActions';

@connect ((store) => {
  return {
    users: store.order.Users,
    company: store.order.Company,
    price: store.event.itemPrice,
    admin: store.user.isAdmin,
    countries: store.user.CountryList
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
      currency: "EURO",
      CompanyAddress: "Test Address",
      CompanyState: "Washington",
      CompanyCity: "Seattle",
      CompanyCountry: "United States of America",
      CompanyPostalCode: "98101"
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
    console.log(this.props.users);
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
              <img className="img-fluid" src="http://placehold.it/1600x1600" alt="" />
            </div>
            <div className="col-8 d-flex align-items-center flex-wrap">
              <div>
                <h2 className="h2 font-weight-light text-primary">Welcome to Directions EMEA registration process.</h2>
                <p>Please review your registration before confirming it. After confirmation we will send you an invoice and a link for credit card payment.</p>
                <div className="">
                  <p className="mb-1 text-primary font-weight-bold">These are the participants included in your registration:</p>
                  <ul className="list-unstyled">
                    {this.props.users.map((o,i) => {return (<li key={i}><strong>{o.Name}</strong></li>)})}                   
                  </ul>
                  <p className="mb-1 text-primary font-weight-bold">Company details:</p>  
                      <ul className="list-unstyled">                    
                        <li><strong>{this.props.company.Name}</strong></li>
                        <li>{this.props.company.Address}</li>
                        <li>{this.state.CompanyState}</li>
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
                 
                  <Link to="/registration-completed" className="btn btn-primary px-5">Confirm registration</Link>
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