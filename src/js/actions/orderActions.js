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
export function addUsersToBeConfirmedList(array) {
  return (dispatch) => {
    dispatch({type: "UPDATE_USERS_TO_BE_CONFIRMED", payload: array});
  }
}
export function addUserListToOrder(history, array, nextStep) {
  return (dispatch) => {  
    // dispatch({type: "ADD_USER_TO_ORDER", payload: email});  
    if (array.length <= 0) {
      history.push(nextStep);     
    } else {
    let data = {
      "Login": store.getState().user.Email,
      "CreateOneInvoiceForAllRegistrations": true,
      "PersonRegistration": []
    }
    data.PersonRegistration =  array.reduce((r,v,k)=>{
      return [...r, {
        "RegistrationForEmail": v,
        "EventNo": store.getState().event.eventNo,
        "EventItemNo": store.getState().event.itemNo
      }]
    },[]);
    // console.log("data",data);
    axios.post(apiDomain + "/api/createregistration", data).then(r=>{
      // data.PersonRegistration.map((v) => {
      //   dispatch({type: "ADD_USER_TO_ORDER", payload: {"Name": v, "Login": v}});
      // });
      
      history.push(nextStep)
    }).catch((error) => {
      console.log(error);
    })
    }
    
  }
}


export function addUserToOrder(history, email, nextStep) {
  return (dispatch) => {  
    // dispatch({type: "ADD_USER_TO_ORDER", payload: email});  
    let data = {
      "Login": email,
      "CreateOneInvoiceForAllRegistrations": true,
      "PersonRegistration": [
        {
          "RegistrationForEmail": email,
          "EventNo": store.getState().event.eventNo,
          "EventItemNo": store.getState().event.itemNo
        }
      ]
    }

    axios.post(apiDomain + "/api/createregistration", data).then(r=>{
      dispatch({type: "ADD_USER_TO_ORDER", payload: {"Name": email, "Login": email}});
      history.push(nextStep)
    }).catch((error) => {
      console.log(error);
    })
    
  }
}
export function removeUserFromOrder(o) {
  return (dispatch) => {       
    dispatch({type: "REMOVE_USER_FROM_ORDER", payload: o});
  }
}
export function addCurrentUserToOrder(history, email, link) {
  return (dispatch) => {  
    dispatch({type: "ADD_USER_TO_ORDER", payload: {"Name": user.Name, "Login": user.Email}});
    history.push(link);
  }
}




export function registerUsers(history) {
  return (dispatch) => {       
    let postDomain = apiDomain + "/api/confirmregistration";
    // let sendObj = {
    //   "Login": store.getState().order.Company.Email,
    //   "CreateOneInvoiceForAllRegistrations": true,
    //   "PersonRegistration": [        
    //   ]
    // };  

    // store.getState().order.Users.map(o=>{
    //   sendObj.PersonRegistration = [...sendObj.PersonRegistration, {
    //       EventNo: store.getState().event.eventNo,
    //       EventItemNo: store.getState().event.itemNo,
    //       RegistrationForEmail: o.Login
    //     }
    //   ]
    // });
    // // axios.post(apiDomain + "/api/eventitems", {"EventNo": store.getState().event.eventNo}).then(r=>{
    // //     console.log(r.data);
    // //   });
    // // console.log(sendObj);
    // axios.post(postDomain, sendObj).then(r=>{
    //   console.log(r.data);
    // });
    // Promise.all(store.getState().order.Users.map(o => {return axios.post(postDomain, {"EventNo": store.getState().event.eventNo, "Login": o.Login})})).then(() => {
    //   history.push("/registration-completed");
    // }).catch((error => {
    //   console.log(error);
    // }))
    axios.post(postDomain, {"EventNo": store.getState().event.eventNo, "Login": store.getState().user.Email}).then((r)=>{
      console.log("success confirming users");
      history.push("/registration-completed");
    });
    // dispatch({type: "SET_COMPANY", payload: o});
  }

}