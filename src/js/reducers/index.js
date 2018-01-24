import { combineReducers } from "redux"

import user from "./userReducers"
import event from "./eventReducers"
// import main from "./mainReducers"

export default combineReducers({event,user})