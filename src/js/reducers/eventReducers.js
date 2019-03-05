import {eventConfiguration , validationErrors} from "../actions/variables.js"
export default function counter(state = {
  "EventNo": "",
  "EventName": "",
  "ItemNo": "",
  "ItemDescription": "",
  "UnitPrice": null,
  "Currency": eventConfiguration.Currency,
  "Culture": eventConfiguration.Culture,
  "FillInFields": validationErrors.FillInFields,
  "EventItems": []
}, {type,payload}) {   
  switch (type) {   
  case "SET_EVENT":
    return {...state, ...payload};  
  case "SET_EVENT_ITEMS":
    return {...state, EventItems: [...state.EventItems,...payload]}    
  default:
    return state
  }
}

