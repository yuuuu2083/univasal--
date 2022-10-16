import React, { useRef } from 'react';
import "./register.css";
import { Link } from "react-router-dom";
import axios from 'axios';

export default function Register() {
    const name = useRef();
    const email = useRef();
    const pass = useRef();
    const pass2 = useRef();

    const handleSubmit =  async (e) =>{
        e.preventDefault();

        const newUser = {
            username: name,
            email: email,
            password: pass
        }
        try{
            await axios.post("/register", newUser);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="register">
            <div className="register-inner">
                <div className="register-left"><h1 className="register-title" >UNIVASAL STUDY</h1></div>
                <form className="register-right" onSubmit={(e) => {handleSubmit(e)}}>
                    <h2 className="newRegister" >新規登録</h2>
                    <div className="username">
                        <div className="name">ユーザー名</div>
                        <input className="register-input" type="text" ref={name}/>
                    </div>
                    <div className="email">
                        <div className="name">E-mail</div>
                        <input className="register-input" type="text" ref={email}/>
                    </div>
                    <div className="pass">
                        <div className="name">パスワード</div>
                        <input className="register-input" type="text" ref={pass}/>
                    </div>
                    <div className="pass2">
                        <div className="name">確認パスワード</div>
                        <input className="register-input" type="text" ref={pass2}/>
                    </div>
                    <button className="signup" type="submit" >サインアップ</button>
                    <Link to="/login" style={{ textDecoration: "none" }}>
                        <div className="register-login">ログインページへ</div>
                    </Link>
                </form>
            </div>
        </div>
    )
}
