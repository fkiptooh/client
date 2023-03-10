/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React,{useState} from "react";
import { Card,Tabs, Tooltip } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import laptop from '../../images/laptop.png'
import ProductListItems from "./ProductListItems";
import StarRatings from 'react-star-ratings';
import RatingModal from "../modal/RatingModal";
import { useSelector, useDispatch } from "react-redux";
import { showAverage } from "../../functions/ratings";
import _ from 'lodash';
import {addToWishlist} from '../../functions/user'
import { toast } from "react-toastify";

// child component to Product page
const SingleProduct = ({product, star, onStarRating}) => {
    const { title, images, description, _id } = product;
    const [tooltip, setTooltip] = useState("Add to cart");

    // redux
    const {user, cart} = useSelector((state)=> ({...state}));
    let navigate = useNavigate();

    const dispatch = useDispatch();

    const handleAddToCart =()=> {
        // create an array
        let cart = [];
        if(typeof window !== 'undefined'){
            // if the item is in the local storage then lets get it
            if(localStorage.getItem('cart')){
                cart = JSON.parse(localStorage.getItem('cart'));
            }
            // push new product to cart
            cart.push({
                ...product,
                count: 1,
            });
            // remove duplicates.
            let unique = _.uniqWith(cart, _.isEqual);
            // save it to the local storage 
            // console.log(`unique`, unique)
            localStorage.setItem('cart', JSON.stringify(unique));
            // tooltip
            setTooltip("Added");

            dispatch({
                type: "ADD_TO_CART",
                payload: unique,
            });

            // show cart slider.
            dispatch({
                type: "SET_VISIBLE",
                payload: true,
            });
        }
    }
    
    // const tabs = new Array(2).fill(null).map((_, i) => {
    //     const id = String(i + 1).toString();
    //     return {
    //         label: i === 0 ? "Description" : "More",
    //         key: id,
    //         children: i === 0 ? [description] : "Contact us on XXXX XXXX XXXX for more information on the product"
    //     };
    // });

    const tabs = [
        {
            label: "Description",
            key: "1",
            children: [description],
        },
        {
            label: "More",
            key: "2",
            children: "Contact us on XXXX XXXX XXXX for more information on the product"
        },
        {
            label: "Comments",
            key: "3",
            children: "Here are some of the customer comments...",
          },
    ];

    const handleAddToWishlist=e=>{
        e.preventDefault();
        addToWishlist(product._id, user.token).then(res=>{
            // console.log("WISHLIST RES DATA--->", res.data);
            toast.success("Added to Wishlist")
            navigate("/user/wishlist")
        })

    }

    return(
        <>
            <div className="col-md-7">
                {images && images.length ? <Carousel showArrows={true} autoPlay infiniteLoop>
                    {images && images.map((i)=> <img src={i.url} key={i.public_id}/>)}
                </Carousel> :
                <Card
                    cover={
                        <img 
                            src={laptop}
                            className="mb-3 card-image"
                        />
                    }
                ></Card>
                }
                {/* <Tabs type="card" items={tabs} const="true" /> */}
                <Tabs type="card" items={tabs}>
                    {tabs.map((tab) => (
                        <Tabs tab={tab.label} key={tab.key}>
                        {tab.children}
                        </Tabs>
                    ))}
                    </Tabs>

            </div>
            <div className="col-md-5">
                <h1 className="bg-info p-3">{title}</h1>
                {product && product.ratings && product.ratings.length > 0 ?
                    showAverage(product) :
                    <div className="text-center pt-1 pb-3">No rating yet</div>
                }
                <Card
                    actions={[
                        <Tooltip title={tooltip}>
                            <a onClick={handleAddToCart}>
                            <ShoppingCartOutlined className="text-danger"/> 
                            <br/> Add to Cart
                            </a>
                        </Tooltip>,
                        <a onClick={handleAddToWishlist}><HeartOutlined className="text-warning"/> <br/>
                            Add to WhishList
                        </a>,
                        <RatingModal>
                            <StarRatings 
                                name={_id}
                                changeRating={onStarRating}
                                rating={star}
                                numberOfStars={5}
                                isSelectable={true}
                                starRatedColor="red"
                            />
                        </RatingModal>
                    ]}
                >
                    <ProductListItems product={product}/>
                </Card>
            </div>
        </>
    )
}

export default SingleProduct;
