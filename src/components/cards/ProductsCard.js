/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import laptop from '../../images/laptop.png'
import { Card, Tooltip } from 'antd'
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { showAverage } from "../../functions/ratings";
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

const {Meta} = Card

const ProductCard =({product})=> {
    const {title, description, images, slug, price} = product;
    const [tooltip, setTooltip] = useState("Add to cart");

    // redux
    const {user, cart} = useSelector((state)=> ({...state}));

    const dispatch = useDispatch();

    const handleAddToCart = () => {
        if (product.quantity > 0) {
          // create an array
          let cart = [];
          if (typeof window !== 'undefined') {
            // if the item is in the local storage then lets get it
            if (localStorage.getItem('cart')) {
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
      };
      
    return(<div>
               {product && product.ratings && product.ratings.length > 0 ?
                    showAverage(product) :
                    <div className="text-center pt-1 pb-3">No rating yet</div>
                }
            <Card
            // eslint-disable-next-line jsx-a11y/alt-text
            cover={<img src={images && images.length ? images[0].url : laptop}
                style={{height: '150px', objectFit: "cover"}}
                className="p-2"
            /> 
            }
            actions={[
                <Link to={`/product/${slug}`}>
                    <EyeOutlined className="text-warning"/> <br /> View Product
                </Link>, 
                <Tooltip title={tooltip}>
                    <a onClick={handleAddToCart} disabled={product.quantity < 1}>
                    <ShoppingCartOutlined className="text-danger"/> 
                    <br/> {product.quantity < 1 ? "Out of Stock" : "Add to Cart"}
                </a>
                </Tooltip>
            ]}
        >
            <Meta title={`${title} - Ksh ${price}`} description={`${description && description.substring(0, 100)}...`}/>
        </Card>
    </div>)

}

export default ProductCard;