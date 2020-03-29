import {IProduct } from './ProductData'

export enum ProductsActionTypes {
    FETCHALL = "PRODUCTS/FETCHALL",
    LOADING = "PRODUCTS/LOADING",
    FETCHSINGLE = "PRODUCTS/FETCHSINGLE"
}

export interface IProductsFetchAllAction{
    type : ProductsActionTypes.FETCHALL,
    products : IProduct[]
}

export interface IProductsLoadingAction{
    type : ProductsActionTypes.LOADING
}

export interface IProductFetchSingle{
    type : ProductsActionTypes.FETCHSINGLE;
    product : IProduct
}

export type ProductsActions = IProductsFetchAllAction | IProductsLoadingAction | IProductFetchSingle

export interface IProductState{
    readonly products : IProduct[],
    readonly productsLoading: boolean,
    readonly currentProduct : IProduct | null
}