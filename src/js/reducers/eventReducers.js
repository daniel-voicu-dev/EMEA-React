export default function counter(state = { id : "", img: "", content: ""}, {type,payload}) {   
  switch (type) {   
  case "FETCH_EVENT_FULFILLED":
    return {...state, payload};
  case 'FETCH_EVENT_REJECTED':
    console.log("Loading product failed:");
    throw new Error(payload);    
  default:
    return state
  }
}