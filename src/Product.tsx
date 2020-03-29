import React from "react";
import { IProduct } from "./ProductData";
import Tabs from "./Tabs";
import withLoader from "./withLoader";

interface IProps {
  product: IProduct;
  inBasket: boolean;
  onAddToBasket: () => void;
  loading?: boolean;
}

interface ILikeState {
  likes: number;
  lastLike: Date | null;
}

const initialLikeState: ILikeState = {
  likes: 0,
  lastLike: null
};

enum LikeActionTypes {
  Like = "LIKE"
}

interface ILikeAction {
  type: LikeActionTypes;
  now: Date;
}

type LikeActions = ILikeAction;

const reducer = (state: ILikeState = initialLikeState, action: LikeActions) => {
  switch (action.type) {
    case LikeActionTypes.Like:
      return { ...state, likes: ++state.likes, lastLike: action.now };
    default:
      return state || initialLikeState;
  }
};

function Product(props: IProps) {
  const [{ likes, lastLike }, dispatch]: [
    ILikeState,
    (action: ILikeAction) => void
  ] = React.useReducer(reducer, initialLikeState);

  const handleLikeClick = () => {
    dispatch({
      type: LikeActionTypes.Like,
      now: new Date()
    });
  };

  const { product } = props;
  return (
    <React.Fragment>
      <h1>{product.name}</h1>
      <Tabs>
        <Tabs.Tab
          initialHeading={true}
          name="description"
          heading={() => <b>Description</b>}
        >
          This is a description
        </Tabs.Tab>
        <Tabs.Tab name="review" heading={() => "Review"}>
          this is a test review
        </Tabs.Tab>
      </Tabs>
      <p>{product.description}</p>
      <div>
        <ul className="product-review">
          {product.reviews.map(review => (
            <li key={review.reviewer} className="product-reviews-item">
              <i>"{review.comment}"</i> - {review.reviewer}
            </li>
          ))}
        </ul>
      </div>
      <p className="product-price">
        {new Intl.NumberFormat("en-US", {
          currency: "USD",
          style: "currency"
        }).format(product.price)}
        {!props.inBasket && (
          <button onClick={props.onAddToBasket}>Add to basket</button>
        )}
      </p>
      <div className="like-container">
        {likes > 0 && (
          <div>{`I like this x ${likes}, last at ${lastLike}`}</div>
        )}
        <button onClick={handleLikeClick}>
          {likes > 0 ? "Like again" : "Like"}
        </button>
      </div>
    </React.Fragment>
  );
}

export default withLoader(Product);
