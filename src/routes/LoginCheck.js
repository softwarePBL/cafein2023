import { onAuthStateChanged } from "firebase/auth";
import { authService } from "fbase";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyPageHome from "./MyPageHome";
import Auth from "./Auth";

const LoginCheck = () => {
    const navigate = useNavigate();
    onAuthStateChanged(authService, (user) => {
        if (user) { navigate("/MyPageRouter");
        } else{navigate("/Auth"); }});}; 

export default LoginCheck;
