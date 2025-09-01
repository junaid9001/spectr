import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Productprovider, Userprovider ,Wishlistprovider } from "./admin/contextprovide.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Productprovider>
      <Userprovider>
        <Wishlistprovider>
        {" "}
        <App />{" "}
        </Wishlistprovider>
      </Userprovider>
    </Productprovider>
  </StrictMode>
);
