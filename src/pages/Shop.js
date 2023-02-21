import React, {useState, useEffect} from "react";
import ProductCard from '../components/cards/ProductsCard';
import {getCategories} from '../functions/category'
import {getProductsByCount,fetchProductsByFilter} from '../functions/product';
import { getSubcategories } from "../functions/subcategory";
import { useDispatch, useSelector } from "react-redux";
import { Menu, Slider, Checkbox, Radio } from "antd";
import { DollarOutlined, DownSquareOutlined, StarOutlined } from "@ant-design/icons";
import Star from "../components/forms/Star";

const {SubMenu, ItemGroup} = Menu;

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [price, setPrice] = useState([0, 0]);
    const [ok, setOk] = useState(false);
    const [categories, setCategories] = useState([]);
    const [categoryIds, setCategoryIds] = useState([]);
    const [stars, setStars] = useState('');
    const [subcategories, setSubcategories] = useState([]);
    const [subcategory, setSubcategory] = useState("");
    const [brands, setBrands] = useState(["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS", "HP", "DELL"]);
    const [brand, setBrand] = useState("");
    const [colors, setColors] = useState(["Black", "Brown", "Silver", "White", "Blue"]);
    const [color, setColor] = useState("");
    const [shipping, setShipping] = useState("");

    let dispatch = useDispatch();
    
    let { search } = useSelector((state)=> ({...state}));
    const { text } = search;

    useEffect(()=> {
        loadAllProducts();
        getCategories().then(res => setCategories(res.data));
        // load subcategorie
        getSubcategories().then(res=> setSubcategories(res.data));
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
        // reset
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text : ""}
        });
        setCategoryIds([])
        setStars("")
        setSubcategory("");
        setBrand("");
        setColor("")
        setShipping("")
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
            // reset
            dispatch({
                type: "SEARCH_QUERY",
                payload: { text: ''}
            })
            setPrice([0, 0]);
            setStars("");
            setSubcategory("")
            setBrand("");
            setColor("")
            setShipping("")
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
        const handleStarClicks=num=>{
            // console.log(num)
            dispatch({
                type: "SEARCH_QUERY",
                payload: { text: ''}
            })
            setPrice([0, 0]);
            setCategoryIds([]);
            setSubcategory("");
            setStars(num)
            setBrand("")
            setColor("")
            setShipping("")
            filterProducts({stars: num})
        }
        // 5. Show products by stars
        const showStars=()=>(
            <div className="pr-4 pl-4 pb-4">
                <Star starClicks={handleStarClicks} numberOfStars={5}/>
                <Star starClicks={handleStarClicks} numberOfStars={4}/>
                <Star starClicks={handleStarClicks} numberOfStars={3}/>
                <Star starClicks={handleStarClicks} numberOfStars={2}/>
                <Star starClicks={handleStarClicks} numberOfStars={1}/>
            </div>
        )

        // 6. Filter products based on subcategories
        const showSubcategories=()=> subcategories.map((s)=>
        <div 
            onClick={()=> handleSubmit(s)}
            className="p-1 m-1 badge badge-primary"
            style={{cursor: 'pointer'}}
            >
            {s.name}
        </div>)

        const handleSubmit =subcategory=> {
            // console.log("Sub category -->", s);
            setSubcategory(subcategory);
            dispatch({
                type: "SEARCH_QUERY",
                payload: { text: ''}
            })
            setPrice([0, 0]);
            setCategoryIds([]);
            setStars("")
            setBrand("")
            setColor("")
            setShipping("")
            filterProducts({subcategory})

        }
        // 7. Filter based on brands
        const showBrands=()=>
            brands.map((b)=>(<Radio 
                                name={b}
                                value={b}
                                className="pb-1 pl-4 pr-4"
                                checked={b === brand}
                                onChange={handleBrand}
                                >
                                {b}
                            </Radio>))

        const handleBrand = (e) => {
            setSubcategory("");
            dispatch({
                type: "SEARCH_QUERY",
                payload: { text: ''}
            })
            setPrice([0, 0]);
            setCategoryIds([]);
            setStars("")
            setColor("")
            setShipping("")
            setBrand(e.target.value);
            filterProducts({brand: e.target.value})

        }
        // 8. Filter based on color
        const handleColor =(e)=> {
            setSubcategory("");
            dispatch({
                type: "SEARCH_QUERY",
                payload: { text: ''}
            })
            setPrice([0, 0]);
            setCategoryIds([]);
            setStars("")
            setBrand("");
            setShipping("")
            setColor(e.target.value)
            filterProducts({color: e.target.value})
        }
        const showColors=()=> 
            colors.map((c)=>(
                <Radio
                    className="pb-1 pl-4 pr-4"
                    name={c}
                    value={c}
                    checked={c===color}
                    onChange={handleColor}
                >
                    {c}
                </Radio>
            ));
        // 8. Filter based on shipping
          const showShipping=()=> (
            <>
                <Checkbox
                    className="pb-2 pr-4 pl-4"
                    onChange={handleShipping}
                    value="Yes"
                    checked={shipping==='Yes'}
                >
                    Yes
                </Checkbox>
                <Checkbox
                    className="pb-2 pr-4 pl-4"
                    onChange={handleShipping}
                    value="No"
                    checked={shipping==='No'}
                >
                    No
                </Checkbox>
            </>
          )

          const handleShipping=(e)=> {
            setSubcategory("");
            dispatch({
                type: "SEARCH_QUERY",
                payload: { text: ''}
            })
            setPrice([0, 0]);
            setCategoryIds([]);
            setStars("")
            setBrand("");
            setColor("")
            setShipping(e.target.value)
            filterProducts({shipping: e.target.value})
          }
    
    return(
        <div className="container fluid">
            <div className="row">
                <div className="col-md-3 pt-2">
                   <h4>Search/Filter</h4>
                   <hr />
                   <Menu mode="inline" defaultOpenKeys={["1", "2", "3", "4","5","6","7"]}>
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
                        <SubMenu 
                            key="2" 
                            title={<span className="h6">
                                                    <DownSquareOutlined /> 
                                                    &nbsp;Categories
                                                </span>}>
                            <div style={{marginTop: '10px'}}>
                                {/* {JSON.stringify(categories)} */}
                                {showCategories()}
                            </div>
                        </SubMenu>
                        {/* Stars */}
                        <SubMenu 
                            key="3" 
                            title={<span className="h6">
                                                    <StarOutlined /> 
                                                    &nbsp;Ratings
                                                </span>}>
                            <div style={{marginTop: '10px'}} className="pb-2">
                                {showStars()}
                            </div>
                        </SubMenu>
                        {/* Sub category */}
                        <SubMenu 
                            key="4"
                            title={<span className="h6">
                                                    <DownSquareOutlined /> 
                                                    &nbsp;Sub Categories
                                                </span>}>
                            <div style={{marginTop: '10px'}} className="pl-4 pr-4">
                                {/* {JSON.stringify(categories)} */}
                                {showSubcategories()}
                            </div>
                        </SubMenu>
                        {/* Brands */}
                        <SubMenu 
                            key="5"
                            title={<span className="h6">
                                                    <DownSquareOutlined /> 
                                                    &nbsp;Brands
                                                </span>}>
                            <div style={{marginTop: '10px'}} className="pl-4 pr-4">
                                {/* {JSON.stringify(categories)} */}
                                {showBrands()}
                            </div>
                        </SubMenu>
                        {/* Color */}
                        <SubMenu 
                            key="6"
                            title={<span className="h6">
                                                    <DownSquareOutlined /> 
                                                    &nbsp;Color
                                                </span>}>
                            <div style={{marginTop: '10px'}} className="pl-4 pr-4">
                                {/* {JSON.stringify(categories)} */}
                                {showColors()}
                            </div>
                        </SubMenu>
                        {/* Shipping */}
                        <SubMenu 
                            key="7"
                            title={<span className="h6">
                                                    <DownSquareOutlined /> 
                                                    &nbsp;Shipping
                                                </span>}>
                            <div style={{marginTop: '10px'}} className="pr-4">
                                {/* {JSON.stringify(categories)} */}
                                {showShipping()}
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