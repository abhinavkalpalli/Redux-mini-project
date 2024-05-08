import React, { useState } from 'react';
import './ProfileDet.css';
import Modal from '../Modal';
import { useNavigate } from 'react-router-dom';

const ProfileDet = ({ userData }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleEditClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="profile-page">
            <div className="content">
                <div className="content__cover">
                    {userData.imgUrl ? (
                        <div
                            className="content__avatarimg"
                            style={{ backgroundImage: `url(${userData.imgUrl})` }}
                        ></div>
                    ) : (
                        <div className="content__avatar"></div>
                    )}
                    <div className="content__bull">
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div className="content__actions">
                    <a href="#">
                        <svg xmlns="" viewBox="0 0 640 512">
                        
                        </svg>
                        <span></span>
                    </a>
                    <a href="#">
                        <svg xmlns="" viewBox="0 0 576 512">
                            
                        </svg>
                        <span></span>
                    </a>
                </div>
                <div className="content__title">
                    <h1>{userData.name}</h1>
                    <span>{userData.email}</span>
                </div>
                <div className="content__button" onClick={handleEditClick}>
                    <a className="button" href="#">
                        <div className="button__border"></div>
                        <div className="button__bg"></div>
                        <p className="button__text">Edit Profile</p>
                    </a>
                </div>
            </div>
            <div className="bg">
                <div>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            {isModalOpen && (
                <Modal userData={userData} onClose={handleCloseModal}/>
            )}
        </div>
    );
};

export default ProfileDet;
