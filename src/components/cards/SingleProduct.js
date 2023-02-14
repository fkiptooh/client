/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Card,Tabs } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import laptop from '../../images/laptop.png'
import ProductListItems from "./ProductListItems";
import StarRatings from 'react-star-ratings';

const { TabPane } = Tabs;



const SingleProduct =({product})=> {

    const { title, images, description, _id } = product
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
                <Tabs type="card">
                    <TabPane tab='Description' key="1">
                        {description && description}
                    </TabPane>
                    <TabPane tab="More" key="2">
                        Contact us on XXXX XXXX XXXX for more information on the product
                    </TabPane>
                </Tabs>
            </div>
            <div className="col-md-5">
                <h1 className="bg-info p-3">{title}</h1>
                <StarRatings 
                    name={_id}
                    rating={2}
                    numberOfStars={5}
                    changeRating={(newRating, name)=> 
                    console.log('newRating', newRating, "name", name)}
                    isSelectable={true}
                    starRatedColor="red"
                />
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
                </Card>
            </div>
        </>
    )

}

export default SingleProduct;