import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, Link, BrowserRouter as Router, HashRouter} from 'react-router-dom';
import Header from "./Header";
import axios from 'axios';

import { setCompany, addUserToOrder } from '../actions/orderActions';
import store from "../store";

@connect ((store) => {
  return {
    companyList: store.user.CompanyList,
    order: store.order,
    token: store.user.Token,
    user: store.user
  }
})


export default class PickCompany extends Component {
  constructor(props) {
    super(props);
    this.state = {      
      companyList: props.companyList,
      selectedCompany: "",
      alert: false
    };
  }  
  componentWillMount() { 
    if(this.props.token === "") {
      alert("Session lost");
      return;
    }  
    axios.get('resources/getCompany.json?token='+this.props.token).then(r=>{
      let companyList = r.data.CompanyList;
      this.setState({companyList});
      this.setState({selectedCompany: r.data.CompanyNo});
    })    
  }  
  setCompany(e) {
    let selectedCompanyObj = this.state.companyList.filter(x=>x.CompanyNo === e.currentTarget.value)[0] !== undefined ? this.state.companyList.filter(x=>x.CompanyNo === e.currentTarget.value)[0]: {};
    let selectedCompany = this.state.companyList.filter(x=>x.CompanyNo === e.currentTarget.value)[0] !== undefined ? this.state.companyList.filter(x=>x.CompanyNo === e.currentTarget.value)[0].CompanyNo : "";
    this.props.dispatch(setCompany(selectedCompanyObj));
    this.props.dispatch(addUserToOrder(this.props.user));
    this.setState({selectedCompany});
    this.setState({alert: false});
  }
  goToAddMoreMembers() {
    if (Object.keys(this.state.selectedCompany).length > 0) {
      this.props.history.push("/register-others");
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
                  <img className="img-fluid" src="http://placehold.it/1600x1600" alt="" />
                </div>
                <div className="col-8 d-flex align-items-center flex-wrap">                  
                  <div>   
                    <h2 className="h2 font-weight-light text-primary">Welcome to Directions EMEA registration process.</h2>
                    <p className="">In order to continue please select a Company.</p>
                    <p className={alertClass}>Please select a company to continue</p>                 
                    <select onChange={(e)=>this.setCompany(e)} className="form-control mb-3" value={this.state.selectedCompany}>
                      <option value="">Please select a company</option>
                      {this.state.companyList.map((o,i)=> {return( <option key={i} value={o.CompanyNo}>{o.CompanyName}</option>)})}
                    </select>
                    <button type="button" onClick={() => this.goToAddMoreMembers()} className="btn btn-primary px-5">Next</button>
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