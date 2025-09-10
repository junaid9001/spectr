import React from "react";
import "./components/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footerbrand">
        <h1>
          SPECT<span className="mirror">R</span>
        </h1>
      </div>

      <div className="footerlinks">
        <a href="/">Home</a>
        <a href="/store">Store</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </div>

      <div className="footerinfo">
        <p>Made by Junaid</p>
        <p>© 2025 SPECTЯ. All rights reserved.</p>
      </div>
    </footer>
  );
}
