import axios from 'axios';
import store from "../store";
import jquery from "jquery";
import bootstrap from "bootstrap";
import {apiDomain} from "./variables";
export function getStepOne(history, email) {
  return (dispatch) => {   
    let postDomain = apiDomain + "/api/personinformation";
    console.log("EVENT",store.getState().event.EventNo);
    let sendObj = {
      "Login": email,      
      "EventNo": store.getState().event.EventNo
    };     
    axios.post(postDomain, sendObj).then(r=>{   
      console.log("response",r);
      let domain = "@" + email.split("@")[1];;  
      if (r.data.No !== null) {
        // getCompanyInfo(r.data.CompaniesForDomain[0].Login.split("@")[1]);
        dispatch({type: "SET_COMPANY", payload: r.data.Company})
        dispatch({type: "FETCH_EMAIL_FULFILLED", payload: email});
        dispatch({type: "FETCH_DOMAIN_FULFILLED", payload: domain});
        history.push("/login");
        // if (r.data.CompaniesForDomain[0].Login === email) {
        //   //Login
        //   dispatch({type: "FETCH_EMAIL_FULFILLED", payload: email});
        //   dispatch({type: "FETCH_DOMAIN_FULFILLED", payload: domain});
        //   history.push("/login");
        // } else {
        //   //Create user with domain
        //   dispatch({type: "FETCH_EMAIL_FULFILLED", payload: email});
        //   dispatch({type: "FETCH_DOMAIN_FULFILLED", payload: domain});
        // }        
      } else {
        //Create user without domain        
        dispatch({type: "FETCH_EMAIL_FULFILLED", payload: email});
        dispatch({type: "FETCH_DOMAIN_FULFILLED", payload: domain});
        dispatch({type: "GET_COMPANIES", payload: r.data.CompaniesForDomain})
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
export function goToAddMoreMembers(history) {
  return (dispath) => {
    history.push("/add-more-members");
  }
}
export function getUser(history, email, password) {
  let postDomain = apiDomain + "/api/login";
  let sendObj = {
    "Login": email,
    "Password": password,
    "EventNo":  store.getState().event.EventNo
  };  
  return (dispatch) => { 
    axios.post(postDomain, sendObj).then(r=>{ 
      
        console.log(r.data);
        console.log(r.data.Token);
      
        dispatch({type: "SET_USER_COMPANY_NO", payload: r.data.Company.CompanyNo})  
        dispatch({type: "SET_USER_COMPANY_NAME", payload: r.data.Company.CompanyName})  
        dispatch({type: "GET_TOKEN", payload: r.data.Token});    
        dispatch({type: "ERROR_RESET", payload: ""});
        dispatch({type: "SET_COMPANY", payload: r.data.Company});
        dispatch({type: "SET_PERSON", payload: r.data.Person});
        dispatch({type: "SET_LOGIN_NAME", payload: r.data.Person.Name});

        let domain = store.getState().user.Domain;
        domain = domain.substr(1);
        let eventNo = store.getState().event.EventNo;

        // console.log("test");

        // alert("test");
        // history.push("/register-others");
        axios.post(apiDomain + "/api/companyinformation", {"CompanyEmailOrDomain": domain, "EventNo": eventNo}).then(r2 => {
          if (r2.data.Companies[0].PrimaryContact.Email === store.getState().user.Name) {
            dispatch({type: "SET_ADMIN", payload: true});
            dispatch({type: "ADD_UNREGISTERED_USERS", payload: r2.data.Companies[0].UnregisteredPerson});
          }
          axios.post(apiDomain + "/api/getregistrations", {"EventNo": eventNo,"LoginOrDomain": domain}).then(r3 => {
            if (r3.data.CompanyRegistrations[0].length > 0) {
              let userAlreadyRegistered = r3.data.CompanyRegistrations.filter(o => {return o.EventNo === eventNo})[0].PersonRegistrations.filter(o=>{return o.PersonEmail === email}).length > 0 ? r3.data.CompanyRegistrations.filter(o => {return o.EventNo === eventNo})[0].PersonRegistrations.filter(o=>{return o.PersonEmail === email})[0].RegistrationInvoiceNo == "" : null;
              let userIsAlreadyConfirmed = r3.data.CompanyRegistrations.filter(o => {return o.EventNo === eventNo})[0].PersonRegistrations.filter(o=>{return o.PersonEmail === email}).length > 0 ? r3.data.CompanyRegistrations.filter(o => {return o.EventNo === eventNo})[0].PersonRegistrations.filter(o=>{return o.PersonEmail === email})[0].RegistrationInvoiceNo !== "" : false;
              // console.log("debugUser",userAlreadyRegistered, r3.data.CompanyRegistrations.filter(o => {return o.EventNo === eventNo})[0].PersonRegistrations.filter(o=>{return o.PersonEmail === email}), email)
              dispatch({type: "UPDATE_USER_IS_CONFIRMED", payload: userIsAlreadyConfirmed});
              if (userAlreadyRegistered === true) {
                dispatch({type: "ADD_USER_TO_ORDER", payload: {"Name": store.getState().user.Name, "Login": store.getState().user.Email}});
                history.push("/review-register");
              } else {
                history.push("/register-others");
              }
            } else {
              history.push("/register-others");
            }
            // console.log("userAlreadyRegistered",userAlreadyRegistered);

          })
          // history.push("/register-others");
        }) 
    }).catch((error) => {
      console.log(error);
      dispatch({type: "ERROR_CREDENTIALS_UPDATE", payload: "Wrong credentials. Please try again."});
    });
  }
}

export function getCountries() {
  console.log("getCountries");
  let postDomain = apiDomain + "/api/countries";
  return (dispatch) => {
    axios.post(postDomain, {}).then(r => {      
      dispatch({type: "FETCH_COUNTRIES_FULFILLED", payload: r.data.Countries});   
    });
  }
}

// export function getEventPrice() {
//   console.log("getEventPrice");
//   let postDomain = apiDomain + "/api/eventItems";
//   return (dispatch) => {
//     axios.post(postDomain, {"EventNo": "EVT_00006"}).then(r => {    
//       console.log(r.data.EventItems[0].UnitPrice)  
//       dispatch({type: "SET_EVENT_PRICE", payload: r.data.EventItems[0].UnitPrice});   
//     });
//   }
// }

export function getUserInfo() {
  let postDomain = apiDomain + "/api/personinformation";  
  let sendObj = {
    "Login": store.getState().user.Email,      
    "EventNo": store.getState().event.EventNo
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
export function addNewMember(history,data) {
  return (dispatch) => {
    let postDomain = apiDomain + "/api/signupperson";
    axios.post(postDomain, data).then(r => {  
        let domain = store.getState().user.Domain;
        domain = domain.substr(1);
        let eventNo = store.getState().event.EventNo;
        axios.post(apiDomain + "/api/companyinformation", {"CompanyEmailOrDomain": domain, "EventNo": eventNo}).then(r2 => {  
          console.log("unregisteredPersons",r2.data.Companies[0].UnregisteredPerson);               
            dispatch({type: "ADD_UNREGISTERED_USERS", payload: r2.data.Companies[0].UnregisteredPerson});
            dispatch({type: "ERROR_RESET", payload: ""});
            history.push("/add-more-members"); 
        }) 
        
      }).catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          dispatch({type: "ERROR_CREDENTIALS_UPDATE", payload: error.response.data.ExceptionMessage});
        } else {
          console.log(error);
        }        
      });
  }
}
export function setAdmin(arg) {
  return (dispatch) => {
    dispatch({type: "SET_ADMIN", payload: arg});
  }
}

export function getCompanyInfo(domain) {
  return (dispatch) => {
    let postDomain = apiDomain + "/api/companyinformation";
    let sendObj = {
      "CompanyEmailOrDomain": domain,
      "EventNo": store.getState().event.EventNo
    };  
    axios.post(postDomain, sendObj).then(r=>{
      dispatch({type: "SET_COMPANY", payload: r.data.Companies[0]});
    });
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
     "PostCode": data.zip,
     "VATRegistrationNo": data.companyVATNo
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