import {ActionCreator, AnyAction, Dispatch, Action} from "redux"
import {ThunkAction} from 'redux-thunk'
import {fetchProducts as fetchProductsFromApi, getProduct as fetchProductFromApi} from './ProductData'
import {ProductsActionTypes, IProductsFetchAllAction, IProductFetchSingle, IProductsLoadingAction, IProductState} from "./ProductTypes"

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

export const fetchSingle : ActionCreator<ThunkAction<Promise<any>, IProductState, null, IProductFetchSingle>> = (id: number) => {
    return async (dispatch : Dispatch) => {
        dispatch(loading())
        const product = await fetchProductFromApi(id);
        dispatch({
            product, 
            type : ProductsActionTypes.FETCHSINGLE
        })
    }
}