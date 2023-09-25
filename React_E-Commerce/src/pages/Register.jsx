import React, { useState } from "react";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";
import "./login_register.css";
import { Navbar } from "../components";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Register() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [email, setEmail] = useState('');

const [userDetails,setUserDetails] = useState({
    username : "",
    password : '',
    email : ''
})

const inputHandler = (e) =>{   
  setUserDetails({...userDetails, [e.target.id] : e.target.value})
}

const navigate=useNavigate();
const handleSignUp = async() => {

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    /*Password should contain minimum 8 characters and should contain one uppercase, one lowercase and one special character*/
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[@#$%^&+=!])(?=.*\d).{8,}$/;
    if(userDetails.username == '' ||   userDetails.email == '' || userDetails.password == '')
    {
      toast.error("Please fill in all the fileds");
    }
    else
    {
      if(emailRegex.test(userDetails.email) && passwordRegex.test(userDetails.password))
      {
        try {
          const response=await axios.post("http://localhost:3000/registration", userDetails);
          console.log(response);
          if(response.status === 201)
          {
            toast.success("Registration successful"); 
          }
          else
          {
            toast.error("Signup error");
          }
          // alert("Registration Successful");
          navigate("/");
        } 
        catch(error) 
        {
          toast.error("Please enter valid details");
        }
      }
      else if(emailRegex.test(userDetails.email) === false)
      {
        toast.error("Please enter a valid email");
      }
      else
      {
        toast.error("Password should contain minimum 8 characters and should contain one uppercase letter, one lowercase letter and one special character");
      }
    }
  };
return (
 <>
 <Navbar/>
 <div className="main-div">
 <h4 className="header">Register</h4>
 <form>
     <table className="signup-table">
         <tbody>
             <tr>
                <td>Username: </td>
                <td>
                <input type="text" id="username" placeholder="UserName"  onChange={inputHandler} required/>
                </td>
             </tr>
             <tr>
                <td>Email id: </td>
                <td>
                  <input type="email" id="email" placeholder="Email"  onChange={inputHandler} required/>
                </td>
             </tr>
             <tr>
                <td>Password: </td>
                <td>
                <input type="password" id="password" placeholder="Password"  onChange={inputHandler} required/>
                </td>
             </tr>
             <tr>
                <td colSpan="2">
                  <button class="pink-button" type="button" onClick={handleSignUp}>Signup</button>
                </td>
             </tr>
         </tbody>
     </table>
 </form>
 <p>Already registered?&nbsp;
 <Link to="/">Login here</Link></p>
</div>
</>
);
}
export default Register;
