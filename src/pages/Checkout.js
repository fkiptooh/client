import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getUserCart, emptyUserCart, saveUserAddress, applyCoupon, createCashOrderForUser } from "../functions/user";
import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css"
import { useNavigate } from "react-router-dom";


const Checkout =()=> {
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [address, setAddress] = useState("");
    const [savedAddress, setSavedAddress] = useState(false);
    const [coupon, setCoupon] = useState("");
    // Discount price
    const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
    const [discountErr, setDiscountErr] = useState("");

    const user = useSelector((state)=> ({...state.user}));
    const COD = useSelector((state)=> (state.COD));
    let dispatch = useDispatch();
    let navigate = useNavigate();

    useEffect(()=> {
        getUserCart(user.token)
        .then(res=>{
            console.log(`cart response`, JSON.stringify(res.data, null, 4));
            setProducts(res.data.products);
            setTotal(res.data.cartTotal)
        })
    }, []);

    // const cart = useSelector((state)=>(state.cart));


    const saveAddressToDb =()=> {
        // 
        saveUserAddress(user.token, address)
        .then(res=> {
            if(res.data.ok) {
                setSavedAddress(true);
                toast.success("Address saved");
            }
        })
    }

    const emptyCart =()=> {
        // remove from local storage
        if(typeof window !== 'undefined'){
            localStorage.removeItem('cart')
        }
        // remove from redux
        dispatch({
            type: "ADD_TO_CART",
            payload: [],
        })
        // remove from backend
        emptyUserCart(user.token)
        .then(res=>{
            setProducts([]);
            setTotal(0);
            setTotalAfterDiscount(0);
            setCoupon('');
            toast.success(`The cart is emptied, continues shopping`)
        });
    }

    const showAddres =()=> 
    <>
        <ReactQuill value={address} onChange={setAddress}/>
        <button className="btn btn-primary mt-2" onClick={saveAddressToDb}>
            Save
        </button>
    </>

    const showProductSummary=()=>
    products.map((p, i)=> (
        <div key={i}>
            <p>
                {p.product.title} ({p.color}) x {p.count} = {p.product.price * p.count}
            </p>
        </div>
    ));

    const applyDiscountCoupon =()=> {
        console.log(`coupon to backend`, coupon);
        applyCoupon(user.token, coupon).then(res=> {
            console.log("RES ON COUPON", res.data)
            if(res.data){
                setTotalAfterDiscount(res.data);
                // update redux coupon applied true/false
                dispatch({
                    type: "COUPON_APPLIED",
                    payload: true,
                })
            }
            // error
            if(res.data.err){
                setDiscountErr(res.data.err);
                // update redux coupon applied true/false
                dispatch({
                    type: "COUPON_APPLIED",
                    payload: false,
                })
            }
        })
    }

    const showApplyCoupon=()=> 
    <>
        <input
            type="text"
            onChange={e => {
                setCoupon(e.target.value);
                setDiscountErr("")
            }}
            value={coupon}
            className="form-control"
        />
        <br/>
        <button onClick={applyDiscountCoupon} className="btn btn-outline-primary">apply</button>
    </>
    const createCashOrder=()=> {
        createCashOrderForUser(user.token, COD).then(res=>{
            console.log("CREATE USER CASH ORDER RES", res)
            // empty local, redux and backend cart, reset coupon
        })

    }
    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-6">
                    <h4>Delivery Address</h4>
                    <br/>
                    <br/>
                    {showAddres()}
                    <hr />
                    <h4>Got Coupon?</h4>
                    <br />
                    {showApplyCoupon()}
                    {discountErr && <p className="bg-danger p-2">{discountErr}</p>}
                </div>
                <div className="col-md-6">
                    <h4>Order Save</h4>
                    <hr />
                    <p>Products Checkout Number: {products.length}</p>
                    <hr/>
                    {showProductSummary()}
                    <hr />
                    <p>Cart total: Ksh {total}</p>
                    {totalAfterDiscount > 0 && (
                        <p className="bg-success p-2">
                            Discount Applied. Amount Payable is: Ksh {totalAfterDiscount}
                        </p>
                    )}
                    <div className="row">
                        <div className="col-md-6">
                           {COD ? 
                           (
                            <button 
                            disabled={!savedAddress || !products.length}
                            onClick={createCashOrder}
                            className="btn btn-primary btn-raised">
                            Place Order
                        </button>
                           ) : (
                            <button 
                            disabled={!savedAddress || !products.length}
                            onClick={()=> navigate(`/payment`)}
                            className="btn btn-primary btn-raised">
                            Place Order
                        </button>
                           )}
                        </div>
                        <div className="col-md-6">
                            <button 
                                className="btn btn-warning btn-raised"
                                onClick={emptyCart}
                                disabled={!products.length}
                                >
                                    Empty Cart
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout