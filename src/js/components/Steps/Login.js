import React,{useState} from 'react'
import {connect} from 'react-redux';

import Header from "../Header";
import Email from "../Email";
import Password from "../Password";

import { verifyUserAndGoToNextStep } from '../../actions/userActions';
import axios from 'axios';
import Noty from 'noty';

const Login = props => {
  let [email,setEmail] = useState(props.email);
  let [password,setPassword] = useState("");
  let [alert,setAlert] = useState(false); 
  let message = props.loginMessage ? (<p>Your email is already registered. Please use your credentials to login.</p>) : (<p>Your email address is <strong><u>already registered</u></strong>. Please use your credentials to login.</p>)
  let alertGeneral = props.error !== "" ? ( <p className="alert alert-danger">{props.error}</p>) : ("");
  let errorMessage = alert ? (<p className="alert alert-danger">Please fill in all the fields to continue.</p>) : ("");

  const resendPassword = (e) => {
    e.preventDefault();
    axios.post("/api/requestpassword",{"Login": props.email}).then((r) => {
      new Noty({
        text: "The password has been sent. Please check your email.",
        theme: 'mint',
        timeout: 3000,
        modal: true,
        layout: "center",
        type: "success"
      }).show();
    }).catch((error)=>{
      new Noty({
        text: "Something has gone wrong. Failed to send the password.",
        theme: 'mint',
        timeout: 1000,
        modal: true,
        layout: "center",
        type: "error"
      }).show();
    })
  }
  const handleSend = (e) => {
    let canSend = email !== "" && password !== "";   
    if (canSend) {
      props.verifyUserAndGoToNextStep(email,password);
    } else {
      setAlert(true);      
    }
  }

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
                  <h2 className="h2 font-weight-light text-dark">{props.eventName} Registrations</h2>
                  {message}
                  {errorMessage}
                  {alertGeneral}
                  <div>
                    <div className="form-group">
                      <label htmlFor="Email">Email</label>
                      <Email required={true} readonly={true} getEmail={(email) => setEmail(email)} setValue={props.email} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Password">Password</label>
                         <Password required={true} readonly={false} getPassword={(p) => setPassword(p)} />
                    </div>
                    <button type="button" onClick={(e) => handleSend(e)} className="px-5 btn btn-primary">Login</button>
                    <small className="w-100 d-block mt-2 resetPassword"><a href="#" onClick={(e) => resendPassword(e)}>Forgot your password ?</a></small>
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

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    email: state.user.Email,
    domain: state.user.Domain,
    token: state.user.Token,
    error: state.user.error,
    eventName: state.event.EventName,
    loginMessage: state.user.LoginMessage
  }
}

const mapDispatchToProps = { verifyUserAndGoToNextStep }

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login)

