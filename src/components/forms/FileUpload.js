import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { useSelector } from 'react-redux';
import { Avatar, Badge } from "antd";

const FileUpload =({values, setValues, setLoading})=> {
    const { user } = useSelector((state)=> ({...state}))
    const fileUploadAndResize =(e)=> {
        // e.preventDefault();
        // console.log(e.target.files);
        // resize
        let files = e.target.files;
        let allUploadedFiles = values.images;
        if(files) {
            setLoading(true);
            for(let i = 0; i < files.length; i++ ) {
                Resizer.imageFileResizer(files[i], 720, 720, "JPEG", 100, 0, (url)=> {
                    // console.log(url)
                    axios.post(`${process.env.REACT_APP_API}/uploadimages`, {image: url},
                    {headers: {
                        authtoken: user ? user.token : ""
                    }}).then(res=>{
                        console.log(`IMAGE UPLOAD DATA`, res)
                        setLoading(false)
                        allUploadedFiles.push(res.data) 

                        setValues({...values, inages: allUploadedFiles})
                    })
                    .catch(err=>{
                        setLoading(false);
                        console.log("CLOUDINARY UPLOAD ERR", err);
                    })
                },
                'base64',
                )
                
            }
        }
    }

    const handleImageRemove =(public_id)=> {
        // console.log(`remove image with id `, public_id)
        axios.post(`${process.env.REACT_APP_API}/removeimage`, {public_id}, 
        {headers: {
            authtoken: user ? user.token : " ",
        }})
        .then(res=> {
            setLoading(false);
            const { images } = values;
            let filteredImages = images.filter((item)=>{
                return item.public_id !== public_id;
            });
            setValues({...values, images: filteredImages})
        })
        .catch(err=> {
            console.log(err)
            setLoading(false)

        })
    }

   return (
    <>
    <div className="row">
        {values.images && values.images.map((image)=>(
            <Badge count="X"
                style={{ cursor: "pointer"}}
                onClick={()=> handleImageRemove(image.public_id)}
            >
                <Avatar 
                    key={image.public_id} 
                    src={image.url} size={100} 
                    shape="square"
                    className="ml-3 mb-3"/>
            </Badge>
                
            ))}
    </div>
    <div className="row">
        <label className="btn btn-primary btn-raised">Choose File
        <input 
            type="file" 
            hidden
            multiple accept="images/*" 
            onChange={fileUploadAndResize}
            />
        </label>
    </div>
    </>
   )
}

export default FileUpload;