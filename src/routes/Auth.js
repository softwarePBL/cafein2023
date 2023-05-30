import React, { useState } from 'react';
import { authService } from '../fbase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import UserInfo from '../routes/UserInfo';
import './Auth.css';
import logo from './logo_2.jpg';
import GoogleLogin from './btn_google_signin_light_normal_web.png';

const Auth = () => {
    const navigate = useNavigate();
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true); 
    const [error, setError] = useState(""); 

    const onSubmit = (event) => {
        event.preventDefault();
        try{
            let data;
            if(newAccount){
                createUserWithEmailAndPassword(authService, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log(user);  })
            } else {
                signInWithEmailAndPassword(authService, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log(user);
                })
            }
        } catch(error){
            setError(error.message);
        }
        navigate('/UserInfo');
    };

    const toggleAccount = () => setNewAccount((prev) => !prev);

    const onSocialClick = async (event) => {
        const { target: {name},} = event;
        let provider;
        if (name === "google"){ provider = new GoogleAuthProvider(); }
        const data = await signInWithPopup(authService, provider);
        navigate('/UserInfo');
    };

    const onChange = (event) => {
        const {target: {name, value}} = event;
        if(name === "email"){ setEmail(value);
        }   else if(name === "password"){ setPassword(value); } };

        return (
                <>
                <div className='table-container'>
                    <table>              
                            <tr>
                                <td className='logoWrap'> <img src={logo} className="logo_img" alt="logo" /> </td>
                                <td className="LoginTitle"> Cafe인 </td>
                            </tr>
                    </table>
                </div>
                <div className='LoginConts'>
                    <form onSubmit={onSubmit}>
                        <input name="email" type="text" className='LoginEmail' placeholder="Email" required value={email} onChange={onChange} />
                        <input name="password"  className='LoginPassword' type="password" placeholder="Password" required value={password} onChange={onChange} />
                        <input type="submit" className = 'AuthSubmit' value={newAccount ? "회원가입" : "로그인"} />
                        {error}
                    </form>
                        <div className='SignToggle' onClick={toggleAccount}>{newAccount ? "로그인" : "회원가입"}</div>
                        <img className='G-SingIn' src={GoogleLogin} onClick={onSocialClick} name="google" alt="구글로 로그인" />
                </div>
            </>
             );
        }
    

export default Auth; 
