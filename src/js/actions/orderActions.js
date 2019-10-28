import axios from 'axios';
import store from "../store";
import {apiDomain} from "./variables";
import Noty from 'noty';
import history from '../history';

export function setCompany(o) {
  return (dispatch) => {       
    let postDomain = apiDomain + "/api/companyinformation";
    let sendObj = {
      "CompanyEmailOrDomain": o.Login,
      "EventNo": store.getState().event.EventNo
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
        "RegistrationForEmail": v.email,
        "EventNo": store.getState().event.EventNo,
        "EventItemNo": store.getState().event.ItemNo,
        "PromoCode": v.promo
      }]
    },[]);
    // console.log("data",data);
    axios.post(apiDomain + "/api/createregistration", data).then(r=>{
      // data.PersonRegistration.map((v) => {
      //   dispatch({type: "ADD_USER_TO_ORDER", payload: {"Name": v, "Login": v}});
      // });     
     
      history.push(nextStep)
    }).catch((error) => {

      let errorPromoCodeMessage = error.response.data.ExceptionMessage;
      let invalidPromoCodes = array.filter((o)=> { return errorPromoCodeMessage.includes(o.promo.toUpperCase())});
      let errorMessage = `These promo codes are invalid: ${invalidPromoCodes.map(o=>{return o.promo}).join(", ")}`;
      new Noty({
        text: errorMessage,
        theme: 'mint',
        timeout: 3000,
        layout: "center",
        modal: true,
        type: "error"
      }).show();      
    })
    }
    
  }
}
export const deleteRegistration = () => {
  return (dispatch) => {
    let postDomain = apiDomain + "/api/removeallregistrations";
    axios.post(postDomain, {"EventNo": store.getState().event.EventNo, "Login": store.getState().user.Email}).then((r)=>{
       console.log("success deleting users");      
       history.push('/add-more-members')
    });
  } 
}

export const addUserToOrder = (obj) => {
  return (dispatch) => {  
    let data = {
      "Login": obj.RegistrationForEmail,
      "CreateOneInvoiceForAllRegistrations": true,
      "PersonRegistration": [
        {
          "RegistrationForEmail": obj.RegistrationForEmail,
          "EventNo": obj.EventNo,
          "EventItemNo": obj.ItemNo,
          "PromoCode": obj.PromoCode
        }
      ]
    }

    axios.post(apiDomain + "/api/createregistration", data).then(r=>{
      dispatch({type: "ADD_USER_TO_ORDER", payload: {"Name": obj.RegistrationForEmail, "Login": obj.RegistrationForEmail}});
      if (document.querySelector(".modal-backdrop") !== null) {
        document.querySelector(".modal-backdrop").remove();
      }
      history.push("/review-register")
    }).catch((error) => {
      let errorPromoCodeMessage = `The Promo Code ${obj.PromoCode} is invalid.`
      new Noty({
        text: errorPromoCodeMessage,
        theme: 'mint',
        timeout: 3000,
        layout: "center",
        modal: true,
        type: "error"
      }).show();
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
    //       EventNo: store.getState().event.EventNo,
    //       EventItemNo: store.getState().event.ItemNo,
    //       RegistrationForEmail: o.Login
    //     }
    //   ]
    // });
    // // axios.post(apiDomain + "/api/eventitems", {"EventNo": store.getState().event.EventNo}).then(r=>{
    // //     console.log(r.data);
    // //   });
    // // console.log(sendObj);
    // axios.post(postDomain, sendObj).then(r=>{
    //   console.log(r.data);
    // });
    // Promise.all(store.getState().order.Users.map(o => {return axios.post(postDomain, {"EventNo": store.getState().event.EventNo, "Login": o.Login})})).then(() => {
    //   history.push("/registration-completed");
    // }).catch((error => {
    //   console.log(error);
    // }))
    var nRegisteringUsers = new Noty({
      text: "Registering users. Please wait...",
      theme: 'mint',      
      layout: "center",
      modal: true,
      type: "information"
    });
    
    nRegisteringUsers.show();   
    axios.post(postDomain, {"EventNo": store.getState().event.EventNo, "Login": store.getState().user.Email}).then((r)=>{
      // console.log("success confirming users");      
      let payURL = r.data.StripePaymentLinks[0].Link;
      dispatch({type: "GET_PAYMENT_LINKS", payload: r.data.StripePaymentLinks});
      nRegisteringUsers.close();
      if(payURL !== "N/A") {
        window.open(payURL,'_blank');
      }
      
      history.push("/registration-completed");
    });
    // dispatch({type: "SET_COMPANY", payload: o});
  }

}