import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import DatePicker from 'react-datepicker';
import { getCoupons, removeCoupon, createCoupon } from "../../../functions/coupon";
import "react-datepicker/dist/react-datepicker.css";
import AdminNav from "../../../components/nav/AdminNav";
import {DeleteOutlined} from '@ant-design/icons';

const CreateCouponPage =()=> {

    const [name, setName]=useState("");
    const [expiry, setExpiry] = useState(new Date());
    const [discount, setDiscount] = useState("");
    const [loading, setLoading] = useState("");
    const [coupons, setCoupons] = useState([]);
    const today = new Date();

    const user = useSelector((state)=> (state.user));

    useEffect(()=> {
        getAllCoupons();
    }, []);

    const handleSubmit=(e)=>{
        e.preventDefault();
        // console.table(name, discount, expiry)
        setLoading(true);
        createCoupon({name, expiry, discount}, user.token)
        .then(res=> {
            setLoading(false);
            getAllCoupons();
            setName("");
            setExpiry("");
            setDiscount("");
            toast.success(`"${res.data.name}" is created`);
        })
        .catch(err =>{
            console.log(`Coupon create error`, err)
        });
    }

    const getAllCoupons =()=>{
        getCoupons().then(res=> setCoupons(res.data));
    }

    const handleRemove =couponId=> {
        if(window.confirm('Delete ?')){
            setLoading(true)
            removeCoupon(couponId, user.token).then(res=> {
                getAllCoupons()
                setLoading(false)
                toast.error(`"${res.data.name}" has been deleted`);
            }).catch(err=> console.log(err));
        }
    }
    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav/>
                </div>
                <div className="col-md-10">
                 {loading ? <h4 className="text-danger">Loading...</h4> : <h4>Coupons</h4>}
                 <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="text-muted">Name</label>
                        <input
                            className="form-control"
                            onChange={e=> setName(e.target.value)}
                            value={name}
                            autoFocus
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Discount %</label>
                        <input
                            className="form-control"
                            onChange={e=> setDiscount(e.target.value)}
                            value={discount}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Expiry</label>
                        <DatePicker 
                            className="form-control"
                            selected={expiry}
                            onChange={(date)=> setExpiry(date)}
                            minDate={today}
                            required
                            />
                    </div>
                    <button className="btn btn-outline-primary">Save</button>
                 </form>
                 <br/>
                 <table className="table table-bordered">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Expiry Date</th>
                            <th scope="col">Discount %</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {coupons.map((c)=> (
                            <tr key={c._id}>
                                <td>{c.name}</td>
                                <td>{new Date(c.expiry).toLocaleDateString()}</td>
                                <td>{c.discount}</td>
                                <td>
                                    <DeleteOutlined 
                                        onClick={()=>handleRemove(c._id)} 
                                        className="text-danger pointer"/>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                 </table>
                </div>
            </div>
        </div>
    )
}

export default CreateCouponPage;