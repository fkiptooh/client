import React from "react";
import {useSelector, useDispatch} from 'react-redux'
import { Link } from "react-router-dom";

const Cart =()=>{
    const user = useSelector((state)=> ({...state}));
    const cart = useSelector((state)=>(state.cart));

    const dispatch = useDispatch();

    const getTotal=()=> {
        return cart.reduce((currentValue, nextValue)=>{
            return currentValue + nextValue.count * nextValue.price
        }, 0)
    }
  return(
    <div className="container-fluid pt-4">
    <div className="row">
        <div className="col-md-8">
            <h4>Cart / {cart.length} product/s in the cart</h4> 
            {!cart.length ? (
                <p>
                    No products in the cart
                    &nbsp;<Link to="/shop">Continue Shopping</Link>
                </p>
            ):(
                "Show products"
            )}
        </div>
        <div className="col-md-4">
            <h4>Order summary</h4>
            <hr/>
            <p>Products</p>
            {cart.map((c, i)=>(
                <div key={i}>
                    <p>{c.title} x {c.count} = Ksh {c.price * c.count}</p>
                </div>
            ))}
            <hr/>
            Total: <b>Ksh {getTotal()}</b>
            <hr/>
            {
                user.user ? (
                    <button className="btn btn-sm btn-primary mt-2">Checkout</button>
                ) :
                (
                    <button className="btn btn-sm btn-secondary mt-2">Login to Checkout</button>
                )
            }
        </div>
    </div>
</div>
  )
}
export default Cart;