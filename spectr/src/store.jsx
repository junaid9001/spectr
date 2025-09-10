import axios from "axios";
import "./components/store.css";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "./components/navbar";
import { CiSearch } from "react-icons/ci";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Wishlistcontext } from "./admin/createcontext";
import { Cartcontext } from "./admin/createcontext";
import { CiHeart } from "react-icons/ci";
import ReactPaginate from "react-paginate";
export default function Store() {
  const { setwcontext } = useContext(Wishlistcontext);
  const { setccontext } = useContext(Cartcontext);
  const [product, setproduct] = useState([]);
  const [search, setsearch] = useState("");
  const [brand, setbrand] = useState("");
  const [sort, setsort] = useState("");

  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 10;

  useEffect(() => {
    axios
      .get("http://localhost:4006/products")
      .then((res) => setproduct(res.data));
  }, []);

  function handlecart(item) {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("please login");
      return;
    }
    const cart = user.cart || [];
    const itemexist = cart.find((cartitem) => cartitem.productid === item.id);
    let updatedcart;
    if (itemexist) {
      updatedcart = cart.map((cartitem) =>
        cartitem.productid === item.id
          ? { ...cartitem, quantity: cartitem.quantity + 1 }
          : cartitem
      );
    } else {
      updatedcart = [...cart, { productid: item.id, quantity: 1 }];
    }

    axios
      .patch(`http://localhost:4006/users/${user.id}`, { cart: updatedcart })
      .then((res) => {
        const updateuser = { ...user, cart: res.data.cart };
        setccontext(res.data.cart);
        localStorage.setItem("user", JSON.stringify(updateuser));
        toast("item added to cart", {
          autoClose: 500,
          theme: "dark",
          position: "top-right",
        });
      })
      .catch((err) => console.log(err));
  }

  function handlewishlist(item) {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("pleae login");
      return;
    }

    const wishlist = user.wishlist || [];

    const itemexist = wishlist.find((Wishitem) => Wishitem.id === item.id);

    if (itemexist) {
      toast("Item already in wishlist", {
        autoClose: 500,
        theme: "dark",
        position: "top-right",
      });
      return;
    }

    const updatedwishlist = [...wishlist, item];

    axios
      .patch(`http://localhost:4006/users/${user.id}`, {
        wishlist: updatedwishlist,
      })
      .then((res) => {
        const updateduser = { ...user, wishlist: res.data.wishlist };
        localStorage.setItem("user", JSON.stringify(updateduser));
        setwcontext(res.data.wishlist);
        toast("Item added to wishlist", {
          autoClose: 500,
          theme: "dark",
          position: "top-right",
        });
      })
      .catch((err) => console.log(err));
  }

  let filtered = product
    .filter(
      (item) =>
        item.active &&
        item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    )
    .filter((item) => (brand === "" ? true : item.brand === brand));
  if (sort === "low-high") {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (sort === "high-low") {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  }

  {/*const pageCount = Math.ceil(filtered.length / productsPerPage);
  const currentProducts = filtered.slice(
    currentPage * productsPerPage,
    (currentPage + 1) * productsPerPage
  );*/}

  return (
    <>
      <Navbar />
      <div className="store">
        <div className="controls">
          <div className="search-wrapper">
            <CiSearch className="search-icon" />
            <input
              type="search"
              value={search}
              onChange={(e) => setsearch(e.target.value)}
              placeholder="Search item..."
              className="searchbar"
            />
          </div>

          <select value={brand} onChange={(e) => setbrand(e.target.value)}>
            <option value="">All Brands</option>
            <option value="Dystopian Verge">Dystopian</option>
            <option value="Ray-Ban Meta">Ray-Ban Meta</option>
            <option value="Gentle Monster">Gentle monster</option>
            <option value="Cartier">Cartier</option>
            <option value="XREAL">XREAL</option>
            <option value="Lenovo">Lenovo</option>
            <option value="Rokid">Rokid</option>
            <option value="Oakley">Oakley</option>
            <option value="Solos">Solos</option>
            <option value="MYKITA">Mykita</option>
          </select>

          <select value={sort} onChange={(e) => setsort(e.target.value)}>
            <option value="low-high">price low to high</option>
            <option value="high-low">price high to low</option>
          </select>
        </div>

        <div className="productgrid">
          {filtered.map((item) => (
            <div key={item.id} className="productcard">
              <Link to={`/product_details/${item.id}`} className="productlink">
                <img
                  src={item.img}
                  alt={item.name}
                  className="productimage"
                />
                <span
                  className="wishicon"
                  onClick={(e) => {
                    e.preventDefault();
                    handlewishlist(item);
                  }}
                  
                >
                  <CiHeart size={"25px"} color="grey"></CiHeart>
                </span>
                <h2 className="product-name">{item.name}</h2>
                <p className="product-price">₹{item.price}</p>
              </Link>
              <hr className="product-separator" />
              <button onClick={() => handlecart(item)}>Add to cart</button>
            </div>
          ))}
        </div>

        {/*<ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={(selected) => setCurrentPage(selected.selected)}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />*/}
      </div>
      <ToastContainer />
    </>
  );
}
