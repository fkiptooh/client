import React, {useEffect, useState} from 'react';
import { getSubcategory } from '../../functions/subcategory';
import {useParams} from 'react-router-dom';
import ProductCard from '../../components/cards/ProductsCard';

const SubCategoryHome =()=> {
    const [subCategory, setSubCategory] =  useState({});
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const {slug} = useParams();

    useEffect(()=> {
        setLoading(true);
        getSubcategory(slug).then(res => {
            console.log(JSON.stringify(res.data, null, 4));
            setSubCategory(res.data.subcategory);
            setProducts(res.data.products);
            setLoading(false)
        });
    },[slug]);

    return (
        <div className='container'>
            <div className="row">
                <div className="col">
                    {loading ? (
                        <h4 className='text-center p-3 mb-5 mt-5 jumbotron'>
                            Loading
                        </h4>
                    ) : (
                        <h4 className='text-center p-3 mb-5 mt-5 jumbotron'>
                            {products.length} Products in <b>{subCategory.name}</b> Sub Category
                        </h4>
                    )}
                </div>
            </div>
            <div className="row">
                {products.map((p)=> <div className='col' key={p._id}>
                    <ProductCard product={p}/>
                </div>)}
            </div>
        </div>
    )

}
export default SubCategoryHome;