import React, { useEffect, useState } from "react";
import AdminNav from "../../components/nav/AdminNav";
import { getProductsByCount } from "../../functions/product";
import AdminProductCard from "../../components/cards/AdminProductCard";
import { getOrders, changeStatus } from "../../functions/admin";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import Orders from "../../components/order/Orders";

const AdminDashboard =()=>{
    const [orders, setOrders] =useState([])
    const user = useSelector((state)=> ({...state.user}));

    useEffect(()=>{
        loadOrders()
    },[]);

    const loadOrders=()=>
        getOrders(user.token).then(res=>{
            setOrders(res.data);
        })
    
    const handleStatusChange =(orderId, orderStatus)=>{
        changeStatus(orderId, orderStatus, user.token).then(res=>{
            toast.success("Order Updated");
            loadOrders();
        })
    }  
    return(
        <div className="container-fluid">
        <div className="row">
            <div className="col-md-2">
                <AdminNav/>
            </div>
            <div className="col-md-10">
                <h4>AdminDashboard</h4>
                <Orders orders={orders} handleStatusChange={handleStatusChange}/>
               </div>
        </div>
    </div>
    )

}

export default AdminDashboard;