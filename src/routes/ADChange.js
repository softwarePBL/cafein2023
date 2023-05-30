import React, { useCallback, useState } from "react";
import Modal from "../components/Modal";
import DaumPostcode from "react-daum-postcode";
import { useNavigate } from "react-router-dom";
import { dbService, authService } from "../fbase";
import { getFirestore, addDoc, getDocs, where, collection, query, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";

function ADChange(){
  const user = authService.currentUser;
  const [modalVisible, setModalVisible] = useState(false);
  const [isOpenSecondPopup, setIsOpenSecondPopup] = useState(false);
  const [address, setAddress] = useState(null);
  const [postCodes, setPostCodes] = useState(null);
  const [detailAddress, setDetailAddress] = useState("");
  const navigate = useNavigate();
  const openModal = useCallback(() => { setModalVisible(true); }, []);
  const closeModal = useCallback(() => { setModalVisible(false); }, []);
  const onChange = useCallback((e) => { setDetailAddress(e.target.value); }, []);

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
    //fullAddress -> 전체 주소반환
    setAddress(fullAddress);
    setPostCodes(zoneCodes);
    setIsOpenSecondPopup(true);
  }, []);
  
  const onSubmit = async (event) => {
        event.preventDefault();
        try {
          const userInformationRef = collection(dbService, "Address");
          await addDoc(userInformationRef, {
            Address: address,
            PostCodes: postCodes,
            DetailAddress: detailAddress,
            CreatorId: user.uid,
            InputTime : Date.now(),
          });
          setAddress(address + detailAddress);
          console.log("Data added successfully!");
        } catch (error) {
          console.error("Error adding data:", error);
        }
    };

  const onClick = useCallback(
    (e) => {
      e.preventDefault();
      // setAddress(address + detailAddress);
      setIsOpenSecondPopup(false);
      closeModal(false);
    },
    [closeModal, address, detailAddress]
    // setAddress]
  );
  
  const inputserver = async (e) => {
    const { target: { name, value } } = e; 
        if (name === "detail") {
            setDetailAddress(value); 
        } else if (name === "postcode") {
            setPostCodes(value);
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
                <input name="detail" placeholder="상세 주소를 입력해 주세요" onChange={onChange} value={detailAddress} />
                <button type= "submit" onClick={onClick} >저장</button> </div> )}
          </Modal>
        )}
        {address ? (
          <div> 
            <div className="text">우편번호 : {postCodes}</div> 
            <div className="text">주소 : {address}</div> </div>
        ) : ( <div className="text">
            <span className="emph"></span> <br/></div> )}
          <button required>정보 변경 완료하기</button>
        </form>
    </>
  );
}

export default ADChange;