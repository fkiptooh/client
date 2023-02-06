import React,{useState, useEffect} from "react";
import AdminNav from "../../../components/nav/AdminNav";
import {toast} from "react-toastify";
import { useSelector } from "react-redux";
import { getCategories } from "../../../functions/category";
import {createSubcategory, getSubcategories, removeSubcategory, getSubcategory} from "../../../functions/subcategory"
import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";

const SubCategory =()=>{
    const [name, setName] = useState('');
    const [loading, setLoading]= useState(false);
    const {user} = useSelector((state)=>({...state}))
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('');
    const [subcategories, setSubcategories] = useState([]);

    // creating a search/filter functionality
    // step 1
    const [keyword, setKeyword] = useState([]);

    useEffect(()=>{
        loadCategories();
        loadSubcategories();
    },[]);

    const loadCategories =()=>
        getCategories().then((c)=>setCategories(c.data));

    const loadSubcategories =()=>
        getSubcategories().then((s)=>setSubcategories(s.data));
    
    const handleRemove=async(slug)=>{
        // let answer = window.confirm('Delete?')
        // console.log(answer, slug);
        if(window.confirm("Delete?")){
            setLoading(true);
            removeSubcategory(slug, user.token)
            .then(res=>{
                setLoading(false)
                toast.error(`${res.data.name} is deleted`)
                loadSubcategories();
            })
            .catch((err)=>{
                if(err.response.status===400){
                    setLoading(false)
                    toast.error(err.response.data)
                };
            })

        }
    }
    

    const handleSubmit=(e)=>{
        e.preventDefault();
        setLoading(true);
        createSubcategory({name, parent: category}, user.token)
        .then(res=>{
            setLoading(false)
            setName('')
            toast.success(`"${res.data.name}" is created`)
            loadSubcategories();
        })
        .catch((err)=>{
            setLoading(false)
            if(err.response.status===400) toast.error(err.response.data);
        });
    }

    // step 4
    const searched =(keyword)=> (c)=>c.name.toLowerCase().includes(keyword);
    return(
        <div className="container-fluid">
        <div className="row">
            <div className="col-md-2">
                <AdminNav/>
            </div>
            <div className="col-md-10">
                {loading? <h4 className="text-danger">Loading</h4>: <h4>Create Sub-Category</h4>}
                <div className="form-group">
                    <label>Parent Category</label>
                    <select 
                        name="category" 
                        className="form-control"
                        onChange={(e)=>setCategory(e.target.value)}
                        >
                        <option>Please Select Category</option>
                        {categories.length>0 && 
                            categories.map((c)=>
                            (<option 
                                key={c._id} 
                                value={c._id}
                                >
                                {c.name}
                            </option>))
                        }
                    </select>
                </div>
                {/* {JSON.stringify(category)} */}
                <CategoryForm 
                    handleSubmit={handleSubmit}
                    name={name}
                    setName={setName}
                    />
                    {/* Step 2  and step 3 refactored to this component*/}
                    <LocalSearch keyword={keyword} setKeyword={setKeyword}/>
                {/* step 5 */}
                {subcategories.filter(searched(keyword)).map((s)=>(
                    <div key={s._id} className="alert alert-primary">
                        {s.name}
                        <span 
                            onClick={()=> handleRemove(s.slug)} 
                            className="btn btn-sm float-right">
                            <DeleteOutlined className="text-danger"/>
                        </span>
                        <Link to={`/admin/subcategory/${s.slug}`}>
                            <span className="btn btn-sm float-right">
                                <EditOutlined className="text-warning"/>
                            </span>
                        </Link>
                    </div>
                    
                ))}
            </div>
        </div>
    </div>
    )

}

export default SubCategory;