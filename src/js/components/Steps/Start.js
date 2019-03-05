import React,{useState, useEffect} from 'react'
import {connect} from 'react-redux';
import Header from "../Header";
import Email from "../Email";

import { goToLogin} from '../../actions/userActions';

const Start = props => {

  let [email,setEmail] = useState("");
  let [alert,setAlert] = useState(false);
  let alertMessage = alert ? (<p className="alert alert-danger">{props.fillInFields}</p>) : ("");

  const handleSend = (e) => {
    let canSend = email !== "";
    if (canSend) {
      props.goToLogin(email);
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
                <img className="img-fluid" src="/images/registration-asia-2019.png" alt="" />
              </div>
              <div className="col-8 d-flex align-items-center flex-wrap">                  
                <div>
                  <h2 className="h2 font-weight-light text-dark">{props.eventName} Registrations</h2>
                  <p>To register create a Directions Community User</p>
                  <p>Enter your business email to continue</p>
                  {alertMessage}
                  <div id="form">
                    <div className="form-group">                        
                      <Email required={true} readonly={false} getEmail={(email) => {setEmail(email)}}/>
                    </div>
                    <div className="form-group">
                      <button type="button" className="px-5 btn btn-primary" onClick={() => handleSend()}>Next</button>   
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

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    user: state.user,
    eventName: state.event.EventName,
    fillInFields: state.event.FillInFields
  }
}

const mapDispatchToProps = { goToLogin }

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Start)
