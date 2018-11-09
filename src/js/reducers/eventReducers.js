export default function counter(state = {
  "EventNo": "",
  "EventName": "",
  "ItemNo": "",
  "ItemDescription": "",
  "UnitPrice": null,
  "Currency": "USD",
  "Culture": "en-US"
}, {type,payload}) {   
  switch (type) {   
  case "SET_EVENT":
    return {...payload, "Currency": "USD", "Culture": "en-US"};
  case "SET_EVENT_PRICE":
    return {...state, itemPrice: payload} 
  default:
    return state
  }
}

