import React,{useState, useEffect} from "react";
import AdminNav from "../../../components/nav/AdminNav";
import {toast} from "react-toastify";
import { useSelector } from "react-redux";
import {updateCategory, getCategory} from "../../../functions/category"
// import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import CategoryForm from "../../../components/forms/CategoryForm";


const CategoryUpdate =()=>{
    const [name, setName] = useState('');
    const [loading, setLoading]= useState(false);
    const {user} = useSelector((state)=>({...state}))
    const navigate = useNavigate();

    let {slug} = useParams();

    useEffect(()=>{
        // console.log(slug);
        loadCategory()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const loadCategory =()=>
        getCategory(slug).then((c)=>setName(c.data.name));
    

    

    const handleSubmit=(e)=>{
        e.preventDefault();
        setLoading(true);
        updateCategory(slug, {name}, user.token)
        .then(res=>{
            setLoading(false)
            setName('')
            toast.success(`"${res.data.name}" is updated`)
            navigate("/admin/category")
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
            <div className="col">
                {loading? <h4 className="text-danger">Loading</h4>: <h4>Update Category</h4>}
                <CategoryForm
                    handleSubmit={handleSubmit}
                    name={name}
                    setName={setName}
                />
                <hr />
            </div>
        </div>
    </div>
    )

}

export default CategoryUpdate;