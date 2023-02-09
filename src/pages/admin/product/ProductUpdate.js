import React,{useState, useEffect} from "react";
import AdminNav from "../../../components/nav/AdminNav";
import {toast} from "react-toastify";
import { useSelector } from "react-redux";
import {createProduct} from "../../../functions/product"
import { getCategories, getSubcategory } from "../../../functions/category";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import FileUpload from "../../../components/forms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";

const ProductUpdate =()=> {

    let {slug} = useParams()

    // redux
    const {user} =  useSelector((state)=>({...state}));

    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-10">
                    <h4>Update Product</h4>
                    {JSON.stringify(slug)}
                    <hr/>
                </div>
            </div>
        </div>
    )

}
export default ProductUpdate;