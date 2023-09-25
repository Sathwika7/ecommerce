import React, { useEffect, useContext, useState } from "react";
import { Navbar } from "../components";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Cart = () => {
  const [cartDetails, setCartDetails] = useState([]);
  const userEmailFromStorage = sessionStorage.getItem("userEmail");

  const EmptyCart = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-5 bg-light text-center">
            <h4 className="p-3 display-5">Your Cart is Empty</h4>
            <Link to="/product" className="btn  btn-outline-dark mx-4">
              <i className="fa fa-arrow-left"></i> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const fetchCartDetails = async () => {
    try {
      console.log("Fetching cart details for email:", userEmailFromStorage);
      const response = await axios.get("http://localhost:3000/cart", {
        params: {
          email: userEmailFromStorage, // Use the retrieved email
        },
      });
      console.log("Received cart details response:", response.data);
      setCartDetails(response.data);
    } catch (error) {
      console.error("Error fetching cart details:", error);
    }
  };

  useEffect(() => {
    if (userEmailFromStorage) {
      fetchCartDetails();
    }
 }, [userEmailFromStorage]);

  const addItem = async (product) => {
    console.log(userEmailFromStorage);
    console.log(product);
    console.log("user", userEmailFromStorage, "product", product);
    try {
      const response = await axios.post("http://localhost:3000/addToCart/", {
        email: userEmailFromStorage,
        productid: product.productid,
      });
      if (!response) {
        throw new Error("Network response was not ok");
      } else {
        toast.info("Item added to the cart");
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
    fetchCartDetails();
  };

  const removeItem = async (product) => {
    try {
      const response = await axios.post("http://localhost:3000/deleteFromCart/", {
        email: userEmailFromStorage,
        productid: product.productid,
      });
      if (!response) {
        throw new Error("Network response was not ok");
      } else {
        toast.info("Item deleted from the cart");
      }
    } catch (error) {
      console.error("Error deleting item from the cart:", error);
    }
    fetchCartDetails();
  };

  const ShowCart = () => {
        let subtotal = 0;
        let shipping = 30.0;
        let totalItems = 0;
    
        cartDetails.map((item) => {
          subtotal += item.price * item.quantity;
          totalItems += item.quantity;
          console.log("Item cost:", subtotal, totalItems);
          return item;
        });
    
        return (
          <>
            <section className="h-100 gradient-custom">
              <div className="container py-5">
                <div className="row d-flex justify-content-center my-4">
                  <div className="col-md-8">
                    <div className="card mb-4">
                      <div className="card-header py-3">
                        <h5 className="mb-0">Item List</h5>
                      </div>
                      <div className="card-body">
                        {cartDetails.map((item) => (
                          <div key={item.productid}>
                            <div className="row d-flex align-items-center">
                              <div className="col-lg-3 col-md-12">
                                <div
                                  className="bg-image rounded"
                                  data-mdb-ripple-color="light"
                                >
                                  <img
                                    src={item.image}
                                    alt={item.title}
                                    width={100}
                                    height={75}
                                  />
                                </div>
                              </div>
    
                              <div className="col-lg-5 col-md-6">
                                <p>
                                  <strong>{item.title}</strong>
                                </p>
                              </div>
    
                              <div className="col-lg-4 col-md-6">
                                <p className="text-start text-md-center">
                                  <strong>
                                    <span className="text-muted">{item.quantity}</span>{" "}
                                    x ₹{item.price}
                                  </strong>
                                </p>
                              </div>
                              <div
                                style={{
                                  maxWidth: "300px",
                                  display: "flex",
                                  flexDirection: "row",
                                }}
                              >
                                <button
                                  style={{
                                    backgroundColor: "white",
                                    color: "black",
                                    border: "none",
                                  }}
                                  onClick={() => {
                                    removeItem(item);
                                  }}
                                >
                                  <i className="fas fa-minus"></i>
                                </button>
    
                                <p className="mx-3">{item.quantity}</p>
    
                                <button
                                  style={{
                                    marginLeft: "-2%",
                                    backgroundColor: "white",
                                    color: "black",
                                    border: "none",
                                  }}
                                  onClick={() => {
                                    console.log("item details",item);
                                    addItem(item);
                                  }}
                                >
                                  <i className="fas fa-plus"></i>
                                </button>
                              </div>
                            </div>
    
                            <hr className="my-4" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card mb-4">
                      <div className="card-header py-3 bg-light">
                        <h5 className="mb-0">Order Summary</h5>
                      </div>
                      <div className="card-body">
                        <ul className="list-group list-group-flush">
                          <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                            Products ({totalItems})<span>₹{Math.round(subtotal)}</span>
                          </li>
                          <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                            Shipping
                            <span>₹{shipping}</span>
                          </li>
                          <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                            <div>
                              <strong>Total amount</strong>
                            </div>
                            <span>
                              <strong>₹{Math.round(subtotal + shipping)}</strong>
                            </span>
                          </li>
                        </ul>
    
                        <Link
                          to="/checkout"
                          className="btn btn-dark btn-lg btn-block"
                        >
                          Go to checkout
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        );
      };
    

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Cart</h1>
        <hr />
        {cartDetails.length > 0 ? <ShowCart /> : <EmptyCart />}
      </div>
    </>
  );
};

export default Cart;
