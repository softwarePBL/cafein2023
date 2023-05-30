import { dbService, authService } from 'fbase';
import React, { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import ReviewED from './ReviewED';

{/*Written Review*/}
const MyReview = () => {
  const [userReviews, setUserReviews] = useState([]);
  const user = authService.currentUser;

  useEffect(() => {
    const q = query(
      collection(dbService, 'userReviews'),
      where('creatorId', '==', user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userReviewArray = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id, }));
      setUserReviews(userReviewArray);
    }); }, [user]);

  return (
    <div>
      {userReviews.map((userReview) => (
        <ReviewED
          key={userReview.id}
          reviewObj={userReview}
          isOwner={true} // Assuming the current user is the owner
        />
      ))}
    </div>
  );
};

export default MyReview;