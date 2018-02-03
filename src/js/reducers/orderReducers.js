export default function counter(state = { Company: {}, Users: []}, {type,payload}) {   
  switch (type) {   
  case "SET_COMPANY":
    return {...state, Company: payload};
  case "ADD_USER_TO_ORDER":
    return {...state, Users: [...state.Users.filter(x=> x.Email !== payload.Email), payload]};  
  // case 'FETCH_EVENT_REJECTED':
  //   console.log("Loading event failed:");
  //   throw new Error(payload);    
  default:
    return state
  }
}