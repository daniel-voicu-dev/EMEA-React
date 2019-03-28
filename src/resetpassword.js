var gEvent = {
  "label": "ASIA",
  "eventNo": "ASIA2019"
};

Noty.overrideDefaults({
  layout   : 'center',
  theme    : 'mint',
  timeout: 2000
  
});

function isValidEmail(value){
  if (value !== "") {
    // return value.indexOf("@") > 0 && value.indexOf(".") > 2 && value.length > 5 && value.indexOf(".") < value.length - 1 && value.indexOf("@") < value.lastIndexOf(".") - 1;
    return value.indexOf("@") > 0 && value.indexOf(".") > 0 && value.length > 5 && value.indexOf(".") < value.length - 1 && value.indexOf("@") < value.lastIndexOf(".") - 1;
  }
  return true;
}
function validateFormObj() {
  var collection = [];
  document.querySelectorAll("input").forEach(function(el){
    var obj = {
      "node": el,
      "value": el.value,
      "valid": false
    }
    if(el.attributes.id.value === "email") {
      obj.valid = obj.value !== "" && isValidEmail(obj.value);
      obj.message = "Email is invalid";
    }
    if(el.attributes.id.value === "password") {
      obj.valid = obj.value !== "";
      obj.message = "Old password field is empty";
    }
    if(el.attributes.id.value === "newPassword") {
      obj.valid = obj.value !== "" && obj.value !== document.getElementById("password").value;
      obj.message = "New password field is empty";
      if (!(obj.value !== "" && obj.value === document.getElementById("password").value)) {
        obj.message = "New password can't be the same as old password."
      }
    }       
    if(el.attributes.id.value === "confirmedNewPassword") {
      obj.valid = obj.value !== "" && obj.value === document.getElementById("newPassword").value;
      obj.message = "Confirmed password is different than new password."
    }
    return collection.push(obj);
  });
  return collection;
}

function isFormValid() {  
  return validateFormObj().filter(function(o){return o.valid === false}).length === 0;
}
function showValidationErrorWarnings() {
  var message = "";  
  validateFormObj().filter(function(o){return !o.valid}).map((function(o){
    message += o.message + "<br>";
    o.node.classList.add("is-invalid");
  }));

  new Noty({       
    text: message,       
    type: "info"
  }).show();
}

document.querySelectorAll("input").forEach(function(el){
  el.addEventListener("focusin", function(e){
    e.currentTarget.classList.remove("is-invalid");
  });
});

document.querySelectorAll("input").forEach(function(el){
  el.addEventListener("change", function(e){   
    if(el.attributes.id.value === "email") {
      if(e.currentTarget.value === "" && !isValidEmail(e.currentTarget.value)) {
        e.currentTarget.classList.add("is-invalid");
      }     
    } else {
      if(e.currentTarget.value === "") {
        e.currentTarget.classList.add("is-invalid");
      }      
    }    
  });
});

document.getElementById("action").addEventListener("click", function(e){
  e.preventDefault();
  
  if (!isFormValid()) {
    showValidationErrorWarnings();
    return false;
  }  
  
  var loginObj = {
    "Login": document.getElementById("email").value, 
    "Password": document.getElementById("password").value,
    "EventNo": gEvent.eventNo
  }

  var changePass = {
    "Login": document.getElementById("email").value,    
    "Password": document.getElementById("newPassword").value    
  }

  // var changePassTwo = {
  //   "Login": document.getElementById("email").value,
  //   "OldPassword": document.getElementById("password").value,
  //   "Password": document.getElementById("newPassword").value,
  //   "EventNo": gEvent.eventNo
  // }
   

  axios.post("/api/login", loginObj).then(function(r){       
    changePass.Token = r.data.Token;    
    return axios.post("/api/resetpassword", changePass);
  }).then(function(r){  
    location.href = "/RegistrationTest"; ///TO BE UPDATED
    // console.log("redirect to registration APP");
  }).catch(function(error){
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if(error.response.data.hasOwnProperty("ExceptionMessage")) {
        new Noty({       
          text: error.response.data.ExceptionMessage,       
          type: "info"
        }).show();
  
        if(error.response.data.ExceptionMessage.includes("password")){
          document.getElementById("password").classList.add("is-invalid");
        } 
        if(error.response.data.ExceptionMessage.includes("User")){
          document.getElementById("email").classList.add("is-invalid");
        } 
      }
        // console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
           
        // console.log(error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        //console.log('Error', error.message);
    }
  });

});