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
import './login_register.css';
function Login() {
  const[email,setemail]=useState('');
  const[password,setpassword]=useState('');
  // const { setUser } = useUser(); 
  const navigate=useNavigate();
  const handlelogin=async(e)=>
  {
    const userlogindetails = {
      email,
      password,
    };
    e.preventDefault();
      try 
      {
        const response = await axios.post("http://localhost:3000/api/logindata", {userlogindetails});
        console.log(response.data);
        if (response.status === 200) 
        {
          // const user = response.data.user;
          // setUser(user);
          navigate('/');
        } 
        else if (response.status === 401) 
        {
          alert("Invalid Authentication Credentials");
        } 
        else 
        {
          alert("Login Error");
        }
      }
      catch(error) 
      {
        alert("Invalid Credentials");
      }  
    }
    return (
    <>
    <Navbar/>
    <div className="main-div">
      <h4 className="header">LogIn page</h4>
        <form>
            <table className="signup-table">
              <tr>
                  <td>Email id: </td>
                  <td>
                  <input type="email"  placeholder="email" value={email} onChange={(e)=>setemail(e.target.value)} required/>
                  </td>
                  </tr>
                  <tr>
                    <td>Password: </td>
                    <td>
                    <input type="password" id="password" placeholder="Password" value={password} onChange={(e)=>setpassword(e.target.value)} required/>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                    <button onClick={handlelogin}>Submit</button>
                    </td>
                  </tr>
                </table>
            </form>
            <p>Not a registered user?&nbsp;
            <Link to="/register">Register</Link></p>
      </div>
    </>
  );
}
export default Login;
