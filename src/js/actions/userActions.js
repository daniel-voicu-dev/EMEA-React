import axios from 'axios';
import store from "../store";
import jquery from "jquery";
import bootstrap from "bootstrap";
import {apiDomain} from "./variables";
import Noty from 'noty';

export function getCountries() {  
  let postDomain = apiDomain + "/api/countries";
  return (dispatch) => {
    axios.post(postDomain, {}).then(r => {      
      dispatch({type: "FETCH_COUNTRIES", payload: r.data.Countries});   
    });
  }
}

export function goToLogin(history, email) {
  return (dispatch) => {   
    let postDomain = apiDomain + "/api/personinformation";    
    let sendObj = {
      "Login": email,      
      "EventNo": store.getState().event.EventNo
    };     
    axios.post(postDomain, sendObj).then(r=>{         
      let domain = "@" + email.split("@")[1];;  
      if (r.data.No !== null) {   
        //Go to login step   
        //TO DO update user dispatch
        //dispatch({type: "UPDATE_USER_INFORMATION", payload: {"Email": email, "Domain": domain}});
        // dispatch({type: "SET_COMPANY", payload: r.data.Company})
        // dispatch({type: "SET_USER_EMAIL", payload: email});
        // dispatch({type: "SET_USER_DOMAIN", payload: domain});
        dispatch({type: "UPDATE_USER_INFORMATION", payload: {"Email": email, "Domain": domain}});
        axios.post(apiDomain + "/api/companyinformation", {"CompanyEmailOrDomain": store.getState().user.Domain.split("@")[1], "EventNo": store.getState().event.EventNo}).then(r=>{
          dispatch({type: "UPDATE_USER_INFORMATION", payload: {"CompanyList": r.data.Companies}});
          //dispatch({type: "UPDATE_USER_INFORMATION", payload: {"CompanyList": r.data.Companies}});     
          history.push("/login");
        });   
        
      } else {
        //Go to create user step with domain already filled in
        dispatch({type: "UPDATE_USER_INFORMATION", payload: {"Email": email, "Domain": domain}});
        axios.post(apiDomain + "/api/companyinformation", {"CompanyEmailOrDomain": store.getState().user.Domain.split("@")[1], "EventNo": store.getState().event.EventNo}).then(r=>{
          dispatch({type: "UPDATE_USER_INFORMATION", payload: {"CompanyList": r.data.Companies}});     
          history.push("/create-user");  
        });   
        // dispatch({type: "SET_USER_EMAIL", payload: email});
        // dispatch({type: "SET_USER_DOMAIN", payload: domain});
        // dispatch({type: "GET_COMPANIES", payload: r.data.CompaniesForDomain})
        
      }
    });    
  }
}

export function verifyUserAndGoToNextStep(history, email, password) {
  let postDomain = apiDomain + "/api/login";   
  return (dispatch) => { 
    axios.post(postDomain, {"Login": email,"Password": password,"EventNo":  store.getState().event.EventNo}).then(r=>{ 
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

        //gets info for the company the user is registered to and sets admin state/unregistered users/
        axios.post(apiDomain + "/api/companyinformation", {"CompanyEmailOrDomain": domain, "EventNo": eventNo}).then(r2 => {         
          var companyFilteredByLogin = r2.data.Companies.filter((o) => {return o.No === store.getState().user.CompanyNo}).length > 0 ? r2.data.Companies.filter((o) => {return o.No === store.getState().user.CompanyNo})[0] : undefined;
         
          if(companyFilteredByLogin !== undefined) {    
            let userIsAdmin = companyFilteredByLogin.PrimaryContact.Email === store.getState().user.Name;         
            if (companyFilteredByLogin.PrimaryContact.Email === store.getState().user.Name) {
              dispatch({type: "SET_ADMIN", payload: true});
              dispatch({type: "ADD_UNREGISTERED_USERS", payload: companyFilteredByLogin.UnregisteredPerson});
            }
            //goes to next step based on login and registration
            axios.post(apiDomain + "/api/getregistrations", {"EventNo": eventNo,"LoginOrDomain": domain}).then(r3 => {
              if (r3.data.CompanyRegistrations.length > 0) {
                let getAllRegistrations = r3.data.CompanyRegistrations.filter(o => {return o.EventNo === eventNo}).reduce((r,v,k) => {return [...r, ...v.PersonRegistrations]},[]);
                let userAlreadyRegistered = getAllRegistrations.filter(o=>{return o.PersonEmail === email}).length > 0 ? getAllRegistrations.filter(o=>{return o.PersonEmail === email})[0].RegistrationInvoiceNo == "" : false;
                let userIsAlreadyConfirmed = getAllRegistrations.filter(o=>{return o.PersonEmail === email}).length > 0 ? getAllRegistrations.filter(o=>{return o.PersonEmail === email})[0].RegistrationInvoiceNo !== "" : false;               
                dispatch({type: "UPDATE_USER_IS_CONFIRMED", payload: userIsAlreadyConfirmed});
                dispatch({type: "ADD_EXISTING_REGISTRATIONS_BY_USER", payload: getAllRegistrations.filter(o=>{return o.CreatedByContactEmail === email && o.RegistrationInvoiceNo !== ""})})
                if (userAlreadyRegistered === true && !userIsAdmin) {
                  dispatch({type: "ADD_USER_TO_ORDER", payload: {"Name": store.getState().user.Name, "Login": store.getState().user.Email}});
                  history.push("/review-register");
                } else {
                  history.push("/register-others");
                }
              } else {
                history.push("/register-others");
              }             
            });
          } else {
            throw new Error("There is no company that matches the login company number");
          }
        }) 
    }).catch((error) => {      
      dispatch({type: "ERROR_CREDENTIALS_UPDATE", payload: "Wrong credentials. Please try again."});
    });
  }
}

export function goToAddMoreMembers(history) {
  return (dispath) => {
    history.push("/add-more-members");
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
      axios.post(apiDomain + "/api/companyinformation", {"CompanyEmailOrDomain": store.getState().user.Domain.split("@")[1], "EventNo": store.getState().event.EventNo}).then(r=>{
        dispatch({type: "UPDATE_USER_INFORMATION", payload: {"CompanyList": r.data.Companies}});        
      });      
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
      "CompanyNo": data.company,
      "Email2" :data.Email2,
      "PIBusinessCentral": data.PIBusinessCentral,
      "PICustomerEngagement": data.PICustomerEngagement,
      "PIOther": data.PIOther,
      "PIPowerPlatform": data.PIPowerPlatform,
      "FFConsulting": data.FFConsulting,
      "FFDevelopment": data.FFDevelopment,
      "FFManagement": data.FFManagement,
      "FFSalesMarketing": data.FFSalesMarketing,
      "JobTitle": data.JobTitle,
      "OptOut": data.OptOut
    };     
    axios.post(postDomain, sendObj).then(r => {  
      dispatch({type: "UPDATE_LOGIN_MESSAGE", payload: true}); 
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
            dispatch({type: "ADD_UNREGISTERED_USERS", payload: r2.data.Companies.filter(o=> o.No === store.getState().user.CompanyNo)[0].UnregisteredPerson});
            dispatch({type: "ERROR_RESET", payload: ""});
            history.push("/add-more-members"); 
        }) 
        
      }).catch((error) => {
        if (error.response) {         
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
      "VATRegistrationNo": data.companyVATNo,
      "Email2": null,
      "FFConsulting": false,
      "FFDevelopment": false,
      "FFManagement": false,
      "FFSalesMarketing": false,
      "JobTitle": null,
      "OptOut": false,
      "PartnerType": null,
      "PIBusinessCentral": false,
      "PICustomerEngagement": false,
      "PIOther": false,
      "PIPowerPlatform": false,
      "PTVAR": data.PTVAR,
      "PTISV": data.PTISV,
      "PTVARandISV": data.PTVARandISV,
      "PTMicrosoftEmployee": data.PTMicrosoftEmployee    

   };  
   let postDomain = apiDomain + "/api/signupcompany";
  
   axios.post(postDomain, sendObj).then(r => {
    $("#AddCompanyModal").modal("hide");     
   
    let companyNo = r.data.CompanyNo;
    let companyName = r.data.CompanyName; 
    
    axios.post(apiDomain + "/api/companyinformation", {"CompanyEmailOrDomain": store.getState().user.Domain.split("@")[1], "EventNo": store.getState().event.EventNo}).then(r=>{
      console.log("Company registration data",r.data);
      dispatch({type: "UPDATE_USER_INFORMATION", payload: {"CompanyList": r.data.Companies}});
      dispatch({type: "UPDATE_USER_INFORMATION", payload: {"CompanyNo": companyNo, "CompanyName": companyName}});
      // dispatch({type: "GET_COMPANIES", payload: r.data.Companies});
      // dispatch({type: "SET_USER_COMPANY_NO", payload: r.data.Companies[0].No});  
      // dispatch({type: "SET_USER_COMPANY_NAME", payload: r.data.Companies[0].Name}); 
    });
    //dispatch({type: "ADD_COMPANY_FULFILLED", payload: r.data})
    //dispatch({type: "SET_COMPANY", payload: r.data})
   }).catch(function(error){
    new Noty({
      text: error.response.dataExceptionMessage,
      theme: 'mint',
      timeout: 3000,
      modal: true,
      layout: "center",
      type: "error"
    }).show();
    // alert(error.response.data.ExceptionMessage);
   });
  //  axios.get("resources/getCompany.json").then(r=>{ ///changed to post
  //   $("#AddCompanyModal").modal("hide");    
  //   axios.get("resources/getCompany.json").then(r2=>{
  //     dispatch({type: "FETCH_COMPANIES_FULFILLED", payload: r2.data.CompanyList});
  //   });
  //  });   
  }
}

export function updateUserCompanyNo(no) {
  return (dispatch) => {
    dispatch({type: "SET_USER_COMPANY_NO", payload: no}); 
  }  
}