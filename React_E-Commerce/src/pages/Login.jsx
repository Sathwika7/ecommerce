import React, { useState , useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../components";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
    if(userDetails.email != '' && userDetails.password != '')
    {
      try {
        const response = await axios.post("http://localhost:3000/logindata", userDetails);
        console.log(response);
        if (response.status === 200) {
          const user = response.data.user;
          // setUser(user);
          // Store user email in session storage
          sessionStorage.setItem("userEmail", user.email);
          toast.success("Login successful");
          navigate("/home");
        } else {
          console.log(userDetails);
          toast.error("Login error");
        }
      } catch (error) {
        toast.error("Please enter valid details");
      }
    }
    else
    {
      toast.error("Please fill in all the fileds");
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
