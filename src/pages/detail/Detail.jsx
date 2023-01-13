import React, { useContext, useEffect, useState } from 'react';
import "./Detail.css";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import { Mycontext } from "../../state/AuthContext";
import axios from 'axios';
import { useLocation } from 'react-router-dom';



export default function Detail() {

    const REACT_APP_PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user: User } = useContext(Mycontext);
    const [detail, setDetail] = useState([]);
    const [like, setLike] = useState(0);
    const [isLikes, setIsLikes] = useState(false);
    const search = useLocation().search;
    const query2 = new URLSearchParams(search);
    const i = query2.get('userId');//投稿のID
    const Add = document.querySelector(".Add");


    const handleClickAdd = async (e) => {
        e.preventDefault();
        try {
            const follow = await axios.put(`api/user/${detail.userId}/follow`, { userId: User });
            if(follow.data === "友達を追加した") {
                Add.textContent = "友達を追加した"
            } else {
                Add.textContent = "友達を削除した"
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleClickLike = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`api/post/like/${detail._id}`, { userId: User });
        } catch (err) {
            console.log(err);
        }
        setLike(isLikes ? like - 1 : like + 1);
        setIsLikes(!isLikes);
    }
    
    

    useEffect(() => {
        const fetch = async () => {
            const details = await axios.get(`api/post/detail?userId=${i}`)//投稿のIDから投稿の全ての情報を取得(投稿した人のIDも含まれる)
            setDetail(details.data);

        }
        fetch();
    }, [i]);


    return (

        <div>
            <div className="detail">
                <div className="detail-inner">
                    <h1 className="detail-title">UNIVASAL STUDY</h1>
                    <div className="detail-box">
                        <img className="detail-img" src={REACT_APP_PUBLIC_FOLDER + detail.img} alt="" />
                        <div className="btn">
                            <button className="detail-btn detail-add" onClick={handleClickAdd}><PersonAddIcon /><div className="Add">友達を追加</div></button>
                            <button className="detail-btn detail-like" onClick={handleClickLike}><VolunteerActivismIcon />いいね　{like}</button>
                        </div>
                    </div>
                    <div className="article">{detail.desc}</div>
                </div>
            </div>
        </div>
    )
}
