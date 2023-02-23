/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Drawer} from "antd";
import { DeleteFilled } from "@ant-design/icons";
import laptop from '../../images/laptop.png';

const SideDrawer = ()=> {
    const dispatch = useDispatch();
    const cart = useSelector((state)=>(state.cart));
    const drawer =useSelector((state)=>(state.drawer));

    const imageStyle = {
        width: "100%",
        height: "100px",
        objectFit: "cover"
    }

    return<Drawer 
            onClose={()=>
                {dispatch({
                    type: "SET_VISIBLE",
                    payload: false,
                })}
            } 
            className="text-center"
            title={`${cart.length} Products in Cart`}
            visible={drawer}
            >
                {cart.map((p)=>(
                    <div className="row">
                        <div className="col">
                            {p.images[0] ? (
                                <>
                                    <img src={p.images[0].url} style={imageStyle}/>
                                    <p className="text-center bg-secondary text-light">
                                        {`${p.title} X ${p.count}`}
                                    </p>
                                </>
                            ):(
                                <>
                                <img src={laptop} style={imageStyle}/>
                                <p className="text-center bg-secondary text-light">{`${p.title} X ${p.count}`}</p>
                                </>
                            )}
                        </div>
                    </div>
                ))}
                <Link to={`/cart`}>
                    <button 
                        className="text-center btn btn-primary btn-raised btn-block"
                        onClick={()=>
                            dispatch({
                                type: "SET_VISIBLE",
                                payload: false,
                            })
                        }
                        >
                        Go To Cart
                    </button>
                </Link>
        </Drawer>

}
export default SideDrawer;