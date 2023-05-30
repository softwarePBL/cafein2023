import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => <nav>
    <ul>
        <li><Link to="/Cart"> 장바구니 </Link></li>
        <li><Link to="/Like"> 찜한 상품 </Link></li>
        <li><Link to="/UserInfoChange"> 회원정보 변경 </Link></li>
        <li><Link to="/ChangeAddress"> 주소 변경 </Link></li>
        <li><Link to="/UserInfo"> 회원정보 </Link></li>
        <li><Link to="/NewReView"> 리뷰 작성페이지 </Link></li>
        <li><Link to="/MyReview"> 리뷰 목록 보기 </Link></li>
        <li><Link to="/ModalPage"> 주소 저장 </Link></li>
        <li><Link to="/PWchange">비밀번호 변경</Link></li>
        <li><Link to="/ADChange"> 주소 변경 </Link></li>
        <li><Link to="/MakeCart"> 카트 정보 넣기 </Link></li>
    </ul>
</nav>;

export default Navigation;
