/* eslint-disable array-callback-return */
import React from "react";
import ModalImage from 'react-modal-image';
import { useDispatch } from "react-redux";
import laptop from '../../images/laptop.png'
import {toast} from 'react-toastify'
import { CheckCircleOutlined, CloseCircleFilled, CloseCircleOutlined, DeleteFilled, DeleteOutlined } from "@ant-design/icons";

const ProductCardInCheckout = ({p})=> {

    const colors = ["Black", "Brown", "Silver", "White", "Blue"];
    const dispatch = useDispatch();

    const handleColorChange =(e)=>{
        // console.log(`product color`, e.target.value);
        let cart = [];
        if(typeof window !== 'undefined'){
            if(localStorage.getItem('cart')){
               cart = JSON.parse(localStorage.getItem('cart'));
            }
            cart.map((product, i)=>{
                if(product._id === p._id){
                    cart[i].color = e.target.value;
                }
            });

            // console.log(`updated color`, cart);
            localStorage.setItem(`cart`, JSON.stringify(cart));
            dispatch({
                type: "ADD_TO_CART",
                payload: cart,
            });
        }
    }
    const handleCountChange=(e)=>{
        // console.log(`Maximum available quantity`, p.quantity)
        let count = e.target.value < 1 ? 1 : e.target.value;
        if(count > p.quantity){
            toast.error(`Maximum available quantity ${p.quantity}`)
            return;
        }
        let cart = [];

        if(typeof window !== 'undefined'){
            if(localStorage.getItem('cart')){
                cart = JSON.parse(localStorage.getItem('cart'));
            }

            cart.map((product, i)=> {
                if(product._id === p._id){
                    cart[i].count = count;
                }
            });

            localStorage.setItem('cart', JSON.stringify(cart));
            dispatch({
                type: "ADD_TO_CART",
                payload: cart,
            })
        }
    }
    const handleRemove =()=> {
        let cart = [];
        if(typeof window !== 'undefined'){
            if(localStorage.getItem('cart')){
                cart = JSON.parse(localStorage.getItem('cart'));
            }
            cart.map((product, i)=> {
                if(product._id === p._id){
                    cart.splice(i, 1);
                }
            });

            localStorage.setItem('cart', JSON.stringify(cart));
            dispatch({
                type: "ADD_TO_CART",
                payload: cart,
            })
        }
    }
    return(
        <tbody>
            <tr>
                <td>
                    <div style={{width: '100px', height: 'auto'}}>
                        {p.images.length ? (
                            <ModalImage small={p.images[0].url} large={p.images[0].url}/>
                        ):(
                            <ModalImage small={laptop} large={laptop}/>
                        )}
                    </div>
                </td>
                <td>{p.title}</td>
                <td>Ksh {p.price}</td>
                <td>{p.brand}</td>
                <td>
                    <select 
                        onChange={handleColorChange} 
                        className="form-control" 
                        name="color"
                    >
                        {p.color ? (<option value={p.color}>{p.color}</option>):<option>Select</option>}
                        {colors
                            .filter((c)=>c !== p.color)
                            .map((c)=>(<option key={c} value={c}>
                                            {c}
                                        </option>))}
                    </select>
                </td>
                <td className="text-center">
                    <input 
                        type="number"
                        value={p.count}
                        onChange={handleCountChange}
                        className="form-control"
                    />
                </td>
                <td>
                    {p.shipping === "Yes" ? 
                        <CheckCircleOutlined 
                        className="text-success"/> : 
                        <CloseCircleOutlined
                        className="text-danger"/>}
                    </td>
                <td>
                    <DeleteOutlined
                        onClick={handleRemove}
                        className="text-danger pointer"/>
                    </td>
            </tr>
        </tbody>
    )

}

export default ProductCardInCheckout