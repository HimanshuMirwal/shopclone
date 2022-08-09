import {ADD_TO_CART,REMOVE_TO_CART}  from "./Actions/Action"; 

const initial ={
    CartItems:[],
}
export const CartReducer = (state=initial, action)=>{
    switch (action.type){
        case ADD_TO_CART:
            return {
                ...state,
                CartItems:[action.payload,...state.CartItems]
            }
        case REMOVE_TO_CART:

                const data = state.CartItems.filter(product=>product.tempId!==action.payload);
                console.log(action);
                return {
                    ...state,
                    CartItems:data
                }
        default :
        return state;
    }
} 