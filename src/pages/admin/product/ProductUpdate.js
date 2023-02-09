import React,{useState, useEffect} from "react";
import AdminNav from "../../../components/nav/AdminNav";
import {toast} from "react-toastify";
import { useSelector } from "react-redux";
import {getProduct} from "../../../functions/product"
import { getCategories, getSubcategory } from "../../../functions/category";
import FileUpload from "../../../components/forms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";

const initialState = {
    title: '',
    description:'',
    price: '',
    categories: '',
    category:'',
    subcategory: [],
    shipping:'',
    quantity:'',
    images: [],
    colors: ["Black", "Brown", "Silver", "White", "Blue"],
    brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS", "HP", "DELL"],
    color: '',
    brand: ''
}

const ProductUpdate =()=> {
    // state
    const[values, setValues] = useState(initialState);

    let {slug} = useParams()

    // redux
    const {user} =  useSelector((state)=>({...state}));

    useEffect(()=>{
        loadProduct();
    }, []);

    const loadProduct=()=>{
        getProduct(slug)
        .then(p=> {
            setValues({...values, ...p.data})
            // console.log(p)
        });
    }
    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-10">
                    <h4>Update Product</h4>
                    {JSON.stringify(values)}
                    <hr/>
                </div>
            </div>
        </div>
    )

}
export default ProductUpdate;