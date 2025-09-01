import React from "react";
import Modela from "./assets/vid1.mp4";
import "./components/underhero1.css";
import { Link } from "react-router-dom";

export default function Underhero1() {
  return (
    <>
      <Link to="/product_details/1" className="underhero1">
        <h2></h2>
        <video
          src={Modela}
          autoPlay
          loop
          muted
          playsInline
          className="video1"
        ></video>
        <div className="video-overlay"></div>

        <span className="side-text left-text">DYSTOPIAN</span>
        <span className="side-text right-text">VERGE</span>
      </Link>
    </>
  );
}
