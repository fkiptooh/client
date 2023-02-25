import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getUserCart, emptyUserCart, saveUserAddress } from "../functions/user";
import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css"


const Checkout =()=> {
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [address, setAddress] = useState("");
    const [savedAddress, setSavedAddress] = useState(false);

    const user = useSelector((state)=> ({...state.user}));
    let dispatch = useDispatch();

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
            toast.success(`The cart is emptied, continues shopping`)
        });
    }
    return(
        <div className="row">
            <div className="col-md-6">
                <h4>Delivery Address</h4>
                <br/>
                <br/>
                <ReactQuill value={address} onChange={setAddress}/>
                <button className="btn btn-primary mt-2" onClick={saveAddressToDb}>
                    Save
                </button>
                <hr />
                <h4>Got Coupon?</h4>
                <br />
                Coupon input and apply button button
            </div>
            <div className="col-md-6">
                <h4>Order Save</h4>
                <hr />
                <p>Products Checkout Number: {products.length}</p>
                <hr/>
                {products.map((p, i)=> (
                    <div key={i}>
                        <p>
                            {p.product.title} ({p.color}) x {p.count} = {p.product.price * p.count}
                        </p>
                    </div>
                ))}
                <hr />
                <p>Cart total: Ksh {total}</p>
                <div className="row">
                    <div className="col-md-6">
                        <button 
                            disabled={!savedAddress || !products.length}
                            className="btn btn-primary btn-raised">
                            Place Order
                        </button>
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
    )
}

export default Checkout