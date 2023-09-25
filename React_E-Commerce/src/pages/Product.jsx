import React, { useEffect, useState, useContext } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "../redux/action";
import { Navbar } from "../components";
import axios from 'axios';
import { UserContext } from './UserContextProvider';

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  const dispatch = useDispatch();

  // Retrieve user email from session storage
  const userEmailFromStorage = sessionStorage.getItem("userEmail");

  const addProduct = async (product) => {
    console.log("detailed product view", product);
    console.log("detailed product view user details", user);
    try {
      const response = await axios.post("http://localhost:3000/addToCart/", {
        email: userEmailFromStorage, // Use the retrieved email
        productid: product.id,
      });
      if (!response) {
        throw new Error("Network response was not ok");
      } else {
        console.log("Item added to the cart");
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
    dispatch(addCart(product));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch product details from your server using the product ID
        const response = await axios(`http://localhost:3000/api/products/${id}`);
        if (!response) {
          throw new Error("Network response was not ok");
        }
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

 
  const Loading = () => {
    return (
      <div className="container my-5 py-2">
        <div className="row">
          <div className="col-md-6 py-3">
            <Skeleton height={400} width={400} />
          </div>
          <div className="col-md-6 py-5">
            <Skeleton height={30} width={250} />
            <Skeleton height={90} />
            <Skeleton height={40} width={70} />
            <Skeleton height={50} width={110} />
            <Skeleton height={120} />
            <Skeleton height={40} width={110} inline={true} />
            <Skeleton className="mx-3" height={40} width={110} />
          </div>
        </div>
      </div>
    );
  };

  const ShowProduct = () => {
    return (
      <div className="container my-5 py-2">
        <div className="row">
          <div className="col-md-6 col-sm-12 py-3">
            <img
              className="img-fluid"
              src={product.image}
              alt={product.title}
              width="400px"
              height="400px"
            />
          </div>
          <div className="col-md-6 col-md-6 py-5">
            <h4 className="text-uppercase text-muted">{product.category}</h4>
            <h1 className="display-5">{product.title}</h1>
            <p className="lead">
              {product.rate}{" "}
              <i className="fa fa-star"></i>
            </p>
            <h3 className="display-6 my-4">₹{product.price}</h3>
            <p className="lead">{product.description}</p>
            <button
              className="btn btn-outline-dark"
              onClick={() => addProduct(product)}
            >
              Add to Cart
            </button>
            <Link to="/cart" className="btn btn-dark mx-3">
              Go to Cart
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">{loading ? <Loading /> : <ShowProduct />}</div>
      </div>
    </>
  );
};

export default Product;
