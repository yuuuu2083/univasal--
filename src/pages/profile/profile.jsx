import React, { useContext, useEffect, useState } from 'react';
import "./profile.css";
import { Link } from "react-router-dom";
import axios from 'axios';
import Profilepost from "../../commponents/profilePost/Profilepost";
import ProfileFriend from "../../commponents/profileFriend/ProfileFriend";
import { Mycontext } from "../../state/AuthContext";


export default function Profile() {
    const profile = document.querySelector(".profile");
    const profile_friend = document.querySelector(".profile-friend");
    const { user: User } = useContext(Mycontext);
    const [host, setHost] = useState([]);//自分のユーザー情報
    const [post, setPost] = useState([]);//自分の投稿内容
    const [friend, setFriend] = useState([]);//友達のじょうほう
    const REACT_APP_PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    
    useEffect(() => {//自分のユーザー情報の取得
        const state = async () => {
            const [responce, responce2, responce3 ] = await Promise.all([
                axios.get(`api/user/${User}`),
                axios.get(`api/post/profile?userId=${User}`),
                axios.get(`api/user/friend/${User}`),
            ])
            setHost(responce.data);
            setPost(responce2.data);
            setFriend(responce3.data)
        }
        state();
    },[User._id, host._id, User])

    const handleFriend = () => {
        profile.classList.toggle("mobile");
        profile_friend.classList.toggle("show");
    }

    return (
        
        <div className="profile">
            <h1 className="profile-title">UNIVASAL STUDY</h1>
            <h2 className="profile-title">HOME</h2>

            <Link to="/" style={{ textDecoration: "none" }}>
                <div className="profile-link-home">HOME</div>
            </Link>
            <div className="profile-top">
                <div className="profile-picture"><img className="profile-picture-img" src={REACT_APP_PUBLIC_FOLDER + "javas.png"} alt="" /></div>
                <div className="profile-cover-picture"><img className="profile-cover-picture-img" src={REACT_APP_PUBLIC_FOLDER + "photo-male.jpeg"} alt="" /></div>
            </div>
            <div className="profile-friend-300" onClick={handleFriend}>友達
            </div>
            <div className="profile-inner">
                <div className="profile-post">
                    {post.map((post) => (
                        <Profilepost host={post} key={post._id} />
                    ))
                    }
                </div>
                <div className="profile-friend">
                    <h2 className="profile-friend-title">友達</h2>
                    {friend.map((friend, index) => (
                        <ProfileFriend friend={friend} key={index}/>
                    ))
                    }
                </div>
            </div>
        </div>
    )
}
