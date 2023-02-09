import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { getProductsByCount } from "../../../functions/product";
import AdminProductCard from "../../../components/cards/AdminProductCard";
import { removeProduct } from "../../../functions/product";
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const AllProducts =()=>{
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state)=> ({...state}));

    useEffect(()=>{
        loadAllProduct();
    }, []);

    const loadAllProduct =()=> {
        setLoading(true)
        getProductsByCount(100)
        .then(res=> {
            setProducts(res.data)
            setLoading(false)
        })
        .catch((err)=> {
            console.log(err)
            setLoading(false)
        })
    }

    const handleRemove =(slug)=> {
        // let answer = window.confirm('Delete?');
        if(window.confirm('Delete?')){
            // console.log("Send delete request", slug);
            removeProduct(slug, user.token)
            .then((res)=> {
                loadAllProduct();
                toast.error(`${res.data.title} has been deleted`);
            })
            .catch((err)=> {
                if(err.response.data === 400) toast.error(err.response.data);
                console.log(err)
            })
        }
    }
    return(
        <div className="container-fluid">
        <div className="row">
            <div className="col-md-2">
                <AdminNav/>
            </div>
            <div className="col">
            {loading ? (<h4 className="text-danger">Loading...</h4>) : (<h4>All Products</h4>)}
               <div className="row">
                {products.map((product)=>(
                    <div className="col-md-4 pb-3" key={product._id}>
                        <AdminProductCard product={product} handleRemove={handleRemove}/>
                    </div>
                ))}
               </div>
        </div>
    </div>
    </div>
    )

}

export default AllProducts;