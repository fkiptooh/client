import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { getSubcategories } from '../../functions/subcategory';

const SubCategoryList=()=> {
    const [subcategories, setSubCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=> {
        setLoading(true)
        getSubcategories().then(res=> setSubCategories(res.data));
        setLoading(false);  
    }, []);

    const showSubCategory =()=>  subcategories.map((s)=>
        (<div key={s.slug} className="col btn btn-outlined-primary btn-lg btn-block btn-raised m-3">
            <Link to={`/subcategory/${s.slug}`}>{s.name}</Link>
        </div>)
    )

    return(
        <div className="container">
            <div className="row">
                {loading ? <h4 className="text-danger">Loading...</h4> : showSubCategory()}
            </div>
        </div>
    )

}

export default SubCategoryList;