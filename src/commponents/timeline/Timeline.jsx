import React, { useEffect, useState } from 'react';
import "./Timeline.css";
import Post from "../post/Post";
import axios from "axios"
// import { Posts } from "../../dummyPost";



export default function Timeline() {
    //本来はここにpropsで受け取った情報(profileを見てるかhomeを見てるか)をif文でかく
    //今はhomeで進めていく
    const [posts, setPosts] = useState([]);
    
    useEffect(() => {
        const fetchPosts = async () => {
            const responce = await axios.get("api/post/");
            setPosts(responce.data.sort((post1, post2) => {
                return new Date(post2.createdAt) - new Date(post1.createdAt);
            }));
        }
        fetchPosts();
    }, []);

    return (
        <div>
            <div className="timeline">
                <div className="post">
                    {posts.map((post) => (
                        <Post post={post} key={post._id}/>
                    ))}
                    {/* 本来homeを見てるかprofileを見ているかでAPIを分けて情報を渡して行く */}
                </div>
                    
            </div>
        </div>
    )
}
