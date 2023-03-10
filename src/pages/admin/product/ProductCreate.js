import React,{useState, useEffect} from "react";
import AdminNav from "../../../components/nav/AdminNav";
import {toast} from "react-toastify";
import { useSelector } from "react-redux";
import {createProduct} from "../../../functions/product"
import { getCategories, getSubcategory } from "../../../functions/category";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import FileUpload from "../../../components/forms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";

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
    brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS", "HP", "DELL"],
    color: '',
    brand: ''
}

const ProductCreate =()=> {
    const[values, setValues] = useState(initialState);
    const[subcategoryOption, setsubcategoryOption] = useState([]);
    const[showSubcategories, setShowsubcatecories] = useState(false);
    const[loading, setLoading]= useState(false);

    // redux
    const {user} =  useSelector((state)=>({...state}));

    useEffect(()=>{
        loadCategories();
    },[]);

    const loadCategories =()=>
        getCategories().then((c)=>setValues({...values, categories: c.data}));

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
    const handleCategoryChange =(e)=> {
        e.preventDefault();
        console.log(`Clicked Category `, e.target.value)
        setValues({...values, subcategory: [], category: e.target.value })
        getSubcategory(e.target.value)
        .then(res=>{
            console.log("Sub categoty clicked", res)
            setsubcategoryOption(res.data);
        });
        setShowsubcatecories(true)
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
                     {/* {JSON.stringify(values.images)} */}
                    {/* {JSON.stringify(values.categories)} */}
                    {loading? <LoadingOutlined className="text-warning h1" /> :
                   
                    <div className="p-3">
                        <FileUpload
                            values={values}
                            setValues={setValues}
                            setLoading={setLoading}
                        />
                    </div>
                    }
                    <ProductCreateForm 
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        values={values}
                        handleCategoryChange={handleCategoryChange}
                        subcategoryOption={subcategoryOption}
                        showSubcategories={showSubcategories}
                        setValues={setValues}/> 
                </div>
            </div>
        </div>
    )

}
export default ProductCreate;