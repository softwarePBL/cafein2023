import { getFirestore, addDoc, doc, updateDoc, deleteDoc, getDocs, collection, query, onSnapshot, orderBy, serverTimestamp } from "firebase/firestore";
import { dbService, authService, storageService } from "fbase";
import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { deleteObject, ref, uploadString, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';

const Likelist = ({like, isOwner}) => {
    const user = authService.currentUser;

    const onDeleteClick = async () => {
            await deleteDoc(doc(dbService, `Like/${like.id}`));
            if(like.ProductImg !== "") {
                await deleteDoc(doc(dbService, like.ProductImg));
            }
    };

    return(
        <>
         상품 <br/>
           상품이름 : {like.ProductName}<br/>
           <img src={like.ProductImg}/><br/>
           <button onClick={onDeleteClick}>X</button>
           <br/>
        </>
    );
};

export default Likelist;
