import React, {useEffect, useState} from 'react';
import { getProductsByCount } from '../functions/product'
import ProductCard from '../components/cards/ProductsCard';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        loadAllProducts();
    }, []);

    const loadAllProducts =()=> {
        setLoading(true)
        getProductsByCount(5)
        .then(res=>{
            setProducts(res.data);
            setLoading(false)
        })
    }
    return(
        <>
         <div className='jumbotron'>
            {loading ? <h4>Loading</h4> : <h4>All Products</h4>}
            {/* {JSON.stringify(products)} */}
        </div>
        <div className='container'>
            <div className='row'>
                {products.map((product)=>(
                    <div key={product._id} className='col-md-4 pb-3'>
                        <ProductCard product={product}/>
                    </div>
                ))}
            </div>
        </div>
        </>
       
    );
};

export default Home;