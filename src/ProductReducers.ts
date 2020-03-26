import {Reducer} from "redux"
import {IProductState, ProductsActions, ProductsActionTypes} from "./ProductTypes"

const initialProductState : IProductState = {
    products : [],
    productsLoading : false
}

export const productsReducer : Reducer<IProductState, ProductsActions> = (
    state = initialProductState!,
    action
) => {
    switch(action.type){
        case ProductsActionTypes.FETCHALL : {
            return {
                ...state, 
                products : action.products,
                productsLoading : false
            }
        }
        case ProductsActionTypes.LOADING : {
            return {
                ...state, productsLoading : true
            }
        }
        default : 
            return state;
        
    }
}