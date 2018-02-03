import { combineReducers } from "redux"

import user from "./userReducers"
import event from "./eventReducers"
import order from "./orderReducers"

export default combineReducers({event,user, order})