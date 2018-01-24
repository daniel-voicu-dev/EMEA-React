export default function counter(state = {id: "", token: "", domain: "", email: "", company: "", error: "" }, {type,payload}) {   
  switch (type) {   
  case "FETCH_EMAIL_FULFILLED":
    return {...state, email: payload};
  case "FETCH_DOMAIN_FULFILLED":
    return {...state, domain: payload}; 
  case "FETCH_USER_FULFILLED": 
    return {...state, id: payload.id, token: payload.token};
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