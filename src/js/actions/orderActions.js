import axios from 'axios';
import store from "../store";
import {apiDomain} from "./variables";
export function setCompany(o) {
  return (dispatch) => {       
    dispatch({type: "SET_COMPANY", payload: o});
  }

}

export function addUserToOrder(o) {
  return (dispatch) => {       
    dispatch({type: "ADD_USER_TO_ORDER", payload: o});
  }

}
export function addCurrentUserToOrder(history,user) {
  return (dispatch) => {  
    dispatch({type: "ADD_USER_TO_ORDER", payload: {"Name":user.Name, "Login": user.Email}});
    history.push("/review-register");
  }
}

export function getCompanyInfo(company) {
  return (dispatch) => {
    let postDomain = apiDomain + "/api/companyinformation";
    let sendObj = {
      "CompanyEmailOrDomain": company,
      "EventNo": "EVT_00009"
    };  
    axios.post(postDomain, sendObj).then(r=>{
      console.log(r.data);
    });
  }
}