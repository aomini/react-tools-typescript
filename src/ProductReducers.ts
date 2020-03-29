import {Reducer} from "redux"
import {IProductState, ProductsActions, ProductsActionTypes} from "./ProductTypes"

const initialProductState : IProductState = {
    products : [],
    productsLoading : false,
    currentProduct : null
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
        case ProductsActionTypes.FETCHSINGLE : {
            return {
                ...state, 
                currentProduct : action.product,
                productsLoading : false
            }
        }
        default : 
            return state;
        
    }
}