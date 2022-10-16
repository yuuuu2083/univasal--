import React from 'react';
import Topbar from "../../commponents/topbar/Topbar";
import Timeline from "../../commponents/timeline/Timeline";
import "./home.css";

export default function home() {
    return (
        <div className="home-container">
                <Topbar />
            <div className="global-conteiner">
                <Timeline />
                {/* <Footer /> */}
            </div>
        </div>
    )
}
