import React, {useEffect, useState} from 'react';
import { getCategory } from '../../functions/category';
import {Link, useParams} from 'react-router-dom';
import ProductCard from '../../components/cards/ProductsCard';

const CategoryHome =()=> {
    const [category, setCategory] =  useState({});
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);

    const {slug} = useParams();

    useEffect(()=> {
        setLoading(true);
        getCategory(slug).then(c => {
            console.log(JSON.stringify(c.data, null, 4));
            setCategory(c.data);
        });
    },[slug]);

    return<p>{slug}</p>

}
export default CategoryHome;