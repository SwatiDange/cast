import UserData from "./reducer";
import {combineReducers} from 'redux'

const rootReducer=combineReducers({
    data : UserData
})
export default rootReducer