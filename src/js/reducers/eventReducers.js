export default function counter(state = {
  "EventNo": "",
  "EventName": "",
  "ItemNo": "",
  "ItemDescription": "",
  "UnitPrice": null
}, {type,payload}) {   
  switch (type) {   
  case "SET_EVENT_FULFILLED":
    return {...payload};
  case "SET_EVENT_PRICE":
    return {...state, itemPrice: payload}  
  // case 'FETCH_EVENT_REJECTED':
  //   console.log("Loading event failed:");
  //   throw new Error(payload);    
  default:
    return state
  }
}

