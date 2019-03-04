import {apiDomain} from "./variables";
import axios from 'axios';
import Noty from 'noty';

export function getEvent(history, event = {"EventNo": "ASIA2019"}) {    
  return (dispatch) => {       
    let postDomain = apiDomain + "/api/eventItems";  
    axios.post(postDomain, event).then(function(r){
      // dispatch({type: "SET_EVENT", payload: r.data.EventItems[0]});
      dispatch({type: "SET_EVENT_ITEMS", payload: r.data.EventItems});
      history.push("/event");
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

export function setEvent(history,o){
  return (dispatch) => {
    dispatch({type: "SET_EVENT", payload: o});
    history.push("/start");
  }
}