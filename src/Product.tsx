import React from "react";
import Tabs from "./Tabs";
import { IProduct } from "./ProductData";
import withLoader from "./withLoader"

interface IProps {
  product: IProduct;
  inBasket: boolean;
  onAddToBasket: () => void;
  loading ?: boolean
}

function Product(props: IProps) {
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
    </React.Fragment>
  );
}

export default withLoader(Product)
