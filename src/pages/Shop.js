import React, {useState, useEffect} from "react";
import ProductCard from '../components/cards/ProductsCard';
import {getCategories} from '../functions/category'
import {getProductsByCount,fetchProductsByFilter} from '../functions/product';
import { useDispatch, useSelector } from "react-redux";
import { Menu, Slider, Checkbox } from "antd";
import { DollarOutlined, DownSquareOutlined } from "@ant-design/icons";

const {SubMenu, ItemGroup} = Menu;

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [price, setPrice] = useState([0, 0]);
    const [ok, setOk] = useState(false);
    const [categories, setCategories] = useState([]);
    const [categoryIds, setCategoryIds] = useState([]);

    let dispatch = useDispatch();
    
    let { search } = useSelector((state)=> ({...state}));
    const { text } = search;

    useEffect(()=> {
        loadAllProducts();
        getCategories().then(res => setCategories(res.data));
    },[]);

    const filterProducts =(arg)=>{
        fetchProductsByFilter(arg)
        .then((res)=> {
            setProducts(res.data);
        });
    };

    // 1. Load products by default on page load
    const loadAllProducts = ()=> {
        getProductsByCount(12).then((p)=>{
            setProducts(p.data)
            setLoading(false)
        })
    }

    // 2. Load products based on user search
    useEffect(()=>{
        // console.log(`Load products based on user search`, text);
        // setLoading(true)
        const delayed = setTimeout(()=> {
            filterProducts({query: text});
        }, 300);

        return ()=> clearTimeout(delayed);
        // setLoading(false)
    },[text])
    const handleSlider = (value)=> {
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text : ""}
        });
        setCategoryIds([])
        setPrice(value);
        setTimeout(()=> {
                setOk(!ok)
        }, 300)
        
    }
    // 3. Load products based on the price range
    useEffect(()=> {
        console.log("ok to request");
        filterProducts({price});
    },[ok]);
    // 4. Load products based on categories
    // Show categories in a list of checkbox
    const showCategories =()=>
        categories.map((c)=> (
            <div key={c._id}>
                <Checkbox
                    className="pb-2 pr-4 pl-4"
                    value={c._id}
                    name="category"
                    onChange={handleCheck}
                    checked={categoryIds.includes(c._id)}
                >
                    {c.name}
                </Checkbox>
                <br />
            </div>
        ));

        const handleCheck =(e) => {
            // console.log(e.target.value)
            dispatch({
                type: "SEARCH_QUERY",
                payload: { text: ''}
            })
            setPrice([0, 0]);
            let inTheState =[...categoryIds];
            let justChecked = e.target.value;
            let foundInTheState = inTheState.indexOf(justChecked); //index or -1
            // indexOf() returns -1 else index of an item in the array

            if(foundInTheState === -1) {
                inTheState.push(justChecked)
            } else {
                // if found, pull out one index from the arry
                inTheState.splice(foundInTheState, 1);
            }

            setCategoryIds(inTheState);
            // console.log(inTheState);

            filterProducts({category: inTheState});
        }
    
    return(
        <div className="container fluid">
            <div className="row">
                <div className="col-md-3 pt-2">
                   <h4>Search/Filter</h4>
                   <hr />
                   <Menu mode="inline" defaultOpenKeys={["1", "2"]}>
                    {/* Price */}
                        <SubMenu key="1" 
                                 title={<span className="h6">
                                                <DollarOutlined /> 
                                                &nbsp;Price
                                        </span>}>
                            <div>
                                <Slider
                                    className="ml-4 mr-4"
                                    tipFormatter={(v)=>`Ksh${v}`}
                                    range
                                    value={price}
                                    onChange={handleSlider}
                                    max={130000}
                                    />
                            </div>
                        </SubMenu>
                        {/* Categories */}
                        <SubMenu key="2" title={<span className="h6">
                                                    <DownSquareOutlined /> 
                                                    &nbsp;Categories
                                                </span>}>
                            <div style={{marginTop: '-10px'}}>
                                {/* {JSON.stringify(categories)} */}
                                {showCategories()}
                            </div>
                        </SubMenu>
                   </Menu>
                </div>
                <div className="col-md-9 pt-2">
                    {loading ? (<h4 className="text-danger">Loading...</h4>)
                    : (<h4>Products</h4>)}
                    {products.length < 1 && <p>No Products Found</p>}

                    <div className="row pb-5">
                        {products.map((p)=><div key={p._id} 
                        className="col-md-4 mt-3">
                            <ProductCard product={p}/>
                        </div>)}
                    </div>
                </div>
            </div>
        </div>
    )

}
export default Shop;