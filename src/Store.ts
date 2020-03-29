import {applyMiddleware, combineReducers, createStore, Store} from 'redux'
import thunk from 'redux-thunk'
import {productsReducer} from "./ProductReducers"
import {basketReducer} from "./redux/basket/basketReducer"
import {IBasketState} from "./redux/basket/basketTypes"
import {IProductState} from './ProductTypes'

export interface IStoreState{
    products : IProductState,
    basket : IBasketState
}

const rootReducer = combineReducers<IStoreState>({
    products : productsReducer,
    basket : basketReducer
})

export default function configureStore() : Store<IStoreState> {
    const store = createStore(rootReducer, undefined, applyMiddleware(thunk));
    return store;
}