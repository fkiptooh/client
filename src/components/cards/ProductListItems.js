import React from "react";
import { Link } from "react-router-dom";

const ProductListItems =({product})=> {
    const { price, category, subcategory, shipping, sold, brand, color, quantity } = product;
    return(
        <ul className="list-group">
            <li className="list-group-item">
                Price 
                <span className="label label-default label-pill pull-xs-right">
                    Ksh {price}
                </span>
            </li>
            {category && (<li className="list-group-item">
                Category 
                <Link to={`/category/${category.slug}`} className="label label-default label-pill pull-xs-right">
                    {category.name}
                </Link>
            </li>)}
            {subcategory && (
                <li className="list-group-item">
                    Sub Category
                    {subcategory.map((s)=>
                    (<Link 
                    to={`/subcategory/${s.slug}`}
                    key={s._id}
                    className="label label-default label-pill pull-xs-right"
                    >
                        {s.name}
                    </Link>))}
                </li>
            )}
            <li className="list-group-item">
                Shipping 
                <span className="label label-default label-pill pull-xs-right">
                    {shipping}
                </span>
            </li>
            <li className="list-group-item">
                Color 
                <span className="label label-default label-pill pull-xs-right">
                    {color}
                </span>
            </li>
            <li className="list-group-item">
                Brand 
                <span className="label label-default label-pill pull-xs-right">
                    {brand}
                </span>
            </li>
            <li className="list-group-item">
                Available 
                <span className="label label-default label-pill pull-xs-right">
                    {quantity}
                </span>
            </li>
            <li className="list-group-item">
                Sold 
                <span className="label label-default label-pill pull-xs-right">
                    {sold}
                </span>
            </li>
        </ul>
    )

}

export default ProductListItems;