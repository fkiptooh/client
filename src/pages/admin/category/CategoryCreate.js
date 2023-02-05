import React,{useState, useEffect} from "react";
import AdminNav from "../../../components/nav/AdminNav";
import {toast} from "react-toastify";
import { useSelector } from "react-redux";
import {createCategory, getCategories, removeCategory} from "../../../functions/category"
import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import CategoryForm from "../../../components/forms/CategoryForm";

const CategoryCreate =()=>{
    const [name, setName] = useState('');
    const [loading, setLoading]= useState(false);
    const {user} = useSelector((state)=>({...state}))
    const [categories, setCategories] = useState([]);

    // creating a search/filter functionality
    // step 1
    const [keyword, setKeyword] = useState("");

    useEffect(()=>{
        loadCategories();
    },[]);

    const loadCategories =()=>
        getCategories().then((c)=>setCategories(c.data));
    
    const handleRemove=async(slug)=>{
        // let answer = window.confirm('Delete?')
        // console.log(answer, slug);
        if(window.confirm("Delete?")){
            setLoading(true);
            removeCategory(slug, user.token)
            .then(res=>{
                setLoading(false)
                toast.error(`${res.data.name} is deleted`)
                loadCategories()
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
        createCategory({name}, user.token)
        .then(res=>{
            setLoading(false)
            setName('')
            toast.success(`"${res.data.name}" is created`)
            loadCategories()
        })
        .catch((err)=>{
            setLoading(false)
            if(err.response.status===400) toast.error(err.response.data);
        });
    }

    // step 3
    const handleSearchChange =(e)=>{
        e.preventDefault();
        setKeyword(e.target.value.toLowerCase());
    }

    // step 4
    const searched =(keyword)=> (c)=>c.name.toLowerCase().includes(keyword);
    return(
        <div className="container-fluid">
        <div className="row">
            <div className="col-md-2">
                <AdminNav/>
            </div>
            <div className="col">
                {loading? <h4 className="text-danger">Loading</h4>: <h4>Create Category</h4>}
                <CategoryForm 
                    handleSubmit={handleSubmit}
                    name={name}
                    setName={setName}
                    />
                    {/* Step 2 */}
                    <input 
                        type="text"
                        placeholder="Filter"
                        value={keyword}
                        onChange={handleSearchChange}
                        className="form-control mb-4"
                    />
                <hr />
                {/* step 5 */}
                {categories.filter(searched(keyword)).map((c)=>(
                    <div key={c._id} className="alert alert-primary">
                        {c.name}
                        <span 
                            onClick={()=> handleRemove(c.slug)} 
                            className="btn btn-sm float-right">
                            <DeleteOutlined className="text-danger"/>
                        </span>
                        <Link to={`/admin/category/${c.slug}`}>
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

export default CategoryCreate;