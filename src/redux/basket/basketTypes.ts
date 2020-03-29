import { IProduct } from "../../ProductData";

export enum BasketActionsTypes {
    ADD = "BASKET/ADD",
}

export interface IBasketState {
    readonly products : IProduct[]
}

export interface IBasketAdd {
    type : BasketActionsTypes.ADD,
    product : IProduct
}

export type BasketActions = IBasketAdd