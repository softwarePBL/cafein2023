import { dbService, authService, storageService } from 'fbase';
import React,  { Component, useEffect, useState } from 'react';
import { getFirestore, addDoc, getDocs, collection, query, onSnapshot, orderBy, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import ReViewTmp from '../routes/ReViewTmp';
import { v4 as uuidv4 } from 'uuid';
import {ref, uploadString, getDownloadURL } from "firebase/storage";

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
        <div>
            <form onSubmit = {onSubmit}> 
                <input 
                    value = {userreview} 
                    type = "text" 
                    placeholder = "당신의 솔직한 리뷰를 알려주세요 :)" 
                    maxLength = {120} 
                    onChange = {onChange} 
                /> <br/>
                <input type="file" accept="image/*" onChange={onFileChange}/>
                <input type = "submit" value = "저장"/>
                {attachment && (
                    <div>
                        <img src = {attachment} width = "50px" height = "40px" />
                        <button onClick = {onClearAttachment}> X </button>
                    </div> 
                )} 
            </form>
            <div>
                {userreviews.map((userreview) => (
                    <ReViewTmp 
                        key={userreview.id} 
                        userreviewObj={userreview} 
                        isOwner={userreview.creatorId === user.uid}
                    />
                ))}
            </div>
        </div> );
};

export default ReView;