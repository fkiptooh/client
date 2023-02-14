import React, { useState } from "react";
import { Modal, Button } from "antd";
import { toast } from 'react-toastify';
import { StarOutlined } from "@ant-design/icons";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";


const RatingModal =({children})=> {
    const { user } = useSelector((state)=> ({...state}));
    const [modalVisible, setModalVisible] = useState(false);

    const navigate = useNavigate();


    const handleModal =()=> {
        if(user && user.token){
            setModalVisible(true)
        } else {
            navigate(`/login`);
        }
    }

    return(
        <>
            <div onClick={handleModal}>
                <StarOutlined className="text-danger"/><br/>{" "}
                {user ? "Leave Rating" : "Login to leave Ratings"}
            </div>
            <Modal
                title="Leave your ratings"
                centered
                visible={modalVisible}
                onOk={()=> {
                    setModalVisible(false)
                    toast.success("Thanks for your review, it will appear soon");
                }}
                onCancel={()=> setModalVisible(false)}
            >
                {children}
            </Modal>
        </>
    )

}
export default RatingModal;