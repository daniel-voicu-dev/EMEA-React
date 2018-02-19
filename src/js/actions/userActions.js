import axios from 'axios';
import store from "../store";
import jquery from "jquery";
import bootstrap from "bootstrap";
import {apiDomain} from "./variables";
export function getStepOne(history, email) {
  return (dispatch) => {   
    let postDomain = apiDomain + "/api/personinformation";
    let sendObj = {
      "Login": email,      
      "EventNo": store.getState().event.eventNo
    };  
    axios.post(postDomain, sendObj).then(r=>{
      console.log(r.data);
      if (r.data.No !== null && r.data.No !== "") {
        let email = r.data.Email;
        let domain = "@" + email.split("@")[1];
        dispatch({type: "FETCH_EMAIL_FULFILLED", payload: email});
        dispatch({type: "FETCH_DOMAIN_FULFILLED", payload: domain});
        history.push("/login");
      } else {
        let domain = "@" + email.split("@")[1];
        dispatch({type: "FETCH_EMAIL_FULFILLED", payload: email});
        dispatch({type: "FETCH_DOMAIN_FULFILLED", payload: domain});
        if (r.data.CompaniesForDomain.length > 0) {
          let companies = r.data.CompaniesForDomain.reduce((r,v,k)=>{            
            return [...r,{CompanyName: v.Name, CompanyNo: v.No, Login: v.Login}];
          },[]);
          dispatch({type: "GET_COMPANIES", payload: companies})
        }
        history.push("/create-user");
      }
    });
    // axios.get("resources/getStart.json").then(r=>{     
    //   let isUser = r.data.Login === email;  // FOR DEVELOPMENT ONLY MUST BE DELEATED
    //   if (isUser) {
    //     let email = r.data.Login;
    //     let domain = "@" + email.split("@")[1];
    //     dispatch({type: "FETCH_EMAIL_FULFILLED", payload: email});
    //     dispatch({type: "FETCH_DOMAIN_FULFILLED", payload: domain});
    //     history.push("/login");
    //   } else {
    //     let domain = "@" + email.split("@")[1];
    //     dispatch({type: "FETCH_EMAIL_FULFILLED", payload: email});
    //     dispatch({type: "FETCH_DOMAIN_FULFILLED", payload: domain});
    //     history.push("/create-user");
    //   }
    // })
  }
}

export function getUser(history, email, password) {
  let postDomain = apiDomain + "/api/login";
  let sendObj = {
    "Login": email,
    "Password": password,
    "EventNo":  store.getState().event.eventNo
  };  
  return (dispatch) => {   
    // axios.get("resources/getUser.json").then(r=>{
    //   let isUser = r.data.filter(x=>x.Email === email && x.Password === password).length > 0;     
    //   if (isUser) {       
    //     dispatch({type: "FETCH_USER_FULFILLED", payload: r.data.filter(x=> {return x.Email === email && x.Password === password})[0]});
    //     dispatch({type: "ERROR_RESET", payload: ""});
    //     history.push("/pick-company");
    //   } else {              
    //     dispatch({type: "ERROR_CREDENTIALS_UPDATE", payload: "Wrong credentials. Please try again."});
    //   }
    // })
    axios.post(postDomain, sendObj).then(r=>{
      console.log(r.data);
      if (r.data.Login !== null && r.data.Login !== "" ) {    
        dispatch({type: "GET_TOKEN", payload: r.data.Token});    
        dispatch({type: "ERROR_RESET", payload: ""});
        history.push("/pick-company");
      } else {
        dispatch({type: "ERROR_CREDENTIALS_UPDATE", payload: "Wrong credentials. Please try again."});
      }
    }).catch((error) => {
      dispatch({type: "ERROR_CREDENTIALS_UPDATE", payload: "Wrong credentials. Please try again."});
    });
  }
}

export function getCountries() {
  let postDomain = apiDomain + "/api/countries";
  return (dispatch) => {
    axios.post(postDomain, {}).then(r => {      
      dispatch({type: "FETCH_COUNTRIES_FULFILLED", payload: r.data.Countries});   
    });
  }
}

export function getUserInfo() {
  let postDomain = apiDomain + "/api/personinformation";  
  let sendObj = {
    "Login": store.getState().user.Email,      
    "EventNo": store.getState().event.eventNo
    // "Token": store.getState().user.Token
  }
  return (dispatch) => {
    axios.post(postDomain, sendObj).then(r=>{  
      console.log(r.data); 
      dispatch({type: "FETCH_USER_FULFILLED", payload: r.data});
      dispatch({type: "SET_COMPANY", payload: r.data.Company});
      dispatch({type: "GET_COMPANIES", payload: r.data.CompaniesForDomain});
    });
  }
 
}

export function createUser(history,data) {
  return (dispatch) => {
    let postDomain = apiDomain + "/api/signupperson";
    let sendObj = {
      "Login": data.email,
      "Password": data.password,
      "Name": data.name,
      "Address": data.address,      
      "City": data.city,
      "CountryCode": data.country,
      "PhoneNo": data.phone,
      "PostCode": data.zip,
      "CompanyNo": data.company
    };  
    console.log(sendObj);
    axios.post(postDomain, sendObj).then(r => {      
      console.log(r.data);    
      history.push("/login");  
    });
  }
}

export function setAdmin(arg) {
  return (dispatch) => {
    dispatch({type: "SET_ADMIN", payload: arg});
  }
}

export function registerCompany(data) {
  return (dispatch) => {
   let sendObj = {
     "Login": data.email,
     "Name": data.name,
     "Address": data.address,
     "Address2": data.address2,
     "City": data.city,
     "CountryCode": data.country,
     "PhoneNo": data.phone,
     "PostCode": data.zip
   };  
   let postDomain = apiDomain + "/api/signupcompany";
  
   axios.post(postDomain, sendObj).then(r => {
    $("#AddCompanyModal").modal("hide");   
    console.log(r);
    dispatch({type: "ADD_COMPANY_FULFILLED", payload: r.data})
    dispatch({type: "SET_COMPANY", payload: r.data})
   });
  //  axios.get("resources/getCompany.json").then(r=>{ ///changed to post
  //   $("#AddCompanyModal").modal("hide");    
  //   axios.get("resources/getCompany.json").then(r2=>{
  //     dispatch({type: "FETCH_COMPANIES_FULFILLED", payload: r2.data.CompanyList});
  //   });
  //  });   
  }
}