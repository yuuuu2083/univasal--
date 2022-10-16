import React from 'react';
import "./Profilepost.css";
import {Link} from "react-router-dom";

export default function Profilepost({ host }) {
    // console.log(host)
    const REACT_APP_PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <Link className="post" to={`/detail?userId=${host._id}`} style={{ textDecoration: "none", color: "black" }}>
            <div className="profile-post-box">
                <img className="profile-post-image" src={host.img ? REACT_APP_PUBLIC_FOLDER + host.img : REACT_APP_PUBLIC_FOLDER + "photo-male.jpeg"} alt="" />
                <h2 className="profile-post-title">{host.title}</h2>
                <div className="profile-post-time">2022.02.09</div>
                <div className="profile-desc">{host.desc}</div>
            </div>
        </Link>
    )
}
