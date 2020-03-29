import {IBasketAdd, BasketActionsTypes} from "./basketTypes"
import { IProduct } from "../../ProductData"

export const addToBasket = (product : IProduct) : IBasketAdd => {
    return {
        type : BasketActionsTypes.ADD,
        product: product
    }
} 

