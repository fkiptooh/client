import React from "react";
import { Select } from 'antd'
const Option = Select;

const ProductUpdateForm =({
                            handleSubmit, 
                            handleChange, 
                            values, 
                        })=>{
    const { title, 
        description, 
        price, 
        categories, 
        category, 
        subcategory, 
        shipping, 
        quantity, 
        images,
        colors,
        brands,
        color,
        brand
    } = values;
    
    return(
        <form onSubmit={handleSubmit}>
                    <div className="form-group">
                    <label>Title</label>
                    <input 
                        type="text" 
                        name="title"
                        className="form-control"
                        value={title}
                        onChange={handleChange}
                    />
                    </div>
                   
                    <div className="form-group">
                    <label>Description</label>
                    <input 
                        type="text" 
                        name="description"
                        className="form-control"
                        value={description}
                        onChange={handleChange}
                    />
                    </div>
                    <div className="form-group">
                    <label>Price</label>
                    <input 
                        type="number" 
                        name="price"
                        className="form-control"
                        value={price}
                        onChange={handleChange}
                    />
                    </div>
                    <div className="form-group">
                    <label>Shipping</label>
                    <select 
                        //value={shipping === 'Yes' ? 'Yes' : 'No'}
                        name="shipping"
                        value={shipping}
                        type="text"
                        className="form-control"
                        onChange={handleChange}
                        >
                            {/* <option>Please select the available shipping mode for the product</option> */}
                            <option value="No">No</option>
                            <option value="Yes">Yes</option>
                        </select>
                    </div>
                    <div className="form-group">
                    <label>Quantity</label>
                    <input 
                        type="number" 
                        name="quantity"
                        className="form-control"
                        value={quantity}
                        onChange={handleChange}
                    />
                    </div>
                    <div className="form-group">
                    <label>Color</label>
                    <select 
                        name="color"
                        value={color}
                        type="text"
                        className="form-control"
                        onChange={handleChange}
                        >
                            {colors.map(c =>
                                <option 
                                    key={c} 
                                    value={c}>
                                        {c}
                                    </option>)
                            }
                        </select>
                    </div>
                    <div className="form-group">
                    <label>Brand</label>
                    <select 
                        name="brand"
                        type="text"
                        value={brand}
                        className="form-control"
                        onChange={handleChange}
                        >
                            {brands.map(b =>
                                <option 
                                    key={b} 
                                    value={b}>
                                        {b}
                                    </option>)
                            }
                        </select>
                    </div>
                {/* { JSON.stringify(values.subcategory)}
                {subcategoryOption ? subcategoryOption.length : "No sub categories yet" } */}
                <br/>
                <button className="btn btn-outline-info">Save</button>
                </form>
    )
}

export default ProductUpdateForm;