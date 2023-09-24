import React, {useContext, useEffect, useState} from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { UserContext } from "../pages/UserContextProvider";
import axios from 'axios';
const Navbar = () => {
    const state = useSelector(state => state.handleCart);
    const { user } = useContext(UserContext); 
    const [cartDetails, setCartDetails] = useState([]);
    useEffect(() => {
        // Fetch cart details when the component mounts or when the user changes
        if (user && user.email) {
          fetchCartDetails();
        }
      }, [user]);
    
      const fetchCartDetails = async () => {
        try {
          console.log("Fetching cart details for email:", user.email);
          const response = await axios.get("http://localhost:3000/cart", {
            params: {
              email: user.email,
            },
          });
          console.log("Received cart details response:", response.data);
          setCartDetails(response.data);
        } catch (error) {
          console.error("Error fetching cart details:", error);
        }
      };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top">
            <div className="container">
                <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/"> React Ecommerce</NavLink>
                <button className="navbar-toggler mx-2" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav m-auto my-2 text-center">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/home">Home </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/product">Products</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/about">About</NavLink>
                        </li>
                    </ul>
                    <div className="buttons text-center">
                        <NavLink to="/" className="btn btn-outline-dark m-2"><i className="fa fa-sign-in-alt mr-1"></i> Login</NavLink>
                        <NavLink to="/register" className="btn btn-outline-dark m-2"><i className="fa fa-user-plus mr-1"></i> Register</NavLink>
                        <NavLink to="/cart" className="btn btn-outline-dark m-2"><i className="fa fa-cart-shopping mr-1"></i> Cart ({cartDetails.length}) </NavLink>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar