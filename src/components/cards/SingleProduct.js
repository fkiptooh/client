/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import laptop from '../../images/laptop.png'
import ProductListItems from "./ProductListItems";

const { Meta } = Card;


const SingleProduct =({product})=> {

    const { title, images} = product
    return(
        <>
            <div className="col-md-7">
                {images && images.length ?<Carousel showArrows={true} autoPlay infiniteLoop>
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
            </div>
            <div className="col-md-5">
                <h1 className="bg-info p-3">{title}</h1>
                <Card
                    actions={[
                        <>
                            <ShoppingCartOutlined className="text-success"/> <br /> Add to Cart
                        </>,
                        <Link to={`/`}><HeartOutlined className="text-warning"/> <br/>
                            Add to WhishList
                        </Link>
                    ]}
                >
                    <ProductListItems product={product}/>
                    {/* <Meta title={title} description={description}/> */}
                    {/* <p>Price/ category/ subcategory/ shipping/color/quantity/brand/sold/availability</p> */}
                </Card>
            </div>
        </>
    )

}

export default SingleProduct;