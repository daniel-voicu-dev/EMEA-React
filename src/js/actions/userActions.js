import axios from 'axios';
import store from "../store";

export function getStepOne(history, email) {
  return (dispatch) => {   
    axios.get("resources/getStart.json").then(r=>{     
      let isUser = r.data.Login === email;  // FOR DEVELOPMENT ONLY MUST BE DELEATED
      if (isUser) {
        let email = r.data.Login;
        let domain = "@" + email.split("@")[1];
        dispatch({type: "FETCH_EMAIL_FULFILLED", payload: email});
        dispatch({type: "FETCH_DOMAIN_FULFILLED", payload: domain});
        history.push("/login");
      } else {
        let domain = "@" + email.split("@")[1];
        dispatch({type: "FETCH_EMAIL_FULFILLED", payload: email});
        dispatch({type: "FETCH_DOMAIN_FULFILLED", payload: domain});
        history.push("/create-user");
      }
    })
  }
}

export function getUser(history, email, password) {
  return (dispatch) => {   
    axios.get("resources/getUser.json").then(r=>{
      let isUser = r.data.filter(x=>x.Email === email && x.Password === password).length > 0;     
      if (isUser) {       
        dispatch({type: "FETCH_USER_FULFILLED", payload: r.data.filter(x=> {return x.Email === email && x.Password === password})[0]});
        dispatch({type: "ERROR_RESET", payload: ""});
        history.push("/pick-company");
      } else {              
        dispatch({type: "ERROR_CREDENTIALS_UPDATE", payload: "Wrong credentials. Please try again."});
      }
    })
  }
}