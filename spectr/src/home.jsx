import React from "react";
import Navbar from "./components/navbar";
import Hero from "./hero";
import Underhero1 from "./underhero1";
import Underhero2 from "./underhero2";

export default function Home() {
  const loggedinuser = JSON.parse(localStorage.getItem("user"));
  if (loggedinuser) {
    console.log("user");
  } else {
    console.log("not user");
  }

  return (
    <>
      {/*<div>
      <Navbar/>
      <Hero/>
      <Underhero1/>
      <Underhero2/>
    
    </div>*/}

      <div
        style={{
          height: "100vh",
          overflowY: "scroll",
          scrollSnapType: "y mandatory",
          scrollBehavior: "smooth",
          scrollbarWidth: "none", 
        }}
      >
        <Navbar />
        <section style={{ scrollSnapAlign: "start" }}>
          <Hero />
        </section>
        <section style={{ scrollSnapAlign: "start" }}>
          <Underhero1 />
        </section>
        <section style={{ scrollSnapAlign: "start" }}>
          <Underhero2 />
        </section>
      </div>
    </>
  );
}
