import { dbService, authService } from 'fbase';
import React, { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot, getDocs, deleteDoc, doc } from 'firebase/firestore';
import Likelist from './Likelist';
// 찜한 상품

const Like = () => {
  const [userLike, setUserLike] = useState([]);
  const user = authService.currentUser;

  useEffect(() => {
    const q = query(
      collection(dbService, 'Like'),
      where('UserID', '==', user.uid)
    );
        
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userArray = snapshot.docs.map((doc)=>({
        ...doc.data(), 
        id: doc.id,}));
      setUserLike(userArray);
    },[user]);
  });

  return (
    <div>
      찜한 상품<br/>
      {userLike.map((likes) => (
            <Likelist
              key={likes.id} 
              like={likes}
              />  
      ))} 
    </div>
  );
};

export default Like;