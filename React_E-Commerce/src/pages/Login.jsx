// import React from "react";
// import { Link } from "react-router-dom";
// import { Navbar } from "../components";
// const Login = () => {
//   return (
//     <>
//       <Navbar />
//       <div className="container my-3 py-3">
//         <h1 className="text-center">Login</h1>
//         <hr />
//         <div class="row my-4 h-100">
//           <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
//             <form>
//               <div class="my-3">
//                 <label for="display-4">Email address</label>
//                 <input
//                   type="email"
//                   class="form-control"
//                   id="floatingInput"
//                   placeholder="name@example.com"
//                 />
//               </div>
//               <div class="my-3">
//                 <label for="floatingPassword display-4">Password</label>
//                 <input
//                   type="password"
//                   class="form-control"
//                   id="floatingPassword"
//                   placeholder="Password"
//                 />
//               </div>
//               <div className="my-3">
//                 <p>New Here? <Link to="/register" className="text-decoration-underline text-info">Register</Link> </p>
//               </div>
//               <div className="text-center">
//                 <button class="my-2 mx-auto btn btn-dark" type="submit" disabled>
//                   Login
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Login;
import React, { useState } from "react";
import axios from "axios";
import { Link,useNavigate} from "react-router-dom"; // Make sure this import is present
// import { useUser } from './UserContext';
import { Navbar } from "../components";
import './login_register.css';function Register() {
  //   const [username, setUsername] = useState('');
  //   const [password, setPassword] = useState('');
  //   const [email, setEmail] = useState('');
  
  const [userDetails,setUserDetails] = useState({
      email : '',
      password : ''
  })
  
  const inputHandler = (e) =>{
     
  setUserDetails({...userDetails, [e.target.id] : e.target.value})
  
  }
  
  const navigate=useNavigate();
  const handleLogin = async() => {
  try {
      const response=await axios.post("http://localhost:3000/logindata", userDetails);
      console.log(response);
      if(response.status === 201)
      {
        navigate("/");
        alert("Login Successful");
      }
      else
      {
        alert("Login error");
      }
      } 
      catch(error) 
      {
        alert("Please enter valid details");
      }
    };
  return (
   <>
   <Navbar/>
   <div className="main-div">
   <h4 className="header">Login</h4>
   <form>
       <table className="signup-table">
           <tbody>
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
                    <button type="button" onClick={handleLogin}>Log In</button>
                  </td>
               </tr>
           </tbody>
       </table>
   </form>
   <p>Not registered?&nbsp;
   <Link to="/register">Login here</Link></p>
  </div>
  </>
  );
  }
  export default Register;
  