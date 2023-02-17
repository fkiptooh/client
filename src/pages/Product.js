import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { getProduct, productStar, getRelated } from "../functions/product";
import SingleProduct from "../components/cards/SingleProduct";
import { useSelector } from "react-redux";
import ProductCard from "../components/cards/ProductsCard";

const Product =()=> {
    const [product, setProduct] = useState({})
    const [related, setRelated] = useState([]);
    const [star, setStar] = useState(0);
    // redux
    const { user } = useSelector((state)=> ({...state}));

    const {slug} = useParams();

    useEffect(()=> {
        loadProduct();
    }, [slug]);

    useEffect(()=>{
        if(product.ratings && user){
            let existingRatingObject = product.ratings.find(
                (ele) => ele.postedBy && ele.postedBy.toString() === user._id.toString()
              );
              existingRatingObject && setStar(existingRatingObject.star); // current logged in user star rating info
        }
    })

    const onStarRating =(newRating, name) => {
        setStar(newRating)
        // console.table(newRating, name);
        productStar(name, newRating, user.token).then((res) => {
            // setStar(newRating)
            console.log("rating clicked", res.data);
            loadProduct(); // if you want to show updated rating in real time
          });
    }

    const loadProduct=()=>  {
        getProduct(slug).then((res)=> {
            setProduct(res.data);
            // load related
            getRelated(res.data._id).then((res)=> setRelated(res.data));
        })
    }

    return <div className="container-fluid">
        <div className="row pt-4">
            <SingleProduct product={product} star={star} onStarRating={onStarRating}/>
        </div>
        <div className="row">
            <div className="col text-center pt-5 pb-5">
                <hr/>
                Related products
                <hr />
                {/* {JSON.stringify(related)} */}
            </div>
        </div>
        <div className="row pb-5">
            {related.length ? related.map((r)=>
            <div className="col-md-4" key={r._id}><ProductCard product={r}/></div> ) : <div className="text-center">No products yet</div>}
        </div>
    </div>

}
export default Product;
