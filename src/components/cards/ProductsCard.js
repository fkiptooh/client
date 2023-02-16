import React from "react";
import laptop from '../../images/laptop.png'
import { Card } from 'antd'
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { showAverage } from "../../functions/ratings";

const {Meta} = Card

const ProductCard =({product})=> {
    const {title, description, images, slug} = product;
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
                <><ShoppingCartOutlined className="text-danger"/> <br/> Add to Cart</>
            ]}
        >
            <Meta title={title} description={`${description && description.substring(0, 22)}...`}/>
        </Card>
    </div>)

}

export default ProductCard;