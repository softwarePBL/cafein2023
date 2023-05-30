import MyReview from "../routes/MyReview";

const ReviewEdit = () => {
    const user = authService.currentUser;
    const [editing, setEditing] = useState(false);
    const [newReview, setNewReview] = useState(userreviewObj.text);
    const [userReviews, setUserReviews] = useState([]);

    useEffect(() => {
        const q = query(
            collection(dbService, 'userReviews'),
            where('creatorId', '==', user.uid) );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userReviewArray = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id, }));
      setUserReviews(userReviewArray);
    }); }, [user]);

    const toggleEditing = () => {
        setEditing((prev)=>!prev);
    };

    const onChange = (event) => { const { target: {value}, } = event; setNewReview(value); };

    const onSubmit = async (event) => {
        event.preventDefault();
        await updateDoc(doc(dbService, `userReviews/${userreviewObj.id}`), {text: newReview });
        setEditing(false); 
    };

    return (
        <div>
            <> 
                <form onSubmit={onSubmit}> 
                    <input onChange={onChange} value={newReview} required/> 
                    <input type="submit" value="변경하기 "></input> </form>
                <button onClick={toggleEditing}> 취 소 </button>
            </>
        </div>
    ); };

export default ReviewEdit;
