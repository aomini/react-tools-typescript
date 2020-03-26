import {IProduct } from './ProductData'

export enum ProductsActionTypes {
    FETCHALL = "PRODUCTS/FETCHALL",
    LOADING = "PRODUCTS/LOADING"
}

export interface IProductsFetchAllAction{
    type : ProductsActionTypes.FETCHALL,
    products : IProduct[]
}

export interface IProductsLoadingAction{
    type : ProductsActionTypes.LOADING
}

export type ProductsActions = IProductsFetchAllAction | IProductsLoadingAction

export interface IProductState{
    readonly products : IProduct[],
    readonly productsLoading: boolean
}