import { Reducer } from "redux";
import { IBasketState, BasketActions, BasketActionsTypes } from "./basketTypes";

const initialState: IBasketState = {
  products: []
};

export const basketReducer: Reducer<IBasketState, BasketActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case BasketActionsTypes.ADD:
      return { ...state, products: state.products.concat(action.product) };
    default:
      return state || initialState;
  }
};
