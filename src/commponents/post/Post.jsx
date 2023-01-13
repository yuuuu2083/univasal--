import React, { useContext, useEffect, useState } from 'react';
import "./Post.css";
import moment from "moment";
import {Link} from "react-router-dom";
import axios from 'axios';
import { Mycontext } from '../../state/AuthContext';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export default function Post({ post }) {//投稿内容
    const REACT_APP_PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser ] = useState([]);
    const {user: User} = useContext(Mycontext);
    useEffect(() => {
        try {
            const fetch = async () => {
                const users = await axios.get(`api/user/${post.userId}`);
                setUser(users.data);
            }
            fetch();
        } catch (err) {
            console.log(err);
        }
    },[post.userId]);

    const handleClickDelete = async (e) => {
        e.preventDefault();
        try {
            await axios.delete(`api/post/${post._id}`, { userId: User })
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };



    return (
        <Link  className="post" to={`/detail?userId=${post._id}`} style={{textDecoration: "none", color: "black"}}>
        <div className="post">
            <div className="post-box">
                <img
                    className="post-image"
                    src={
                        post.img ? REACT_APP_PUBLIC_FOLDER + post.img : REACT_APP_PUBLIC_FOLDER + "noAvatar.png"}
                        alt="文字"
                />
                <h2 className="post-title">{post.title}</h2>
                <div className="post-time">{moment(post.updatedAt).format('YY-MM-DD')}</div>
                <div className="desc">
                    <img className="desc-img" src={REACT_APP_PUBLIC_FOLDER + user.profilePicture} alt=""/>
                    <div className="desc-text">{post.desc}</div>
                </div>
                <div className="delete" onClick={handleClickDelete} style={{textDecoration: "none"}}><DeleteOutlineIcon />削除</div>
            </div>
        </div>
     </Link>
    )
}
