import React, { useState } from 'react'
import { updateDoc, deleteDoc, doc } from '@firebase/firestore'
import {authService, dbService } from 'fbase'
 
const Review = ({ userreviewObj}) => {
  const [editing, setEditing] = useState(false);
  const [toggleAccount, setToggleAccount] = useState(false);
  
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this review?");
    if (ok) {
      await deleteDoc(doc(dbService, "userReviews", `${userreviewObj.id}`));
    }
  };

  <div>
    <h4>{userreviewObj.text}</h4>
    <button>Delete</button>
    <button>Edit</button>

  </div>
};
 
export default Review;