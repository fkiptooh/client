import React from "react";

const ShowPaymentInfo =({order, showStatus = true})=>(
    <div>
        <p>
            <span>Order ID: {order.paymentIntent.id}</span>{" / "}
            <span>Amount:{" / "}{((order.paymentIntent.amount)/100).toLocaleString("en-US",{
                style: "currency",
                currency: "kes",
            })}</span>{" / "}
            <span>Method: {order.paymentIntent.payment_method_types[0]}</span>{" / "}
            <span>Payment: {order.paymentIntent.status.toUpperCase()}</span>{" / "}
            <span>Ordered On: {new Date(order.paymentIntent.created * 1000).toLocaleString()}</span>{" / "}<br/>
            {showStatus && <span className="badge bg-primary text-white">STATUS: {order.orderStatus}</span>}
        </p>
    </div>
)
export default ShowPaymentInfo;