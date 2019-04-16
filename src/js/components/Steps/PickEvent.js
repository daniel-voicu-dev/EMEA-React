import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux';

import Header from "../Header";
import { getEvent } from '../../actions/eventActions';
import { getCountries } from '../../actions/userActions';


const PickEvent = (props) => {  
  let [alert,setAlert] = useState(false);
  let [events,setEvents] = useState([{eventName: "ASIA 2019", eventNo: "ASIA2019", ItemDescription: "Normal Price", ItemNo: "70062"}, {eventName: "ASIA 2019 (TEST)", eventNo: "ASIA2019", ItemDescription: "Normal Price", ItemNo: "70062"}]);
  let [selectedEvent, setSelectedEvent] = useState(null);
  let alertMessage = alert ? (<p className="alert alert-danger">Please select an event to continue</p>) : ("");

  useEffect(() => {   
    props.getCountries();
  },[]);
 
  const handleSubmit = (v) => {    
    if (v !== null && v !== "") {
      props.getEvent({"EventNo": selectedEvent})
    } else {
      setAlert(true);
    }    
  }

  const handleChange = e => {
    if (e.target.value !== "" && e.target.value !== undefined) {
      setAlert(false);        
      setSelectedEvent(e.target.value);
    } else {
      setSelectedEvent(null);   
    }
  }

  return (   
      <React.Fragment>
      <Header />
      <div className="container">
        <div className="row">
          <article className="col-12">
            <div className="row">
              <div className="col-4 d-none">
                <img className="img-fluid" src="/images/registration-emea-2019.png" alt="" />
              </div>
              <div className="col-8 col-12 d-flex align-items-center flex-wrap">                  
                <div>
                  <h2 className="h2 font-weight-light text-primary">Welcome to Directions EMEA registration process.</h2>
                  <p className="">In order to continue please select an event.</p>                                 
                  {alertMessage}
                  <select onChange={(e) => handleChange(e)} className="form-control rounded-0 mb-3 col-sm-6">
                      <option value="">Please select an event</option>
                      {events.map((o,i)=> {return( <option key={i} value={o.eventNo}>{o.eventName}</option>)})}
                    </select>
                  <button type="button" onClick={() => handleSubmit(selectedEvent)} className="btn btn-primary px-5">Next</button>
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
  }
}

const mapDispatchToProps = { getEvent, getCountries }

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PickEvent)
