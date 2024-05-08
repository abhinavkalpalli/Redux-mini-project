import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteUser, adminreset } from "../features/auth/admin/adminSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";


const UserCard = ({ userData }) => {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { imgUrl, name, email, _id } = userData;
  const { isDeleted } = useSelector((state) => state.admin);
  const [editUserData, setEditUserData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const EditUser = (user) => {
    setEditUserData(user);
    handleEditClick();
  };
  const DeleteUser = (_id) => {
    const id = { id: _id };
    dispatch(deleteUser(id));
  };
  useEffect(() => {
    if (isDeleted) {
      navigate("/admin/admindashboard");
      dispatch(adminreset());
    }
  }, [isDeleted]);
  return (
    <>
      
      {" "}
   
      <div style={styles.card}>
        {imgUrl ? (
          <img src={imgUrl} alt={name} style={styles.image} />
        ) : (
          <img
            src="https://norrismgmt.com/wp-content/uploads/2020/05/24-248253_user-profile-default-image-png-clipart-png-download.png"
            alt={name}
            style={styles.image}
          />
        )}
        <div style={styles.userInfo}>
          <h2>{name}</h2>
          <p>{email}</p>
        </div>
        <button onClick={() => DeleteUser(_id)}>Delete</button>
        <button
          onClick={() =>
            EditUser({ id: _id, name: name, email: email, imgUrl: imgUrl })
          }
        >
          Edit
        </button>
        {isModalOpen && (
          <Modal userData={editUserData} onClose={handleCloseModal} />
        )}
      </div>
    </>
  );
};

const styles = {
  card: {
    display: "flex",
    alignItems: "center",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    marginBottom: "10px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  image: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    marginRight: "20px",
  },
  userInfo: {
    flexGrow: "1",
  },
};

export default UserCard;
