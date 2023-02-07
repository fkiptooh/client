import React from "react";
import { Select } from 'antd'
const Option = Select;

const ProductCreateForm =({
                            handleSubmit, 
                            handleChange, 
                            values, 
                            handleCategoryChange,
                            subcategoryOption,
                            showSubcategories,
                            setValues
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
                        name="shipping"
                        type="text"
                        className="form-control"
                        onChange={handleChange}
                        >
                            <option>Please select the available shipping mode for the product</option>
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
                        type="text"
                        className="form-control"
                        onChange={handleChange}
                        >
                            <option>Please select color</option>
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
                        className="form-control"
                        onChange={handleChange}
                        >
                            <option>Please select brand</option>
                            {brands.map(b =>
                                <option 
                                    key={b} 
                                    value={b}>
                                        {b}
                                    </option>)
                            }
                        </select>
                    </div>
                    <div className="form-group">
                    <label>Category</label>
                    <select 
                        name="category" 
                        className="form-control"
                        onChange={handleCategoryChange}
                        >
                        <option>Please Select Category</option>
                        {categories.length>0 && 
                            categories.map((c)=>
                            (<option 
                                key={c._id} 
                                value={c._id}
                                >
                                {c.name}
                            </option>))
                        }
                    </select>
                </div>
            {  showSubcategories &&  (<div className="form-group">
                    <label>Sub Category</label>
                    <Select
                        mode="multiple"
                        style={{width: '100%'}}
                        placeholder="Please select subcategory"
                        value={subcategory}
                        onChange={value => setValues({...values, subcategory: value})}
                        allowClear                       
                    >
                            {subcategoryOption.length && 
                            subcategoryOption.map((s)=>(
                                <Option key={s._id} value={s._id}>{s.name}</Option>
                            ))}
                        
                    </Select>
                </div>)}
                {/* { JSON.stringify(values.subcategory)}
                {subcategoryOption ? subcategoryOption.length : "No sub categories yet" } */}
                <br/>
                <button className="btn btn-outline-info">Save</button>
                </form>
    )
}

export default ProductCreateForm;