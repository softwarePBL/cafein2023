import { getAuth, updatePassword } from 'firebase/auth';
import React, { useState } from 'react';
import './PWchange.css';
import { authService } from '../fbase';
import { useNavigate } from 'react-router-dom';

const PWchange = () => {
    const user = authService.currentUser;
    const [Prepswd, setPrepswd] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [Newpswdcheck,setNewpswdcheck] = useState("");
    const [error, setError] = useState(""); 
    const navigate = useNavigate();

    const errorMessage = {
        "auth/weak-password": "비밀번호는 6자리 이상이어야 합니다.",
        "auth/requires-recent-login": "비밀번호를 변경한지 오래되었습니다. 다시 로그인해주세요.",
        "auth/user-not-found": "존재하지 않는 사용자입니다.",
        "auth/wrong-password": "비밀번호가 틀렸습니다.",
        "auth/email-already-in-use": "이미 사용중인 이메일입니다.",
        "auth/invalid-email": "이메일 주소가 유효하지 않습니다.",
        "auth/operation-not-allowed": "이메일/비밀번호 계정이 비활성화되었습니다.",
        "auth/account-exists-with-different-credential": "이미 같은 이메일 주소로 다른 소셜 계정이 존재합니다.",
        "auth/invalid-credential": "잘못된 비밀번호입니다.",    
    };

    const onSubmit = (event) => {
        event.preventDefault();
        try {
            if (Prepswd == user.Password) {
                if(newPassword == Newpswdcheck){
                    const res = updatePassword(user, newPassword);
                    setNewPassword("");
                }
            }
        } catch ({ code, message }) {
            console.log(code);
            alert(errorMessage[code]);
        }
    };

    const onChange = (event) => {
        const {target: {name, value}} = event;
        if(name === "prepassword"){ setPrepswd(value);
        }   else if(name === "newpassword"){ setNewPassword(value);
        }   else if(name === "passwordcheck"){ setNewpswdcheck(value); } };

      return (
        <div className="myPageAccount">
            <h2>계정 관리</h2>
            <div className="myPageAccountBackground">
                <h4 className="myPageAccountBackgroudTitle">비밀번호 변경</h4>
                <form onSubmit={onSubmit}>
                        <input className="inputPassword" name="prepassword" type="password" value = {Prepswd} placeholder="기존 비밀번호" onChange={onChange} required/><br/>
                        <input className="inputPassword" name="newpassword" type="password" value = {newPassword} placeholder="새 비밀번호" onChange={onChange} required/><br/>
                        <input className="inputPassword" name="passwordcheck" type="password" value = {Newpswdcheck} placeholder="새 비밀번호 확인" onChange={onChange} required/><br/>
                        <input className="passwordEdit"type="submit" onClick={()=>{navigate('/PWResult')}} value="비밀번호 변경" />              
                </form>
            </div>
        </div>
    )
};

export default PWchange;

  
