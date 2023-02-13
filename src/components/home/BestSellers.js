import { Pagination } from 'antd';
import React, {useEffect, useState} from 'react';
import { getProducts, getProductsCount } from '../../functions/product';
import LoadingCard from '../cards/LoadingCard';
import ProductCard from '../cards/ProductsCard';

const NewArrivals = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [productsCount, setProductsCount] = useState(0);
    const [page, setPage] = useState(1);

    useEffect(()=>{
        loadAllProducts();
    }, [page]);

    useEffect(()=> {
        getProductsCount().then((res)=> setProductsCount(res.data));
    }, [])

    let sum = parseInt(productsCount/3) * 10; 

    const loadAllProducts =()=> {
        setLoading(true)
        getProducts("sold", "desc", page)
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
        <Pagination
        className='text-center'
            current={page}
            total={sum}
            onChange={(value)=> setPage(value)}
         />
        </>
       
    );
};

export default NewArrivals;