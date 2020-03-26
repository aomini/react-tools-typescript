import React from "react";
import { Link, useLocation, RouteComponentProps } from "react-router-dom";
import { IProduct, products as productsData } from "./ProductData";
import {connect} from "react-redux"
import {IStoreState} from './Store'
import {fetchProducts} from './ProductActions'

interface IProps extends RouteComponentProps{
  fetchProducts : typeof fetchProducts,
  loading : boolean,
  products : IProduct[]
}

const ProductPage: React.FC<IProps> = (props) => {
  const location = useLocation();

  React.useEffect(() => {
    props.fetchProducts();
  }, [location.search]);

  const searchParams = new URLSearchParams(location.search)
  const search = searchParams.get('search') || ""
  const {products} = props;

  return (
    <div className="page-container">
      <p>Welcome to React Shop. Buy your React tools.</p>
      <ul className="product-list">
        {products
          .filter(x => x.name.toLowerCase().includes(search.toLowerCase()))
          .map(product => (
            <li key={product.id} className="product-list-item">
              <Link to={`/products/${product.id}`}>{product.name}</Link>
            </li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = (store : IStoreState) => {
  return {
    loading : store.products.productsLoading,
    products : store.products.products
  }
}

const mapDispatchToProps = (dispatch : any) => {
  return {
    fetchProducts : () => dispatch(fetchProducts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
