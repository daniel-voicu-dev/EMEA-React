export default function counter(state = {

  eventDescription:"EMEA AMERICA DESCRIPTION",
  eventName:"EMEA AMERICA",
  eventNo:"EVT_00009",
  itemDescription:"EMEA AMERICA ITEM1 DESCRIPTION",
  itemNo:"EventAMERICAItem1",
  itemPrice:1000

}, {type,payload}) {   
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
