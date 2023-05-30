// 게시글 삭제, 수정
import { deleteDoc, doc, updateDoc } from "@firebase/firestore";
import { dbService, authService, storageService } from "fbase";
import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { deleteObject, ref } from "firebase/storage";

const ReviewTmp = ({userreviewObj, isOwner}) => {
    const user = authService.currentUser;
    const [editing, setEditing] = useState(false);
    const [newReview, setNewReview] = useState(userreviewObj.text);

    const onDeleteClick = async () => {
        const ok = window.confirm("삭제하시겠습니까?");
        if (ok) { await deleteDoc(doc(dbService, `userReviews/${userreviewObj.id}`));
                if(userreviewObj.attachmentURL !=="")
                    await deleteDoc(doc(dbService, userreviewObj.attachmentURL));
        }
    };
    
    const toggleEditing = () => setEditing((prev) => !prev);

    const onChange = (event) => { const { target: {value}, } = event; setNewReview(value); };

    const onSubmit = async (event) => {
        event.preventDefault();
        await updateDoc(doc(dbService, `userReviews/${userreviewObj.id}`), {text: newReview });
        setEditing(false); 
    };

    return (
        <div>
            {editing ? (
                <> 
                <form onSubmit={onSubmit}> 
                    <input onChange={onChange} value={newReview} required/> 
                    <input type="submit" value="변경하기 "></input> </form>
                <button onClick={toggleEditing}> 취 소 </button>
                </>
            ) : (
                <> 
                    <h4>{userreviewObj.text}</h4>
                    {userreviewObj.reviewimage && (
                        <img src={userreviewObj.reviewimage} width="200px" height="150px" /> )}
                    {isOwner && (
                        <> 
                            <button onClick={onDeleteClick}> 삭 제 </button>
                            <button onClick={toggleEditing}> 수 정 </button>
                        </>
                    )}
                </>
            )}
        </div>
    ); };

export default ReviewTmp;