import React,{useState} from 'react'
import './LoginSignup.css'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import user_icon from '../Assets/person.png'
import email_icon  from '../Assets/email.png'
import password_icon from '../Assets/password.png'


const LoginSignup = ()=>{
    const [action,setAction] = useState("Sign Up")
    //const [token,setToken] = useState(null)
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    async function handleSignUp(event){
        event.preventDefault();
        //console.log("Fun called");
        if(action==="Login"){
            setAction("Sign Up");
            return;
        }
        setAction("Sign Up");
        try {
            if(userName==="")
            {
                alert("User Name can not be empty...");
                return
            }
            await axios.post("/user/sign-up", {
            user_name: userName,
            email: email,
            password: password,
            });
            alert("User Registation Successfully");
            //navigate('/');
            setUserName("");
            setEmail("");
            setPassword("");
  
          } catch (err) {
            alert(err);
          }
    }

    async function handleLogIn(event){
        event.preventDefault();
        //console.log("Fun called");
    //    const loginState = useContext(LoginContext);
        if(action==="Sign Up"){
            setAction("Login");
            return;
        }
        //setAction("Login");
        try {
            const userData=await axios.post("/user/login-by-email", {
            user_name: userName,
            email: email,
            password: password,
            });
            console.log(userData.data);
            alert("User logged in Successfully");
            localStorage.setItem("token",userData.data.token);
            //setIsLoggedIn(true);
            navigate("/home")
  
          } catch (err) {
            alert(err);
          }
    }
   return ( 
    <div className='container'>
        <div className="header">
            <div className="text">{action}</div>
            <div className="underline"></div>
        </div>
        <div className="inputs">
            {
            action==="Login"?<div></div>: 
            <div className="input">
                <img src={user_icon} alt="" />
                <input type="text" id="name" placeholder='Enter your Name' value={userName} onChange={(event)=>{setUserName(event.target.value)}}/>
            </div>
            }
           
            <div className="input">
                <img src={email_icon} alt="" />
                <input type="email" id="email" placeholder='Enter your Email' value={email} onChange={(event)=>{setEmail(event.target.value)}}/>
            </div>
            <div className="input">
                <img src={password_icon} alt="" />
                <input type="password" id="password" placeholder='Enter your password' value={password} onChange={(event)=>{setPassword(event.target.value)}}/>
            </div>
        </div>
        {action==="Sign Up"?<div></div>: <div className="forgot-password">Forgot Password?<span>Click Here!</span></div>}
        <div className="submit-container">
            <div className={action==="Login"?"submit gray":"submit"} onClick={handleSignUp}>Sing Up</div>
            <div className={action==="Sign Up"?"submit gray":"submit"} onClick={handleLogIn}>Login</div>
        </div>

    </div>
   )
}

export default LoginSignup