import React from 'react'
import {RouteComponentProps, useParams} from 'react-router-dom'
import {IProduct, products, getProduct} from './ProductData'
import Product from "./Product"

type Props = RouteComponentProps<{id: string}>

interface IState {
    product ?: IProduct,
    added : boolean;
    loading : boolean
}

const SingleProductPage = (props : Props) => {
    const [state , setState] = React.useState<IState>({added : false, loading : true})

    const {id : productID} = useParams();

    React.useEffect(() => {
        if(productID){
            const id : number = parseInt(productID);
                (async() => {
                const product = await getProduct(id);
                let newStateObject = state;
                if(product){
                    newStateObject = {...state, product, loading : false}
                }else{
                    newStateObject = {...state, loading : false}
                }
                setState(newStateObject)                
            })();
        }
    }, [])

    const handleAddClick = () => {
        setState({...state,added : true})
    }

    const {product, added, loading} = state;
    return (
        <div className="page-container">
           {product || loading ? ( 
               <Product
                product={product}
                inBasket={added}
                loading={loading}
                onAddToBasket={handleAddClick}
               />
           ): (
               <p>Product not found </p>
           )} 
        </div>
    )
}

export default SingleProductPage