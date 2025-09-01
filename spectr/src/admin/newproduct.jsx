import React, { useContext } from "react";
import { useState } from "react";
import { Productcontext } from "./createcontext";
import axios from "axios";

export default function AdminNewproduct() {
  const [name, setname] = useState("");
  const [price, setprice] = useState("");
  const [image, setimage] = useState("");
  const [brand, setbrand] = useState("");
  const [category, setcategory] = useState("");
  const [description, setdescription] = useState("");
  const [feature, setfeature] = useState([]);
  const { pcontext, setpcontext } = useContext(Productcontext);

  function handlesubmit(e) {
    e.preventDefault();
    if (pcontext.some((p) => p.name === name && p.brand === brand)) {
      alert("duplicate products not allowed");
    } else {
      axios.post("http://localhost:4006/products", {
        name: name,
        price: price,
        img: image,
        brand: brand,
        category: category,
        description: description,
        feature: feature,
        active: true,
      });
    }
    axios
      .get("http://localhost:4006/products")
      .then((res) => setpcontext(res.data));
  }

  return (
    <>
      <form onSubmit={handlesubmit}>
        <label>name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setname(e.target.value)}
        />

        <label>price</label>
        <input
          type="text"
          value={price}
          onChange={(e) => setprice(e.target.value)}
        />

        <label>img path</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setimage(e.target.value)}
        />

        <label>brand</label>
        <input
          type="text"
          value={brand}
          onChange={(e) => setbrand(e.target.value)}
        />

        <label>category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setcategory(e.target.value)}
        />

        <label>description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setdescription(e.target.value)}
        />

        <label>feature</label>
        <input
          type="text"
          value={feature}
          onChange={(e) => setfeature(e.target.value)}
        />

        <button type="submit">Add new product</button>
      </form>
    </>
  );
}
