import {apiDomain} from "./variables";
import axios from 'axios';
import Noty from 'noty';
import history from '../history';

export const getEvent = (event = {"EventNo": "EMEA2019"}) => {    
  return (dispatch) => {       
    let postDomain = apiDomain + "/api/eventItems";  
    axios.post(postDomain, event).then(function(r){
      dispatch({type: "SET_EVENT", payload: {...event,"EventName":"EMEA2019"}});      
      dispatch({type: "SET_EVENT_ITEMS", payload: r.data.EventItems});
    }).catch(error => {      
      new Noty({
        text: error.response.data.ExceptionMessage,
        theme: 'mint',
        timeout: 3000,
        modal: true,
        layout: "center",
        type: "error"
      }).show();
    });
  }
}

export const setEvent = (o) => {
  return (dispatch) => {
    dispatch({type: "SET_EVENT", payload: o});
    history.push("/start");
  }
}