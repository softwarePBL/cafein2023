import { dbService, authService, storageService } from 'fbase';
import React,  { Component, useEffect, useState } from 'react';
import { getFirestore, addDoc, getDocs, collection, query, onSnapshot, orderBy, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import ReViewTmp from '../routes/ReViewTmp';
import { v4 as uuidv4 } from 'uuid';
import {ref, uploadString, getDownloadURL } from "firebase/storage";
import './NewReview.css'

const ReView = () => {
    const [userreview, setUserreview] = useState("");
    const [userreviews, setUserreviews] = useState([]); 
    const [attachment, setAttachment] = useState("");
    const user = authService.currentUser;

    useEffect(() => {
        const q = query(collection(dbService, "userReviews"));
        onSnapshot(q, (snapshot) => {
            const userreviewArray = snapshot.docs.map(doc => ({
                ...doc.data(), id: doc.id, 
            }));
            setUserreviews(userreviewArray);
        }); }, []);

    const onSubmit = async (event) => {
        event.preventDefault();        
        let attachmentURL = "";
        if (attachment !== ""){
            const attachmentRef = ref(storageService, `${user.uid}/${uuidv4()}`);
            const response = await uploadString(attachmentRef, attachment, 'data_url');
            attachmentURL = await getDownloadURL(response.ref);
        }

        const ReviewContent = {
            text: userreview,
            createdAt: Date.now(),
            creatorId: user.uid,
            reviewimage : attachmentURL, 
        };

        await addDoc(collection(dbService, "userReviews"), ReviewContent);
        setAttachment("");
    };

    const onChange = (event) => { 
        const { target: {value} } = event;  
        setUserreview(value); 
        console.log(setUserreview(value)) 
    };

    const onFileChange = (event) => {  // 사진 미리보기 만들기
        const { target: {files}, } = event; 
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent)  => {
            const {
                currentTarget: {result},
                } = finishedEvent;
                setAttachment(result);
        };
        reader.readAsDataURL(theFile);
    };

    const onClearAttachment = () => { setAttachment(""); };

    return (
            <div id="myPageReview"style={{fontSize:"1.3em", fontWeight:700, marginTop:"5%", marginBottom:"1%", marginLeft:"10%"}}>
          <h2>작성가능한 리뷰</h2>
        <div className="myPageReviewBack" method="post">
          <div style={{ marginLeft: "5%", marginTop: "2%" }}>
            <span style={{ fontWeight: 700, fontSize: "1.5rem"}}>리뷰 작성하기</span>
            <span style={{ fontWeight: 400, fontSize: "1.2rem" }}>&gt; 상품명</span>
          </div>
            <form onSubmit = {onSubmit} style={{display:"grid", marginTop:"5%", marginBottom:"3%"}}> 
                <input className="NewReviewArea"
                    value = {userreview} 
                    type = "text" 
                    placeholder = "당신의 솔직한 리뷰를 알려주세요 :)" 
                    maxLength = {120} 
                    onChange = {onChange} 
                /> <br/>
                <input className='NewReviewPicture' type="file" accept="image/*" onChange={onFileChange}/>
                <input className='NewReviewSubmit' type = "submit" value = "저장"/>
                {attachment && (
                    <div>
                        <img src = {attachment} width = "50px" height = "40px" />
                        <button onClick = {onClearAttachment}> X </button>
                    </div> 
                )} 
            </form>
        </div>
        </div>);
};

export default ReView;