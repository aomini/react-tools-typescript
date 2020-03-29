import React from 'react'
import {Link} from 'react-router-dom'
import { IProduct } from './ProductData'
import withLoader from './withLoader'

interface IProps{
    products ?: IProduct[];
    search : string
}

const ProductList : React.FC<IProps> = (props) => {
    const {search, products} = props;
    return (
       <ul className="product-list">
        {products && products
          .filter(x => x.name.toLowerCase().includes(search.toLowerCase()))
          .map(product => (
            <li key={product.id} className="product-list-item">
              <Link to={`/products/${product.id}`}>{product.name}</Link>
            </li>
        ))}
      </ul> 
    );
}

export default withLoader(ProductList)