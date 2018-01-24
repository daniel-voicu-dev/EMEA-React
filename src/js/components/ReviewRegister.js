import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Header from "./Header";

import axios from 'axios';

export default class ReviewRegister extends Component {  
  constructor(props) {
    super(props);
    this.state = {      
      users: [],      
      company: {},
      quantity: null,
      price: 160.00,
      currency: ""
    };
  }  
  componentWillMount() {
    axios.get("resources/getReview.json").then((r)=> {
      this.setState({users: r.data.users});
      this.setState({company: r.data.company});
      this.setState({quantity: r.data.quantity});
      this.setState({price: r.data.price});
      this.setState({currency: r.data.currency});
    });
  }
  render() {   
    let hasCompany = Object.keys(this.state.company).length > 0 ? true : false;
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
                <p>Please review your registration before confirming it. After confirmation we will send you an invoice and a link for the payment with Stripe.</p>
                <div className="">
                  <p className="mb-1 text-primary font-weight-bold">These are the participants included in your registration:</p>
                  <ul className="list-unstyled">
                    {this.state.users.map((o,i) => {return (<li key={i}><strong>{o.name}</strong></li>)})}                   
                  </ul>
                  <p className="mb-1 text-primary font-weight-bold">Company details:</p>                  
                    { hasCompany === true &&    
                      <ul className="list-unstyled">                    
                        <li><strong>{this.state.company.name}</strong></li>
                        <li>{this.state.company.address}</li>
                        <li>{this.state.company.state}</li>
                        <li>{this.state.company.city}, {this.state.company.zip}</li>
                        <li>{this.state.company.country}</li>
                      </ul>
                    }                  
                  { this.state.quantity !== null &&  
                    <p className="mb-0 text-primary font-weight-bold">
                      Order total: {this.state.quantity} x {this.state.price} EURO = {this.state.quantity*this.state.price} {this.state.currency}*
                    </p>
                  }
                  <small>* prices do not include VAT or other applicable taxes</small>
                </div>
                <div className="mt-3">
                  <Link to="/add-new-user" className="btn btn-dark px-5 mr-3">Add new user</Link>
                  <Link to="/registration-completed" className="btn btn-primary px-5">Send the registration</Link>
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