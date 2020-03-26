import {ActionCreator, AnyAction, Dispatch, Action} from "redux"
import {ThunkAction} from 'redux-thunk'
import {fetchProducts as fetchProductsFromApi} from './ProductData'
import {ProductsActionTypes, IProductsFetchAllAction, IProductsLoadingAction, IProductState} from "./ProductTypes"

const loading : ActionCreator<IProductsLoadingAction> = () :Action<ProductsActionTypes.LOADING> => {
    return {
        type : ProductsActionTypes.LOADING
    }
}

export const fetchProducts: 
ActionCreator<ThunkAction<Promise<AnyAction>, IProductState, null, IProductsFetchAllAction>> = () => {
    return async (dispatch : Dispatch) => {
        dispatch(loading())
        const products = await fetchProductsFromApi();
        return dispatch({
            products,
            type : ProductsActionTypes.FETCHALL
        })
    }
}