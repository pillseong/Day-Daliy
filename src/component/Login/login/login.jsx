import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
// import DDlogo from "/DDlogo.webp";
import style from './login.module.css';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import moment from "moment";

 
export default function Login() {
  const [info, setInfo] = useState({
    email : '',
    password : ''
})
  const api = axios.create({
    baseURL: 'https://daisy.wisoft.io/yehwan/app1',
    withCredentials: true
  })

  const navigate = useNavigate();

  const handleLogin = async(e) =>{
    try{
      e.preventDefault();
      const res = await api.post("/auth/login", {
        email : info.email,
        password : info.password
      })
  console.log("success login", res.data);
  navigate('/');
    } catch(err) {
      if( err.response && err.response.status === 401 ){
        alert("아이디나 비밀번호를 확인해주세요. ")
        console.log("fail", err.response)
      } else{
        alert("Server Error")
      }
    }
   
}

  return (
    <div className={style.container}>
      <div className="logo">
      </div>
      <p className={style.headertext}>회원님의 정보를 입력해주세요 .</p>
      <div>
        <div>
        <input className={style.inputbox} 
        type="email" 
        id="email" 
        name="emailbox" 
        placeholder='이메일을 입력하세요.'
        onChange={(e)=> {
          setInfo({
            ...info,
            email : e.target.value,
          });
        }}
        ></input>
        </div>
        <br></br>
        <div>
        <input className={style.inputbox} 
        type="password" 
        id="password" 
        name="pwbox" 
        placeholder='비밀번호를 입력하세요.'
        onChange={(e)=> {setInfo({
          ...info,
          password : e.target.value,
        })}}
        ></input></div>

     <div className={style.GuideContainer}>
      <p className={style.GuideIdMessage}>아직 아이디가 없으시나요?</p> 
      <Link to="/join" className={style.SignUpLink}>회원 가입</Link>
     </div>
      </div>
     <button className={style.submitbutton}
     type="submit"
     onClick={handleLogin}> 
      Login</button>
     <div>
      <Link to ="/findinfo">
     <button className={style.findbutton}>Find Password</button>
     </Link>
     </div>
    </div>
  )
}
