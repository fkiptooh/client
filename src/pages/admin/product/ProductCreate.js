import React,{useState, useEffect} from "react";
import AdminNav from "../../../components/nav/AdminNav";
import {toast} from "react-toastify";
import { useSelector } from "react-redux";
import {createProduct} from "../../../functions/product"
import ProductCreateForm from "../../../components/forms/ProductCreateForm";

// creating an object to use in the state
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
    brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
    color: '',
    brand: ''
}

const ProductCreate =()=> {
    const[values, setValues] = useState(initialState);

    // redux
    const {user} =  useSelector((state)=>({...state}));

    // destructuring the object for state component.
    const handleSubmit=(e)=>{
        e.preventDefault();
        createProduct(values, user.token)
        .then(res=>{
            console.log(res)
            //toast.success(`${res.data.title} has been created`)
            window.alert(`"${res.data.title}" is created`);
            window.location.reload();
        })
        .catch(err=> {
            console.log(err)
            // if(err.response.status === 400) toast(err.response.data)
            toast.error(err.response.data.err);
        })
    };
    const handleChange=(e)=> {
        setValues({...values, [e.target.name]: e.target.value})
        // console.log(e.target.name, "------>", e.target.value)

    }
    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-10">
                    <h4>Create Product</h4>
                    <hr/>
                    {/* {JSON.stringify(values)} */}
                    <ProductCreateForm 
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        values={values}/> 
                </div>
            </div>
        </div>
    )

}
export default ProductCreate;