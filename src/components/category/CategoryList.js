import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { getCategories } from '../../functions/category';

const CategoryList=()=> {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=> {
        setLoading(true)
        getCategories().then(res=> setCategories(res.data));
        setLoading(false);  
    }, []);

    const showCategory =()=>  categories.map((c)=>
        (<div key={c.slug} className="col btn btn-outlined-primary btn-lg btn-block btn-raised m-3">
            <Link to={`/category/${c.slug}`}>{c.name}</Link>
        </div>)
    )

    return(
        <div className="container">
            <div className="row">
                {loading ? <h4 className="text-danger">Loading...</h4> : showCategory()}
            </div>
        </div>
    )

}

export default CategoryList;