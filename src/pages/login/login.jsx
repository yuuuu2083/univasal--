import axios from 'axios';
import React, { useRef } from 'react';
import { Link } from "react-router-dom";
import "./login.css";


export default function Login() {
    const email = useRef();
    const pass = useRef();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email.current.value)

        const data = {
            email: email.current.value,
            password: pass.current.value
        }

        try {
            await axios.post("api/auth/login", data);
        } catch (err) {
            console.log(err);
        }
        
        
    }
    


    return (
        <div className="login">
            <div className="login-inner">
                <div className="login-left"><h1 className="login-title" >UNIVASAL STUDY</h1></div>
                <form className="login-right" onSubmit={(e) => {handleSubmit(e)}}>
                    <h2 className="newlogin" >ログイン</h2>
                    <div className="email">
                        <div className="name" >E-mail</div>
                        <input className="login-input" type="email" ref={email} required />
                    </div>
                    <div className="pass">
                        <div className="name">パスワード</div>
                        <input className="login-input" type="password" minLength="4" ref={pass} required />
                    </div>
                    <button className="login-login" type="submit">ログイン</button>
                    <Link to="/register" style={{textDecoration: "none"}}>
                        <button className="createAcount" type="submit">アカウント作成</button>
                    </Link>
                </form>
            </div>
        </div>
    )
}