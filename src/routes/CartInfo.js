import { getFirestore, addDoc, doc, updateDoc, deleteDoc, getDocs, collection, query, onSnapshot, orderBy, serverTimestamp } from "firebase/firestore";
import { dbService, authService, storageService } from "fbase";
import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { deleteObject, ref, uploadString, getDownloadURL } from "firebase/storage";
import MyReview from '../routes/MyReview'
import { v4 as uuidv4 } from 'uuid';
import '../routes/NewReview.css'

const CartInfo = ({cart, isOwner}) => {
    const user = authService.currentUser;
    const [Count, setCount] = useState(cart.countNumber);

    const onDeleteClick = async () => {
            await deleteDoc(doc(dbService, `userReviews/${cart.id}`));
            if(cart.ProductImg !== "") {
                await deleteDoc(doc(dbService, cart.ProductImg));
            }
    };

    const onChange = (event) => { 
        const { target: {name, value} } = event; 
        if(name === "Count") {
            setCount(value);
        }
    };

    const NumberChange  = (event) => {
        const newNumber ={
            countNumber: Count
        }
        updateDoc(doc(dbService, `Cart/${cart.id}`), newNumber);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
    };

    return(
        <>
         상품<br/>
           상품이름 : {cart.ProductName}<br/>
           <img src={cart.ProductImg}/><br/>
           상품 가격 : {cart.ProductPrice}<br/>
           상품 설명 : {cart.ProductText}<br/>
           <input name="Count" type="number" value={cart.countNumber} onChange={NumberChange}/><br/>
           상품 갯수 : {cart.countNumber}<br/>
           <br/>
        </>
    );
};

export default CartInfo;
