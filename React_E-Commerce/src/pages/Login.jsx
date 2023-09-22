import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../components";
import './login_register.css';

function Login() {
  const [userDetails, setUserDetails] = useState({
    email: '',
    password: ''
  });


  const inputHandler = (e) => {
    setUserDetails({ ...userDetails, [e.target.id]: e.target.value });
  }

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/logindata", userDetails);
      console.log(response);
      if (response.status === 200) {
        navigate("/home");
        alert("Login Successful");
      } else {
        console.log(userDetails);
        alert("Login error");
      }
    } catch (error) {
      alert("Please enter valid details");
    }
  };

  return (
    <>
      <Navbar />
      <div className="main-div">
        <h4 className="header">Login</h4>
        <form>
          <table className="signup-table">
            <tbody>
              <tr>
                <td>Email id: </td>
                <td>
                  <input type="email" id="email" placeholder="Email" onChange={inputHandler} required />
                </td>
              </tr>
              <tr>
                <td>Password: </td>
                <td>
                  <input type="password" id="password" placeholder="Password" onChange={inputHandler} required />
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <button className="pink-button" type="button" onClick={handleLogin}>Log In</button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
        <p>Not registered?&nbsp;
          <Link to="/register">Login here</Link>
        </p>
      </div>
    </>
  );
}

export default Login;
