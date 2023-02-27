import React from "react";
import {useSelector, useDispatch} from 'react-redux'
import { Link, useNavigate } from "react-router-dom";
import ProductCardInCheckout from "../components/cards/ProductCardInCheckout";
import { userCart } from "../functions/user";

const Cart =()=>{
    const user = useSelector((state)=> ({...state.user}));
    console.log('user in the state',user);
    const cart = useSelector((state)=>(state.cart));

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const showCartItems=()=> {
  return (  <div className="container-fluid">
    <div className="row">
    <table className="table table-borded">
            <thead className="thead-light">
                <tr>
                    <th scope="col">Image</th>
                    <th scope="col">Title</th>
                    <th scope="col">Price</th>
                    <th scope="col">Brand</th>
                    <th scope="col">Color</th>
                    <th scope="col">Count</th>
                    <th scope="col">Shipping</th>
                    <th scope="col">Remove</th>
                </tr>  
            </thead>
            {cart.map((p)=>(<ProductCardInCheckout key={p._id} p={p}/>))}
        </table>
    </div>

  </div>
        );
    }

    const getTotal=()=> {
        return cart.reduce((currentValue, nextValue)=>{
            return currentValue + nextValue.count * nextValue.price
        }, 0)
    }

    const redirectToSamePage =()=>{
        navigate(
            `/login`,
            {
                state: { from: `/cart`}
            }
        )
    }

    const saveOrderToDb =()=> {
        // alert(`Save order to Db`);
        userCart(cart, user.token)
        .then(res =>{
            console.log(`CART POST RES`, res);
            if(res.data.ok) navigate(`/checkout`);
        })
        .catch(err => console.log(err));
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
                showCartItems()
            )}
        </div>
        <div className="col-md-4">
            <h4>Order summary</h4>
            <hr/>
            <p>Products</p>
            {cart.map((c, i)=>
                <div key={i}>
                    <p>{c.title} x {c.count} = Ksh {c.price * c.count}</p>
                </div>
            )}
            <hr/>
            Total: <b>Ksh {getTotal()}</b>
            <hr/>
            {
                user.token ? (
                    <button 
                        onClick={saveOrderToDb} 
                        className="btn btn-sm btn-primary btn-raised mt-2"
                        disabled={!cart.length}
                        >
                        Checkout
                    </button>
                ) :
                (
                    <button 
                        onClick={redirectToSamePage} 
                        disabled={!cart.length}
                        className="btn btn-sm btn-warning btn-raised mt-2">
                        {/* <Link> */}
                            Login to Checkout
                        {/* </Link> */}
                    </button>
                )
            }
        </div>
    </div>
</div>
  )
}
export default Cart;