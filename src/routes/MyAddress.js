import { dbService, authService } from 'fbase';
import { collection, query, where, addDoc, getDocs, onSnapshot, updateDoc } from 'firebase/firestore';
import LookAddress from '../routes/LookAddress';
import React, {useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MyAddress = () => {
  const [userAddress, setUserAddress] = useState([]);
  const user = authService.currentUser;

  useEffect(() => {
    const q = query(
      collection(dbService, 'Address'),
      where('CreatorId', '==', user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userArray = snapshot.docs.map((doc)=>({
        ...doc.data(), 
        id: doc.id,}));
        setUserAddress(userArray);
      }); },[user]);
      
  return (
    <div>
      <h4> 기존 저장된 주소 </h4>
      {userAddress.map((address) => (
        <LookAddress
          key={address.id}
          Address={address}
      />))}
    </div>
  );
};

export default MyAddress;