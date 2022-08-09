import {createStore} from "redux";
import RootReducer from "./RootReducer";
const data = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem("CartItems"))));

const initial ={
     CartReducer:{
          CartItems:data?data:[]
     }
 }
const Store  = createStore(RootReducer, 
     initial,
     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
export default Store;