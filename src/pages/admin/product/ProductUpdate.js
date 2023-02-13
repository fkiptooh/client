import React,{useState, useEffect} from "react";
import AdminNav from "../../../components/nav/AdminNav";
import {toast} from "react-toastify";
import { useSelector } from "react-redux";
import {getProduct, updateProduct } from "../../../functions/product"
import { getCategories, getSubcategory } from "../../../functions/category";
import FileUpload from "../../../components/forms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";

const initialState = {
    title: '',
    description:'',
    price: '',
    // categories:'',
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
    const [values, setValues] = useState(initialState);
    const [subcategoryOption, setsubcategoryOption] = useState([])
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("")
    const [loading, setLoading] = useState("")
    const [arrayOfSubs, setArrayOfSubs] = useState([]);

    let {slug} = useParams()
    let navigate = useNavigate();

    // redux
    const {user} =  useSelector((state)=>({...state}));

    useEffect(()=>{
        loadProduct();
        loadCategories();
    }, []);

    const loadProduct=()=>{
        // getProduct(slug)
        // .then(p=> {
        //     // load a single product
        //     setValues({...values, ...p.data})
        //     // console.log(p)
        //     getSubcategory(p.data.category._id).then((res)=> {
        //         setsubcategoryOption(res.data);
        //     });
        // });
        getProduct(slug).then((p) => {
            // console.log("single product", p);
            // 1 load single proudct
            setValues({ ...values, ...p.data });
            // 2 load single product category subs
            getSubcategory(p.data.category._id).then((res) => {
              setsubcategoryOption(res.data); // on first load, show default subs
            });
            // 3 prepare array of sub ids to show as default sub values in antd Select
            let arr = [];
            p.data.subcategory.map((s) => {
              arr.push(s._id);
            });
            console.log("ARR", arr);
            setArrayOfSubs((prev) => arr); // required for ant design select to work
          });
    }
    const handleChange =(e)=>{
        setValues({...values, [e.target.name]: e.target.value})
    }
    const handleSubmit=(e)=> {
        e.preventDefault();
        setLoading(true);

       
    values.subcategory = arrayOfSubs;
    values.category = selectedCategory ? selectedCategory : values.category;
        

        updateProduct(slug, values, user.token)
        .then((res) => {
        setLoading(false);
        toast.success(`"${res.data.title}" is updated`);
        navigate("/admin/products");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error(err.response.data.err);
      });
    }
    const loadCategories =()=>
    getCategories().then((c)=>{
        setCategories(c.data)
        // setCategories({...values, categories: c.data})
    });

    const handleCategoryChange =(e)=> {
        e.preventDefault();
        // console.log(`Clicked Category `, e.target.value)
        setValues({...values, subcategory: []})

        setSelectedCategory(e.target.value);

        getSubcategory(e.target.value)
        .then(res=>{
            console.log("Sub categoty clicked", res)
            setsubcategoryOption(res.data);
        });
        // if admin return to the original product category, then reload the same subcategories for the product.
        if(values.category._id === e.target.value){
            loadProduct();
        }
        //setShowsubcatecories(true)
    }
    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-10">
                    <h4>Update Product</h4>
                    {loading? <LoadingOutlined className="text-warning h1" /> :
                   
                   <div className="p-3">
                       <FileUpload
                           values={values}
                           setValues={setValues}
                           setLoading={setLoading}
                       />
                   </div>
                   }
                    <ProductUpdateForm 
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        values={values}
                        handleCategoryChange={handleCategoryChange}
                        categories={categories}
                        subcategoryOption={subcategoryOption}
                        setValues={setValues}
                        selectedCategory={selectedCategory}
                        arrayOfSubs={arrayOfSubs}
                        setArrayOfSubs={setArrayOfSubs}
                    />
                    <hr/>
                </div>
            </div>
        </div>
    )

}
export default ProductUpdate;
