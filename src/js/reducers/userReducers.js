export default function counter(state = {Name: "", Token: "", Domain: "", Email: "", CompanyNo: "",CompanyName: "", error: "", CompanyList: [], CountryList: []}, {type,payload}) {   
  switch (type) {   
  case "FETCH_EMAIL_FULFILLED":
    return {...state, Email: payload};
  case "FETCH_DOMAIN_FULFILLED":
    return {...state, Domain: payload};
  case "FETCH_COUNTRIES_FULFILLED":
    return {...state, CountryList: payload}; 
  case "ADD_COMPANY_FULFILLED":
    return {...state, CompanyList: [...state.CompanyList, payload]};    
  // case "SET_COMPANY":
  //   return {...state, CompanyNo: payload};       
  case "FETCH_USER_FULFILLED": 
    return {...state, Name: payload.Name, Token: payload.Token, CompanyName: payload.CompanyName, CompanyNo: payload.CompanyNo};
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