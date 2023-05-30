import React from 'react';
import {authService} from '../fbase';
import { HashRouter as BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./Navigation";
import UserInfoChange from "../routes/UserInfoChange";
import Auth from "../routes/Auth";
import UserInfo from "../routes/UserInfo";
import NewReview from "../routes/NewReview";
import MyReview from "../routes/MyReview";
import ModalPage from "../routes/ModalPage";
import ChangeAddress from "../routes/ChangeAddress";
import Cart from "../routes/Cart";
import Like from "../routes/Like";
import PWchange from 'routes/PWchange';
import ADChange from 'routes/ADChange';
import LookAddress from 'routes/LookAddress';
import MakeCart from 'routes/MakeCart';
const AppRouter = ({isLoggedIn, userObj}) => {
    return (
        <BrowserRouter>
            {isLoggedIn && <Navigation/>}
            <Routes>
                {isLoggedIn ? (
                <>
                    <Route exact path="/Cart/*" element = {<Cart/>} />
                    <Route exact path="/Like/*" element = {<Like/>} />
                    <Route exact path="/UserInfoChange/*" element = {<UserInfoChange/>} />
                    <Route exact path="/UserInfo/*" element ={<UserInfo/>}/>
                    <Route exact path="/NewReview" element ={<NewReview/>}/>
                    <Route exact path="/MyReview" element ={<MyReview/>}/>
                    <Route exact path="/ModalPage" element = {<ModalPage/>} />
                    
                    <Route exact path="/ChangeAddress" element = {<ChangeAddress/>}/>
                    <Route exact path="/PWChange" element = {<PWchange/>}/>

                    <Route exact path="/ADChange/*" element ={<ADChange/>}/>

                    <Route exact path="/MakeCart" element = {<MakeCart/>}/>

                </> 
                ): (
                    <Route exact path="/Auth/*" element ={<Auth/>}/>            
                )}
            </Routes>
        </BrowserRouter>
        )
}
export default AppRouter;