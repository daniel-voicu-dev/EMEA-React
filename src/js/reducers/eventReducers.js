export default function counter(state = {}, {type,payload}) {   
  switch (type) {   
  case "SET_EVENT_FULFILLED":
    return payload;
  // case 'FETCH_EVENT_REJECTED':
  //   console.log("Loading event failed:");
  //   throw new Error(payload);    
  default:
    return state
  }
}