import React, { useContext, useRef, useState } from 'react';
import "./Topbar.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { Mycontext } from '../../state/AuthContext';

export default function Topbar() {
    const REACT_APP_PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    const title = useRef();
    const desc = useRef();
    const error = useRef();
    // const User = JSON.parse(localStorage.getItem("user"));

    const [file, setFiles] = useState(null);

    const { user: context } = useContext(Mycontext);

    console.log(context)


    const handleSubmit = async (e) => {
        e.preventDefault();
        const newSubmit = {
            userId: context,
            title: title.current.value,
            desc: desc.current.value
        }

        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            newSubmit.img = fileName;
            try {
                await axios.post("/upload/", data)
            } catch (err) {
                console.log(err);
            }
        } else {
            console.log(error);
        }


        try {
            await axios.post("/post/", newSubmit);
            window.location.reload();
        } catch (err) {
            error.current.innerText = "画像を投稿してください";
        }
    }

    return (
        <div>
            <div className="topbar">
                <Link to="/register" style={{ textDecoration: "none", color: "black" }}>
                    <div className="topbar-register">新規登録</div>
                </Link>
                <Link to="/login" style={{ textDecoration: "none", color: "black" }}>
                    <div className="topbar-login">ログイン</div>
                </Link>
                <Link to={`profile/morimoto`} style={{ textDecoration: "none", color: "pink"  }}>
                    <p className="jibun">JIBUN</p> {/* 後日Linkタグで囲う(react-router-dom) */}
                </Link>
                <div className="topbar-inner">
                    <div className="share">
                        <form className="share-inner" onSubmit={(e) => { handleSubmit(e) }}>{/** 後日ここにクリックした時に情報渡すsubmit関数をかく */}
                            <div className="share-left">
                                <div className="profole-img"><img className="share-profile-img" src={REACT_APP_PUBLIC_FOLDER + "see-no.jpg"} alt="" /></div>
                                <label className="share-submit">
                                    画像投稿
                                    <input type="file" name="file" accept=".png, .jpeg, .jpg" placeholder="画像投稿" style={{ display: "none" }} onChange={(e) => { setFiles(e.target.files[0]) }} />
                                </label>
                                <p className="errorMessage" ref={error}></p>
                            </div>
                            <div className="share-right">
                                <div className="input-title">
                                    <input type="text" className="share-input-title" placeholder="勉強内容" maxLength="14" ref={title} />
                                </div>
                                <div className="input-content">
                                    {/* <input type="text" className="share-input-content" placeholder="どんな勉強をした？" />
                                     */}
                                    <textarea type="text" name="desc" className="share-input-content" placeholder="どんな勉強をした？" maxLength="84" ref={desc} ></textarea>
                                </div>
                                <button className="submit" type="submit">送信</button>
                            </div>
                        </form>
                    </div>
                    <h1 className="mainTitle">UNIVASAL STUDY</h1>
                </div>
            </div>
        </div>
    )
}


