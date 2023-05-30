import {React, useState} from 'react';
import logo from "./logo_2.jpg";
import profile from "./coffeebean.png";
import './myPageDefault.css';
import Col from 'react-bootstrap/Col';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

/*
export function Header() {
      return(
      <div className="header">
        <div className="logo">
                  <img src={logo} className="logo_img" alt="logo" />
              </div>
              <span className="title">Cafe인</span>
              <span className="nav1">
                  <ul>
                      <li>
                          <href to="../coffee.html" style={{ fontSize: "2.2vw" }}> 
                              Shop
                          </href>
                      </li>
                      <li>
                          <href to="../login.html">Login</href>
                      </li>
                  </ul>
              </span>
              
        <div className="dropdown">
            <button type="button" className="dropdown_btn" id="img_btn">
                <img src={profile} />
            </button>
            <div className="dropdown_submenu">
            <div className="submenu_title">
                <b>My CafeIn</b>
                <a />
            </div>
            <div className="submenu_shopping">
                <a href="#" className='Cart'>장바구니</a>
            </div>
            <div className="submenu_interest">
                <a href="#" className='Interest'>
                <b>찜한 상품</b>
                </a>
            </div>
            <b href="#" className='Ordered'>주문 목록</b>
            <div className="submenu_review">
                <a href="#" className='Review'>
                <b>리뷰 관리</b>
                </a>
                <a href="#" className='Writable'>작성 가능한 리뷰</a>
                <a href="#" className='Written'>내가 작성한 리뷰</a>
            </div>
            <a href="#" className='User'>
                <b>계정 관리</b>
            </a>
            </div>
        </div>
        <div className="guest">guest1 님</div>
        </div>
    );
}

export function Remote(){
    return(
        
    <Col lg="3" md="3" sm="1" xs="1">
          <div className="myCafeIn">
                  <a href="/" className="myCafeInTitle">
                      My CafeIn
                  </a>
                  <ul className="list-group list-group-flush" style={{ listStyle: "none" }}>
                      <li>
                          <a href="/myPageCart">장바구니</a>
                      </li>
                      <hr />
                      <li>
                          <a href="myPageLike1.html">
                              찜한 상품
                          </a>
                      </li>
                      <hr/>
                      <li>
                          <a href="myPageOrdered1.html">주문 목록</a>
                      </li>
                      <hr />
                      <li>
                          <a href="myPageWritable1.html">리뷰 관리</a>
                      </li>
                      <li>
                          <a href="myPageWritable1.html" style={{ color: "#6F6F6F" }}>
                              작성가능한 리뷰
                          </a>
                      </li>
                      <li>
                          <a href="myPageWritten1.html" style={{ color: "#6F6F6F" }}>
                              내가 작성한 리뷰
                          </a>
                      </li>
                      <hr />
                      <li>
                          <a href="#">계정 관리</a>
                      </li>
                  </ul>
              </div>
              </Col>
      );
}

export function MyPageCount() {
    return(
        <div className="myCafeIn2">
            <table style={{ gridTemplateColumns: "1fr 1fr 1fr", textAlign: "center" }}>
            <tbody>
                <tr>
                    <td>주문/배송</td>
                    <td>장바구니</td>
                </tr>
                <tr>
                    <td id="orderCount">0</td>
                    <td id="cartCount">0</td> 값을 변경하는 기능 구현 필요.
                </tr>
            </tbody>
            </table>
        </div>
    );
}
*/