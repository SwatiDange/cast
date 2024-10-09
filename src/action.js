import {INSERTUSER,UPDATEUSER,DELETEUSER,FINDUSER,DISPLAYUSER} from './actionType'

const getUsersFromLocalStorage = () => {
    const users = localStorage.getItem("users");
    return users ? JSON.parse(users) : [];
  };
  

const setUsersFromLocalStorage=(users)=>{
    localStorage.setItem("users",JSON.stringify(users))
}


export const displayData=(users)=>({
    type : DISPLAYUSER,
    payload : users
})

export const DisplayUserss=()=>{
    return function(dispatch){
        const users = getUsersFromLocalStorage()
        dispatch(displayData(users))
    }
}

export const addData=()=>({
    type : INSERTUSER
})

export const AddUserss=(data)=>{
    return function(dispatch){
        const users = getUsersFromLocalStorage();
        users.push({...data,id:Date.now()})
        setUsersFromLocalStorage(users)
        dispatch(addData())
        dispatch(DisplayUserss())
    }
}

export const deleteData=()=>({
    type:DELETEUSER
})

export const DeleteUserss=(id)=>{
    return function(dispatch){
        const users = getUsersFromLocalStorage();
        const updateUsers = users.filter((user)=>user.id !== id)
        setUsersFromLocalStorage(updateUsers)
        dispatch(deleteData())
        dispatch(DisplayUserss())
    }
}

export const findData=(user)=>({
    type : FINDUSER,
    payload:user
})

export const FindUserss=({id,setName,setEmail,setPassword,setPhone})=>{
    return function(dispatch){
        const users = getUsersFromLocalStorage()
        const user = users.find((user)=>user.id === parseInt(id))
        if(user){
            dispatch(findData(user))
            setName(user.name)
            setEmail(user.email)
            setPhone(user.phone)
            setPassword(user.password)


        }else{
            console.error("User Not Found");
        }
    }
}


export const upadteData=()=>({
    type:UPDATEUSER
})

export const UpdateUserss=(id,data)=>{
    return function(dispatch){
        const users = getUsersFromLocalStorage()
        const updateUsers = users?.map((user)=>(user.id === parseInt(id) ? 
        {...user,...data} : user))
        setUsersFromLocalStorage(updateUsers)
        dispatch(upadteData())
        dispatch(DisplayUserss())
    }
}
