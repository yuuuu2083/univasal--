import React, { useEffect, useState } from 'react';
import "./Friend.css";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Link } from "react-router-dom";
import moment from "moment";

export default function Friend() {
    const [detail, setDetail] = useState([]);//投稿内容
    const [user, setUser] = useState([]);//友達の情報
    const search = useLocation().search;
    const query = new URLSearchParams(search);
    const i = query.get('friendId');
    const REACT_APP_PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {
        try {
            const fetch = async () => {
                const detail = await axios.get(`api/post/profile?userId=${i}`);
                const user = await axios.get(`api/user/${i}`);
                setDetail(detail.data);
                setUser(user.data)
            }
            fetch();
        } catch (err) {
            console.log(err);
        }
    }, [i]);
    console.log(detail)
    console.log(user)

    return (
        <div>
            <div className="profile">
                <h1 className="profile-title">UNIVASAL STUDY</h1>
                <h2 className="profile-title">友達ページ</h2>
                <Link to="/" style={{ textDecoration: "none" }}>
                    <div className="profile-link-home">HOME</div>
                </Link>
                <div className="profile-top">
                    <div className="profile-picture">
                        <img className="profile-picture-img" src={user.profilePicture ? REACT_APP_PUBLIC_FOLDER + user.profilePicture : REACT_APP_PUBLIC_FOLDER + "javas.png"} alt="" />
                    </div>
                    <div className="profile-cover-picture">
                        <img className="profile-cover-picture-img" src={user.coverPicture ? REACT_APP_PUBLIC_FOLDER + user.coverPicture : REACT_APP_PUBLIC_FOLDER + "Noimage.png"} alt="" />
                    </div>
                </div>
                <div className="profile-inner">
                    <div className="profile-post">
                        {detail.map((e) => (
                            <Link to={`/detail?userId=${e._id}`} style={{textDecoration: "none", color: "black"}}>
                                <div className="profile-post-box">
                                    <img className="profile-post-image" src={REACT_APP_PUBLIC_FOLDER + e.img} alt="" />
                                    <h2 className="profile-post-title">{e.title}</h2>
                                    <div className="profile-post-time">{moment(e.updatedAt).format('YYYY-MM-DD')}</div>
                                    <div className="profile-desc">{e.desc}</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
