export default function counter(state = {

  eventDescription:"EMEA AMERICA DESCRIPTION",
  eventName:"EMEA AMERICA",
  eventNo:"EVT_00006",
  itemDescription:"EMEA AMERICA ITEM1 DESCRIPTION",
  itemNo:"22_ITEMDEM",
  itemPrice: 124.3

}, {type,payload}) {   
  switch (type) {   
  case "SET_EVENT_FULFILLED":
    return payload;
  case "SET_EVENT_PRICE":
    return {...state, itemPrice: payload}  
  // case 'FETCH_EVENT_REJECTED':
  //   console.log("Loading event failed:");
  //   throw new Error(payload);    
  default:
    return state
  }
}

