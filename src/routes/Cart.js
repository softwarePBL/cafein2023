import { dbService, authService } from 'fbase';
import React, { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot, getDocs, deleteDoc, doc } from 'firebase/firestore';
import CartInfo from '../routes/CartInfo';
// 장바구니

const Cart = () => {
  const [userCart, setUserCart] = useState([]);
  const [userPrice, setUserPrice] = useState(0);
  const user = authService.currentUser;

  useEffect(() => {
    const q = query(
      collection(dbService, 'Cart'),
      where('UserID', '==', user.uid)
    );
        
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userArray = snapshot.docs.map((doc)=>({
        ...doc.data(), 
        id: doc.id,}));
      setUserCart(userArray);
      let totalPrice = 0;
      for (let i = 0; i < userArray.length; i++) {
        if (userArray[i].ProductPrice !== undefined) {
          let productCount = userArray[i].productCount;
          let productprice = userArray[i].ProductPrice;
          let pr = productprice * productCount;
          totalPrice += productprice;
        }
        else {
          totalPrice += 0;
        }
      }
      setUserPrice(totalPrice);
    });       
    },[user]);

  return (
    <div>
      장바구니
      {userCart.map((userCart) => (
            <CartInfo 
              key={userCart.id} 
              cart={userCart}
              />  
      ))} 
      총 상품 금액 : 
        {userPrice}
    </div>
  );
};

export default Cart;