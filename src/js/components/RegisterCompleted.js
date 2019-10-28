import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Header from "./Header";
import {connect} from 'react-redux';
@connect ((store) => {
  return {
    allRegistrations: store.user.UnregisteredUsers,
    paymentLinks: store.order.PaymentLinks
  }
})
export default class RegisterFinished extends Component {  
  constructor(props) {
    super(props);
    this.state = {      
      allRegistrations: props.allRegistrations,
      paymentLinks: props.paymentLinks[0].Link
    };
  }  
 


  renderPayments() {    
  // let emails = this.state.paymentLinks.reduce((r,v,k) => {
  //   let email = obj.RegisteredPerson.reduce((i,j) => {
  //     return [...i, j.RegisteredPersonEmail]
  //   }, []);
    
  //     return [...r, ...email];
  //   }, []);

//     let emails = obj.RegisteredPersons.reduce((i,j) => {
//       return [...i, j.RegisteredPersonEmail]
//     }, []);
  
// console.log(emails, obj, this.state.allRegistrations )

//     let user = this.state.allRegistrations.reduce((r,v) => {

//       if(emails.indexOf(v.Email) > -1) {
//         return [...r , v]
//       } else {
//         return [...r]
//       }
//     }, [])
// console.log(user, emails, "user email")
//     let payForWho = user.length > 1 ? user.map((o,i, k) => {
//       if(i === k.length - 1) {
//         return o.Name;
//       } else {
//         return o.Name + ", ";
//       }
//     }) : user[0].Name;
    return (
    <p>Click <a href={this.state.paymentLinks} class="text-uppercase text-dark"><strong clasname="text-decoration-underline ">here</strong></a> to make the payment. </p>
    )
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
                <img className="img-fluid" src="/images/registration-emea-2019.png" alt="" />
              </div>
              <div className="col-8 d-flex align-items-center flex-wrap">
                <div>
                  <h2 className="h2 font-weight-light text-primary mb-3">Thank you for your registration.</h2>
                  <p className="mb-1">You will receive an email shortly with Invoice and Payment link.</p>
                  <p clasName="mb-2">We look forward to seeing you at Directions EMEA 2019.</p> 
                  <p>Click <a href="https://www.optimice-hotelregistration.de/directions_2019/index.php?show=event&eventSub=Participation&e_access=UkdseVpUSXdNVGc9KioqUTI4eVFHNTBJVGc9" className="text-uppercase text-dark"><strong clasName="text-decoration-underline ">here</strong></a> to book a room at the conference hotel!</p>
                  {this.state.paymentLinks !== "N/A" &&
                  this.renderPayments()}
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