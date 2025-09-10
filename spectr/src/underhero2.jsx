import React from "react";
import "./components/underhero2.css";
import Modelb from "./assets/tekken.jpg";
import { Link } from "react-router-dom";
import Modelc from "./assets/vid102.mp4";
import Modeld from "./assets/vid101.mp4";
import V2 from "./assets/v2.png"
import { useNavigate } from "react-router-dom";

export default function Underhero2() {
  const navigate=useNavigate()
  return (
    <>
      <div className="underhero2container">
        <Link to="/product_details/5" className="underhero2item">
          <video
            src={Modeld}
            autoPlay
            loop
            muted
            playsInline
            className="underhero2video"
          ></video>
          <div className="underherotext">
            <h2>TEKKEN </h2>
          </div>
        </Link>

        <Link to="/product_details/8" className="underhero2item">
          <video
            src={Modelc}
            autoPlay
            loop
            muted
            playsInline
            className="underhero2video"
          ></video>
          <div className="underherotext">
            <h2>WAR|CRAFT</h2>
          </div>
        </Link>
      </div>

      <div className="button">
        <button onClick={()=>navigate("/store")} className="buttona">Explore More</button>
      </div>
    </>
  );
}
