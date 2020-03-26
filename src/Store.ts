import {applyMiddleware, combineReducers, createStore, Store} from 'redux'
import thunk from 'redux-thunk'
import {productsReducer} from "./ProductReducers"
import {IProductState} from './ProductTypes'

export interface IStoreState{
    products : IProductState,
}

const rootReducer = combineReducers<IStoreState>({
    products : productsReducer
})

export default function configureStore() : Store<IStoreState> {
    const store = createStore(rootReducer, undefined, applyMiddleware(thunk));
    return store;
}