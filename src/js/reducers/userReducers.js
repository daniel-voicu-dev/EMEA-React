export default function counter(state = {Name: "", Token: "", Domain: "", Email: "", CompanyNo: "",CompanyName: "", error: "", CompanyList: [], CountryList: [], isAdmin: false, isConfirmed: false, UnregisteredUsers: [], ExistingRegistrations: []}, {type,payload}) {   
  switch (type) {   
  case "UPDATE_USER_INFORMATION":
    return {...state, ...payload};  
  // case "SET_USER_EMAIL":
  //   return {...state, Email: payload};
  // case "SET_USER_DOMAIN":
  //   return {...state, Domain: payload};
  case "FETCH_COUNTRIES":
    return {...state, CountryList: payload}; 
  case "SET_ADMIN":
    return {...state, isAdmin: payload};   
  case "UPDATE_USER_IS_CONFIRMED":
    return {...state, isConfirmed: payload};  
  case "ADD_UNREGISTERED_USERS":
    return {...state, UnregisteredUsers: payload};  
  case "ADD_COMPANY_FULFILLED":
    return {...state, CompanyList: [...state.CompanyList, payload]};    
  case "SET_USER_COMPANY_NO":
    return {...state, CompanyNo: payload}; 
  case "SET_USER_COMPANY_NAME":
    return {...state, CompanyName: payload}; 
  case "ADD_EXISTING_REGISTRATIONS_BY_USER":
    return {...state, ExistingRegistrations: [...payload]}    
  case "SET_LOGIN_NAME": 
    return {...state, Name: payload};       
  case "GET_TOKEN":
    return {...state, Token: payload}
  // case "GET_COMPANIES":
  //   return {...state, CompanyList: payload}  
  case "FETCH_USER_FULFILLED": 
    return {...state, Name: payload.Name, CompanyName: payload.Company.CompanyName, CompanyNo: payload.Company.CompanyNo};
  case "ERROR_CREDENTIALS_UPDATE":
    return {...state, error: payload }     
  case "ERROR_RESET":
    return {...state, error: payload }    
  case 'FETCH_EMAIL_REJECTED':
    console.log("Loading user failed:");
    throw new Error(payload);    
  default:
    return state
  }
}