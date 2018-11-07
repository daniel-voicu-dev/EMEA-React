export default function counter(state = {
  "EventNo": "",
  "EventName": "",
  "ItemNo": "",
  "ItemDescription": "",
  "UnitPrice": null
}, {type,payload}) {   
  switch (type) {   
  case "SET_EVENT":
    return {...payload};
  case "SET_EVENT_PRICE":
    return {...state, itemPrice: payload} 
  default:
    return state
  }
}

