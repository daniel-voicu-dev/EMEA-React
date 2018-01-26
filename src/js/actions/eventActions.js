import axios from 'axios';
import store from "../store";

export function setEvent(o) {
  return (dispatch) => {       
    dispatch({type: "SET_EVENT_FULFILLED", payload: o});
  }

}
