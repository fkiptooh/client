import React from "react";
import { useSelector, useDispatch } from "react-redux";

const Checkout =()=> {

    // const cart = useSelector((state)=>(state.cart));
    let dispatch = useDispatch();

    const saveAddressToDb =()=> {
        // 
    }
    const clearCart =()=> {
        let cart = localStorage.getItem('cart');
        // console.log(cart)
        cart = [];
        localStorage.setItem(`cart`, JSON.stringify(cart))
        dispatch({
            type: 'ADD_TO_CART',
            payload: cart,
        })
        
    }
    return(
        <div className="row">
            <div className="col-md-6">
                <h4>Delivery Address</h4>
                <br/>
                <br/>
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
                <p>Products x</p>
                <hr/>
                <p>List of Products</p>
                <hr />
                <p>Cart total: Ksh x</p>
                <div className="row">
                    <div className="col-md-6">
                        <button className="btn btn-primary btn-raised">Place Order</button>
                    </div>
                    <div className="col-md-6">
                        <button 
                            className="btn btn-warning btn-raised"
                            onClick={clearCart}
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