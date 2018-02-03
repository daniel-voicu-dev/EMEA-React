import axios from 'axios';
import store from "../store";

export function setCompany(o) {
  return (dispatch) => {       
    dispatch({type: "SET_COMPANY", payload: o});
  }

}

export function addUserToOrder(o) {
  return (dispatch) => {       
    dispatch({type: "ADD_USER_TO_ORDER", payload: o});
  }

}