import React, { useContext, useState } from "react";
import { Productcontext } from "./createcontext";
import axios from "axios";
import "./admcss/manage.css";

export default function AdminManageproduct() {
  const { pcontext, setpcontext } = useContext(Productcontext);
  const [category, setcategory] = useState("");

  const [name, setname] = useState("");
  const [price, setprice] = useState("");
  const [image, setimage] = useState("");
  const [description, setdescription] = useState("");
  const [categoryedit, setcategoryedit] = useState("");
  const [geteditingproduct, setgetediting] = useState(null);
  const [edit, setedit] = useState(false);
  const [search, setsearch] = useState("");

  const filtered = pcontext.filter((item) => {
    const matchName = item.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "" ? true : item.category === category;
    return matchName && matchCategory;
  });

  function handleedit(item) {
    const editingproduct = pcontext.find((p) => {
      return p.id === item.id;
    });
    if (editingproduct) {
      setedit(true);
      setgetediting(editingproduct);
      setname(editingproduct.name);
      setprice(editingproduct.price);
      setimage(editingproduct.image);
      setdescription(editingproduct.description);
      setcategoryedit(editingproduct.category);
    }
  }

  function handlesubmit(e) {
    e.preventDefault();
    axios
      .patch(`http://localhost:4006/products/${geteditingproduct.id}`, {
        name: name,
        price: price,
        imga: image,
      })
      .catch((err) => console.log(err))

      .then(() => axios.get("http://localhost:4006/products"))
      .then((res) => setpcontext(res.data))
      .then(() => setedit(false));
  }

  function handleactivity(item) {
    const editingproduct = pcontext.find((p) => p.id === item.id);
    axios
      .patch(`http://localhost:4006/products/${editingproduct.id}`, {
        active: !editingproduct.active,
      })
      .then(() => axios.get("http://localhost:4006/products"))
      .then((res) => setpcontext(res.data));
  }

  return (
    <div className="productmanage">
      <h1 className="producthead">Manage products</h1>
      <div className="productfilters">
        <input
          type="text"
          value={search}
          onChange={(e) => setsearch(e.target.value)}
          placeholder="Search products..."
        />

        <select value={category} onChange={(e) => setcategory(e.target.value)}>
          <option value={""}>All category</option>
          <option value={"sunglasses"}>Sunglasses</option>
          <option value={"smart_glasses"}>Smart glasses</option>
        </select>
      </div>
      <div className="productlist">
        {filtered.map((item) => (
          <div className="admproductcard" key={item.id}>
            <img
              src={item.img}
              alt={item.name}
              className="productimg"
              style={{ height: "auto", width: "100px" }}
            />
            <div className="productinfo">
              <h3>{item.name}</h3>
              <p>${item.price}</p>
              <span className="categorytag">{item.category}</span>
            </div>
            <div className="productactions">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={item.active}
                  onChange={() => handleactivity(item)}
                />
                <span className="slider"></span>
              </label>
              <p className="status-text">
                status: {item.active ? "Active" : "Not Active"}
              </p>
              <button className="editbtn" onClick={() => handleedit(item)}>
                 Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {edit && (
        <div className="modal-overlay">
          <div className="modal-content">
            <form onSubmit={handlesubmit}>
              <h2>Edit Product</h2>

              <label>Edit name</label>
              <input value={name} onChange={(e) => setname(e.target.value)} />

              <label>Edit Price</label>
              <input value={price} onChange={(e) => setprice(e.target.value)} />

              <label>Edit description</label>
              <input
                value={description}
                onChange={(e) => setdescription(e.target.value)}
              />

              <label>Edit category</label>
              <input
                value={categoryedit}
                onChange={(e) => setcategoryedit(e.target.value)}
              />

              <label>Change image</label>
              <input value={image} onChange={(e) => setimage(e.target.value)} />

              <div className="modal-actions">
                <button type="submit"> Save Changes</button>
                <button type="button" onClick={() => setedit(false)}>
                   Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
