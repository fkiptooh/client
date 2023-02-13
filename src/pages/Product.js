import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../functions/product";

const Product =()=> {
    const [product, setProduct] = useState({})

    const {slug} = useParams();

    useEffect(()=> {
        loadProduct();
    }, [slug]);

    const loadProduct=()=>  getProduct(slug).then((res)=> setProduct(res.data))

    return <>
    {JSON.stringify(product)}
    </>

}
export default Product;
