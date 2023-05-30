// 프로필 관리 ( 비밀번호 인증 다음 화면 )
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PWchange from './PWchange';
import UserInfoChange from './UserInfoChange';

const MNprofile = () => {
    const navigate = useNavigate();
    return (
         <div>
            계정 정보 <input type = "Submit" value="수정" onClick={()=> {navigate('/UserInfoChange');}}/> <br/>
            비밀번호 <input type = "submit" value="변경" onClick={() => {navigate('/PWchange');}}/>
        </div>
 );
};



export default MNprofile;