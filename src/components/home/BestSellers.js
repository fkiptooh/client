import React, {useEffect, useState} from 'react';
import { getProducts } from '../../functions/product';
import LoadingCard from '../cards/LoadingCard';
import ProductCard from '../cards/ProductsCard';

const NewArrivals = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        loadAllProducts();
    }, []);

    const loadAllProducts =()=> {
        setLoading(true)
        getProducts("sold", "desc", 3)
        .then(res=>{
            setProducts(res.data);
            setLoading(false)
        })
    }
    return(
        <>
        <div className='container'>
           {loading? <LoadingCard count={3} /> : <div className='row'>
                {products.map((product)=>(
                    <div key={product._id} className='col-md-4 pb-3'>
                        <ProductCard product={product}/>
                    </div>
                ))}
            </div>}
        </div>
        </>
       
    );
};

export default NewArrivals;