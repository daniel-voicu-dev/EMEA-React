import axios from 'axios';
import store from "../store";
import {apiDomain} from "./variables";
export function setCompany(o) {
  return (dispatch) => {       
    let postDomain = apiDomain + "/api/companyinformation";
    let sendObj = {
      "CompanyEmailOrDomain": o.Login,
      "EventNo": store.getState().event.eventNo
    };  
    axios.post(postDomain, sendObj).then(r=>{
      dispatch({type: "SET_COMPANY", payload: r.data.Companies[0]});
    });

    // dispatch({type: "SET_COMPANY", payload: o});
  }

}

export function addUserToOrder(o) {
  return (dispatch) => {       
    dispatch({type: "ADD_USER_TO_ORDER", payload: o});
  }
}
export function removeUserFromOrder(o) {
  return (dispatch) => {       
    dispatch({type: "REMOVE_USER_FROM_ORDER", payload: o});
  }
}
export function addCurrentUserToOrder(history,user, link) {
  return (dispatch) => {  
    dispatch({type: "ADD_SELF_TO_ORDER", payload: {"Name":user.Name, "Login": user.Email}});
    history.push(link);
  }
}

export function getCompanyInfo(company) {
  return (dispatch) => {
    let postDomain = apiDomain + "/api/companyinformation";
    let sendObj = {
      "CompanyEmailOrDomain": company,
      "EventNo": store.getState().event.eventNo
    };  
    axios.post(postDomain, sendObj).then(r=>{
      dispatch({type: "SET_COMPANY", payload: r.data.Companies[0]});
    });
  }
}