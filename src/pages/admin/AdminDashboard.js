import React, { useEffect, useState } from "react";
import AdminNav from "../../components/nav/AdminNav";
import { getProductsByCount } from "../../functions/product";

const AdminDashboard =()=>{
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

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
    return(
        <div className="container-fluid">
        <div className="row">
            <div className="col-md-2">
                <AdminNav/>
            </div>
            {loading ? (<h4 className="text-danger">Loading...</h4>) : (<h4>All Products</h4>)}
            <div className="col">{JSON.stringify(products)}</div>
        </div>
    </div>
    )

}

export default AdminDashboard;