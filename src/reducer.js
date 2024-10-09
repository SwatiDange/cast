
import {INSERTUSER,UPDATEUSER,DELETEUSER,FINDUSER,DISPLAYUSER} from './actionType'
const initailzeValue = {
    users : [],
    user : {}
}
const UserData=(state = initailzeValue.users , action)=>{
    switch(action.type){
        case INSERTUSER:{
            return{
                ...state
            }
        }
        case UPDATEUSER:{
            return{
                ...state
            }
        }
        case DISPLAYUSER:{
            return{
                ...state,
                users : action.payload
            }
        }
        case FINDUSER:{
            return{
                ...state,
                user: action.payload
            }
        }
        case DELETEUSER:{
            return{
                ...state
            }
        }
        default:{
            return state
        }
    }
}
export default UserData
