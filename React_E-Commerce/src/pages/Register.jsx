// import React from 'react'
// import { Navbar } from "../components";
// import { Link } from 'react-router-dom';
// const Register = () => {
//     return (
//         <>
//             <Navbar />
//             <div className="container my-3 py-3">
//                 <h1 className="text-center">Register</h1>
//                 <hr />
//                 <div class="row my-4 h-100">
//                     <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
//                         <form>
//                             <div class="form my-3">
//                                 <label for="Name">Full Name</label>
//                                 <input
//                                     type="email"
//                                     class="form-control"
//                                     id="Name"
//                                     placeholder="Enter Your Name"
//                                 />
//                             </div>
//                             <div class="form my-3">
//                                 <label for="Email">Email address</label>
//                                 <input
//                                     type="email"
//                                     class="form-control"
//                                     id="Email"
//                                     placeholder="name@example.com"
//                                 />
//                             </div>
//                             <div class="form  my-3">
//                                 <label for="Password">Password</label>
//                                 <input
//                                     type="password"
//                                     class="form-control"
//                                     id="Password"
//                                     placeholder="Password"
//                                 />
//                             </div>
//                             <div className="my-3">
//                                 <p>Already has an account? <Link to="/login" className="text-decoration-underline text-info">Login</Link> </p>
//                             </div>
//                             <div className="text-center">
//                                 <button class="my-2 mx-auto btn btn-dark" type="submit" disabled>
//                                     Register
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Register
// import React, { useState } from "react";
// import axios from "axios";
// import { Link,useNavigate } from "react-router-dom";
// import "./login_register.css";
// import { Navbar } from "../components";
// function Register() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [email, setEmail] = useState('');
//   const navigate=useNavigate();
//   const handleSignup = async() => {
    
//     const userdetails= {
//       username,
//       password,
//       email
//     };
//     const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
//     /*Password should contain minimum 8 characters and should contain one uppercase, one lowercase and one special character*/
//     const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[@#$%^&+=!])(?=.*\d).{8,}$/;
//     if(emailRegex.test(email) && passwordRegex.test(password))
//     {
//       try {
//         const response=await axios.post("http://localhost:3000/registration", userdetails); 
//         if(response.status === 201)
//         {
//           alert("Successfully registered");
//         }
//         else
//         {
//           alert("Signup error");
//         }
//         // alert("Registration Successful");
//         navigate("/");
//       } 
//       catch(error) 
//       {
//         alert("Please enter valid details");
//       }
//     }
//     else if(emailRegex.test(email) === false)
//     {
//       alert("Please enter a valid email");
//     }
//     else
//     {
//       alert("Password should contain minimum 8 characters and should contain one uppercase letter, one lowercase letter and one special character");
//     }
//   };
// return (
//  <>
//  <Navbar/>
//  <div className="main-div">
//  <h4 className="header">Register</h4>
//  <form>
//      <table className="signup-table">
//          <tbody>
//              <tr>
//                 <td>Username: </td>
//                 <td>
//                 <input type="text" id="username" placeholder="UserName" value={username} onChange={(e) => setUsername(e.target.value)} required/>
//                 </td>
//              </tr>
//              <tr>
//                 <td>Email id: </td>
//                 <td>
//                   <input type="email" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
//                 </td>
//              </tr>
//              <tr>
//                 <td>Password: </td>
//                 <td>
//                 <input type="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
//                 </td>
//              </tr>
//              <tr>
//                 <td colSpan="2">
//                   <button type="button" onClick={handleSignup}>Signup</button>
//                 </td>
//              </tr>
//          </tbody>
//      </table>
//  </form>
//  <p>Already registered?&nbsp;
//  <Link to="/login">Login here</Link></p>
// </div>
// </>
// );
// }
// export default Register;


import React, { useState } from "react";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";
import "./login_register.css";
import { Navbar } from "../components";
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


const HandleSignUp = async() =>{
    const response=await axios.post("http://localhost:3000/registration", userDetails);
    console.log(response);
}
  const navigate=useNavigate();
//   const handleSignup = async() => {
    
//     // const userdetails= {
//     //   username,
//     //   password,
//     //   email
//     // };
//     const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
//     /*Password should contain minimum 8 characters and should contain one uppercase, one lowercase and one special character*/
//     const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[@#$%^&+=!])(?=.*\d).{8,}$/;
//     if(emailRegex.test(userdetails.email) && passwordRegex.test(userDetails.password))
//     {
//       try {
//         const response=await axios.post("http://localhost:3000/registration", userdetails); 
//         if(response.status === 201)
//         {
//           alert("Successfully registered");
//         }
//         else
//         {
//           alert("Signup error");
//         }
//         // alert("Registration Successful");
//         navigate("/");
//       } 
//       catch(error) 
//       {
//         alert("Please enter valid details");
//       }
//     }
//     else if(emailRegex.test(email) === false)
//     {
//       alert("Please enter a valid email");
//     }
//     else
//     {
//       alert("Password should contain minimum 8 characters and should contain one uppercase letter, one lowercase letter and one special character");
//     }
//   };
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
                  <button type="button" onClick={HandleSignUp}>Signup</button>
                </td>
             </tr>
         </tbody>
     </table>
 </form>
 <p>Already registered?&nbsp;
 <Link to="/login">Login here</Link></p>
</div>
</>
);
}
export default Register;
