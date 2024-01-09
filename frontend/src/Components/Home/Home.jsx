//import './Home.css'
import { useState } from 'react'
import user_icon from '../Assets/person.png'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
//import 'bootstrap/dist/css/bootstrap.css';
const Home = ()=>{
    const navigate = useNavigate()
    const [shortURL,setShortURL] = useState("");
    const [longURL,setLongURL] = useState("");
    const [display,setDisplay] = useState("none");


    async function handleLogout(event){
        event.preventDefault();
        localStorage.setItem("token","");
        navigate("/");
    }


    async function handleURL(event){
        event.preventDefault()
        if(longURL===""){
            alert("Please provide URL");
            return;
        }
        try {
            const token = localStorage.getItem("token");
            let config = {
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                
            }
            const urlData=await axios.post("/user/url-shortener", {
            url: longURL
            },config);
            if(urlData.data.success){
                setShortURL(urlData.data.short_url)
                setDisplay("block")
            }else{
                alert(urlData.data.message);
            }
          } catch (err) {
            alert(err);
          }
    }
    return (
       <div className="container">
            <div className="header">
                <div className="text">Home</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                <div className="input">
                    <img src={user_icon} alt="" />
                    <input type="text" id="url" placeholder='Enter your URL Here...' onChange={(event)=>{setLongURL(event.target.value)}}/>
                </div>
            </div>
            <div className="submit-container">
                <div className="submit" onClick={handleURL}>Shorten it!</div>
                <div className="submit" onClick={handleLogout}>Logout</div>
            </div>
            <div className="short-url" style={{display: display}}>
                <p>{shortURL}</p>
               
            </div>
       </div>
    )
}

export default Home