import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const { Meta } = Card;


const SingleProduct =({product})=> {

    const { title, description, images, slug } = product
    return(
        <>
            <div className="col-md-7">
                <Carousel showArrows={true} autoPlay infiniteLoop>
                    {images && images.map((i)=> <img src={i.url} key={i.public_id}/>)}
                </Carousel>
            </div>
            <div className="col-md-5">
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
                    <Meta title={title} description={description}/>
                    <p>Price/ category/ subcategory/ shipping/color/quantity/brand/sold/availability</p>
                </Card>
            </div>
        </>
    )

}

export default SingleProduct;