import React from "react";
import "./Modalcss.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { updateUser } from "../features/auth/authSlice";
import Spinner from "./Spinner";
import { UpdateUsers } from "../features/auth/admin/adminSlice";

function Modal({ userData, onClose }) {
  const [formData, setFormData] = useState({
    email: userData.email,
    name: userData.name,
    imgUrl: '',
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isError, isSuccess, message,isLoading } = useSelector(
    (state) => state.auth
  );
  const {admin}=useSelector((state)=>state.admin)
  const { email, name } = formData;
  const [imageFile, setImageFile] = useState(null);
  const uploadImageToCloudinary = async (imageFile) => {
    const cloud_name = "dz60z9usx";
    const url = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;
    try {
        const formDataWithImage = new FormData();
        formDataWithImage.append("file", imageFile);
        formDataWithImage.append("upload_preset", "mzydeesi");

        const response = await axios.post(url, formDataWithImage, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        const imageUrl = response.data.secure_url;
        return imageUrl;
    } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        throw error;
    }
};




const handleImageInputChange = (event) => {
  const file = event.target.files[0];
  const allowedExtensions = ["jpeg", "jpg", "png", "svg", "webp"];
  const fileExtension = file.name.split(".").pop().toLowerCase();

 
  if (!allowedExtensions.includes(fileExtension)) {
    toast.error("File is not in image format");
    setImageFile(null); 
    return;
  }

  setImageFile(file); 
};

  const submitCredentials = async (e) => {
    e.preventDefault();
    let imageUrl
    if(admin){
      imageUrl ='';
    }else{
      imageUrl = user.imgUrl?user.imgUrl:'';
    }

    if (imageFile) {
      imageUrl = await uploadImageToCloudinary(imageFile);
    }
   
    const credentials = {
      name: name,
      email: email,
      imgUrl: imageUrl,
    }
    if(admin){
      console.log('hi',admin);
      dispatch(UpdateUsers(credentials))
      onClose()
      
    }else{
    dispatch(updateUser(credentials))
     onClose()
    }
  };
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [user, isError, isSuccess, message, navigate]);
  const onchange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  if(isLoading){
    return <Spinner/>
  }
  return (
    <div className="modal">
      <h1 className="close-btn" onClick={onClose}>
        ×
      </h1>
      <h2>Edit Profile</h2>
      <form onSubmit={submitCredentials}>
        <label>Name:</label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={name}
          placeholder="Enter your Name"
          onChange={onchange}
        />
        <label>Email:</label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          value={email}
          placeholder="Enter your email"
          onChange={onchange}
        />
        {!admin && <> <label>Image</label>
        <input type="file" onChange={handleImageInputChange} /> </>}
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default Modal;
