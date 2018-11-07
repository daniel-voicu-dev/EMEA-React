import {apiDomain} from "./variables";
import axios from 'axios';
import store from "../store";

export function getEvent() {
  return (dispatch) => {     
    let postDomain = apiDomain + "/api/eventItems";  
    axios.post(postDomain, {"EventNo": "ASIA2019"}).then(function(r){
      dispatch({type: "SET_EVENT", payload: r.data.EventItems[0]});
    })
  }
}
