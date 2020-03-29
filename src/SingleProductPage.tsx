import React from "react";
import { connect } from "react-redux";
import { addToBasket } from "./redux/basket/basketActions";
import { fetchSingle } from "./ProductActions";
import { IStoreState } from "./Store";
import { RouteComponentProps, useParams } from "react-router-dom";
import { IProduct, products } from "./ProductData";
import Product from "./Product";

interface IProps extends RouteComponentProps<{ id: string }> {
  loading: boolean;
  product?: IProduct;
  added: boolean;
  addToBasket: typeof addToBasket;
  fetchSingle: typeof fetchSingle;
}

const SingleProductPage: React.FC<IProps> = props => {
  const { id: productID } = useParams();

  React.useEffect(() => {
    if (productID) {
      props.fetchSingle(productID);
    }
  }, []);

  const handleAddClick = () => {
    if (props.product) props.addToBasket(props.product);
  };

  const { product, added, loading } = props;
  return (
    <div className="page-container">
      {product || loading ? (
        <Product
          product={product}
          inBasket={added}
          loading={loading}
          onAddToBasket={handleAddClick}
        />
      ) : (
        <p>Product not found </p>
      )}
    </div>
  );
};

const mapStateToProps = (store: IStoreState) => {
  return {
    basketProducts: store.basket.products,
    loading: store.products.productsLoading,
    product: store.products.currentProduct || undefined,
    added: store.basket.products.some(p =>
    store.products.currentProduct ? p.id ===
    store.products.currentProduct.id : false)
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    addToBasket: (product: IProduct) => dispatch(addToBasket(product)),
    fetchSingle: (id: number) => dispatch(fetchSingle(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleProductPage)
