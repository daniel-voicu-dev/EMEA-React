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


export function registerUsers() {
  return (dispatch) => {       
    let postDomain = apiDomain + "/api/createregistration";
    let sendObj = {
      "Login": store.getState().order.Company.Email,
      "CreateOneInvoiceForAllRegistrations": true,
      "PersonRegistration": [        
      ]
    };  

    store.getState().order.Users.map(o=>{
      sendObj.PersonRegistration = [...sendObj.PersonRegistration, {
          EventNo: store.getState().event.eventNo,
          EventItemNo: store.getState().event.itemNo,
          RegistrationForEmail: o.Login
        }
      ]
    });
    // axios.post(apiDomain + "/api/eventitems", {"EventNo": store.getState().event.eventNo}).then(r=>{
    //     console.log(r.data);
    //   });
    // console.log(sendObj);
    axios.post(postDomain, sendObj).then(r=>{
      console.log(r.data);
    });

    // dispatch({type: "SET_COMPANY", payload: o});
  }

}