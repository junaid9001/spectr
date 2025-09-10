import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  Productprovider,
  Userprovider,
  Wishlistprovider,
  Cartprovider,
} from "./admin/contextprovide.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Productprovider>
      <Userprovider>
        <Wishlistprovider>
          <Cartprovider>
            {" "}
            <App />{" "}
          </Cartprovider>
        </Wishlistprovider>
      </Userprovider>
    </Productprovider>
  </StrictMode>
);
