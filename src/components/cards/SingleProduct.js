/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { Card,Tabs } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import laptop from '../../images/laptop.png'
import ProductListItems from "./ProductListItems";
import StarRatings from 'react-star-ratings';
import RatingModal from "../modal/RatingModal";

const SingleProduct = ({product}) => {
    const { title, images, description, _id } = product;

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
                <Card
                    actions={[
                        <>
                            <ShoppingCartOutlined className="text-success"/> <br /> Add to Cart
                        </>,
                        <Link to={`/`}><HeartOutlined className="text-warning"/> <br/>
                            Add to WhishList
                        </Link>,
                        <RatingModal>
                            <StarRatings 
                                name={_id}
                                rating={2}
                                numberOfStars={5}
                                changeRating={(newRating, name)=> 
                                console.log('newRating', newRating, "name", name)}
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
