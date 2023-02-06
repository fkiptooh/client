import React,{useState, useEffect} from "react";
import AdminNav from "../../../components/nav/AdminNav";
import {toast} from "react-toastify";
import { useSelector } from "react-redux";
import { getCategories } from "../../../functions/category";
import {updateSubcategory, getSubcategory} from "../../../functions/subcategory"
import { Link, useNavigate } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";
import { useParams } from "react-router-dom";

const SubCategoryUpdate =()=>{
    const [name, setName] = useState('');
    const [loading, setLoading]= useState(false);
    const {user} = useSelector((state)=>({...state}))
    const [parent, setParent] = useState('');
    const [categories, setCategories] = useState([]);

    let {slug} = useParams();
    let navigate = useNavigate();

    useEffect(()=>{
        loadCategories();
        loadSubcategory()
    },[]);

    const loadCategories =()=>
        getCategories().then((c)=>setCategories(c.data));

    const loadSubcategory =()=>
        getSubcategory(slug).then((s)=>{
            setName(s.data.name);
            setParent(s.data.parent)
        });
    
    const handleSubmit=(e)=>{
        e.preventDefault();
        setLoading(true);
        updateSubcategory(slug, {name, parent}, user.token)
        .then(res=>{
            setLoading(false)
            setName('')
            toast.success(`"${res.data.name}" is updated created`)
            navigate("/admin/subcategory");
        })
        .catch((err)=>{
            setLoading(false)
            if(err.response.status===400) toast.error(err.response.data);
        });
    }

    return(
        <div className="container-fluid">
        <div className="row">
            <div className="col-md-2">
                <AdminNav/>
            </div>
            <div className="col-md-10">
                {loading? <h4 className="text-danger">Loading</h4>: <h4>Update Sub-Category</h4>}
                <div className="form-group">
                    <label>Parent Category</label>
                    <select 
                        name="category" 
                        className="form-control"
                        onChange={(e)=>setParent(e.target.value)}
                        >
                        <option>Please Select Category</option>
                        {categories.length>0 && 
                            categories.map((c)=>
                            (<option 
                                key={c._id} 
                                value={c._id}
                                selected={c._id === parent}
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
            </div>
        </div>
    </div>
    )

}

export default SubCategoryUpdate;