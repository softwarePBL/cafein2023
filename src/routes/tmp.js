// ChangeAddress 수정 전
/*
import React, { useCallback, useState, useEffect } from "react";
import Modal from "../components/Modal";
import DaumPostcode from "react-daum-postcode";
import { useNavigate } from "react-router-dom";
import { dbService, authService } from "../fbase";
import { getFirestore, addDoc, getDocs, updateDoc, doc, where, collection, query, onSnapshot } from "firebase/firestore";

function ChangeAddress() {
  const user = authService.currentUser;
  const [modalVisible, setModalVisible] = useState(false);
  const [isOpenSecondPopup, setIsOpenSecondPopup] = useState(false);
  const [newaddress, setNewAddress] = useState(null);
  const [newpostCodes, setNewPostCodes] = useState(null);
  const [newdetailAddress, setNewDetailAddress] = useState("");

  const navigate = useNavigate();
  const openModal = useCallback(() => { setModalVisible(true); }, []);
  const closeModal = useCallback(() => { setModalVisible(false); }, []);
  const onChange = useCallback((e) => { setNewDetailAddress(e.target.value); }, []);

  const handleComplete = useCallback((data) => {
    let fullAddress = data.address;
    let extraAddress = "";
    let zoneCodes = data.zonecode;
    if (data.addressType === "R") {
      if (data.bname !== "") {extraAddress += data.bname; }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    setNewAddress(fullAddress);
    setNewPostCodes(zoneCodes);
    setIsOpenSecondPopup(true);
  }, []);

  useEffect(() => {
    const q = query(
      collection(dbService, 'Address'),
      where('creatorId', '==', user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userAddressArray = snapshot.docs.map((doc) =>({
        ...doc.data(),
        id: doc.id,
      }));
      setNewAddress(userAddressArray);
  }); }, [user]);

  const onSubmit = async (event) => {
        event.preventDefault();
        try {          
          const q = query(
            collection(dbService, 'Address'),
            where('creatorId', '==', user.uid) );
          await updateDoc(doc(dbService, q), {
            address: newaddress,
            postCodes: newpostCodes,
            detailAddress: newdetailAddress,
            InputTime : Date.now(),
          });
          setNewAddress(newaddress + newdetailAddress);
          console.log("Data added successfully!");

        } catch (error) {
          console.error("Error adding data:", error);
        }
    };

  const onClick = useCallback(
    (e) => {
      e.preventDefault();
      setIsOpenSecondPopup(false);
      closeModal(false);
    },
    [closeModal, newaddress, newdetailAddress]
  );
  
  const inputserver = async (e) => {
    const { target: { name, value } } = e; 
        if (name === "detail") {
            setNewDetailAddress(value); 
        } else if (name === "postcode") {
            setNewPostCodes(value);
        }
    };

  return (
    <>
      <form onSubmit={onSubmit}>
        <button onClick={openModal}> 주소 조회 </button>
        {modalVisible && (
          <Modal visible={modalVisible} closable={true} maskClosable={true} onClose={closeModal} >
            <DaumPostcode name="postcode" onComplete={handleComplete} className="post-code" />
            {isOpenSecondPopup && (
              <div>
                <h3>상세 주소 입력</h3>
                <input name="detail" placeholder="상세 주소를 입력해 주세요" onChange={onChange} value={newdetailAddress} />
                <button type= "submit" onClick={onClick} >저장</button> </div> )}
          </Modal>
        )}
        {newaddress ? (
          <div> 
            <div className="text">우편번호 : {newpostCodes}</div> 
            <div className="text">주소 : {newaddress}</div> </div>
        ) : ( <div className="text">
            <span className="emph"></span> <br/></div> )}
          <button required>저장하기</button>
        </form>
    </>
  );
}

export default ChangeAddress;
*/