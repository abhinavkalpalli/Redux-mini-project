import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUsersData } from "../features/auth/admin/adminSlice";
import UserCard from "../components/UserCard";
import Spinner from "../components/Spinner";
import "../components/Header.css" 

function Admindahboard() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(""); 


  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  
  const { admin, userData,isSuccess,isLoading,isDeleted } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!admin) {
      navigate("/adminlogin");
    }
    dispatch(getUsersData())
  }, [admin, navigate,isDeleted,dispatch]);

if(isLoading){  return(
  <Spinner/>
)}
const filteredUserData = userData.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div>
      {admin && (
        <>
          <h1>Welcome {admin.name}</h1>
          <div className="search">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearch}
          className="search-input" 
        />
      </div>
      <br />

      {filteredUserData.length > 0 ? (
            filteredUserData.map((user) => (
              <UserCard key={user._id} userData={user} />
            ))
          ) : (
            <p>No user data found</p>
          )}
        </>
      )}
    </div>
  );
}

export default Admindahboard;
