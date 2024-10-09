import rootReducer from "./rootReducer";
import {createStore,applyMiddleware,compose} from 'redux'
import {thunk as reduxThunk} from 'redux-thunk'
const middleWare = [reduxThunk]
// const Tool = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const Tool = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store=createStore(rootReducer,Tool(applyMiddleware(...middleWare)))
// const store = createStore(rootReducer,Tool(applyMiddleware(...middleware)))

export default store