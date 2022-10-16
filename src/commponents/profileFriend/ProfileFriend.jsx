import React from 'react';
import './ProfileFriend.css';
import { Link } from "react-router-dom";


export default function ProfileFriend({ friend }) {

    const REACT_APP_PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
            <div className="profile-friend-box">
                <Link to={`/friend?friendId=${friend[0]._id}`} style={{ textDecoration: "none" }}>
                    <img className="profile-friend-box-img"
                        src={friend[0].profilePicture ? REACT_APP_PUBLIC_FOLDER + friend[0].profilePicture : REACT_APP_PUBLIC_FOLDER + "noAvatar.png"} alt="" />
                </Link>
                <div className="profile-friend-name">{friend[0].username}</div>
            </div>
    )
}
