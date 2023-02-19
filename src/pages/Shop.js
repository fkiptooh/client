import React, {useState, useEffect} from "react";
import ProductCard from '../components/cards/ProductsCard';
import {getProductsByCount} from '../functions/product';
import { useSelector } from "react-redux";

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=> {
        loadAllProducts();
    },[]);

    const loadAllProducts = ()=> {
        getProductsByCount(6).then((p)=>{
            setProducts(p.data)
            setLoading(false)
        })
    }
    return(
        <div className="container fluid">
            <div className="row">
                <div className="col-md-3">
                    Search/Filter Menu
                </div>
                <div className="col-md-9">
                    {loading ? (<h4 className="text-danger">Loading...</h4>)
                    : (<h4>Products</h4>)}
                    {products.length < 1 && <p>No Products Found</p>}

                    <div className="row pb-5">
                        {products.map((p)=><div key={p._id} 
                        className="col-md-4 mt-3">
                            <ProductCard product={p}/>
                        </div>)}
                    </div>
                </div>
            </div>
        </div>
    )

}
export default Shop;