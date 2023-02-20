import React, {useState, useEffect} from "react";
import ProductCard from '../components/cards/ProductsCard';
import {getProductsByCount,fetchProductsByFilter} from '../functions/product';
import { useDispatch, useSelector } from "react-redux";
import { Menu, Slider } from "antd";
import { DollarOutlined } from "@ant-design/icons";

const {SubMenu, ItemGroup} = Menu;

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [price, setPrice] = useState([0, 0]);
    const [ok, setOk] = useState(false);

    let dispatch = useDispatch();
    
    let { search } = useSelector((state)=> ({...state}));
    const { text } = search;

    useEffect(()=> {
        loadAllProducts();
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
        setPrice(value);
        setTimeout(()=> {
                setOk(!ok)
        }, 300)
        
    }
    // 3. Load products based on the price range
    useEffect(()=> {
        console.log("ok to request");
        filterProducts({price});

    },[ok])
    return(
        <div className="container fluid">
            <div className="row">
                <div className="col-md-3 pt-2">
                   <h4>Search/Filter</h4>
                   <hr />
                   <Menu mode="inline" defaultOpenKeys={["1", "2"]}>
                        <SubMenu key="1" title={<span className="h6"><DollarOutlined /> Price</span>}>
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