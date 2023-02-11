import React from "react";
import laptop from '../../images/laptop.png'
import { Card } from 'antd'
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const {Meta} = Card

const ProductCard =({product})=> {
    const {title, description, images, slug} = product;
    return(<div>
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