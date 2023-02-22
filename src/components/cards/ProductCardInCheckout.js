import React from "react";
import ModalImage from 'react-modal-image';
import { useDispatch } from "react-redux";
import laptop from '../../images/laptop.png'

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
                <td>{p.count}</td>
                <td>Shipping Icon</td>
                <td>Remove icon</td>
            </tr>
        </tbody>
    )

}

export default ProductCardInCheckout