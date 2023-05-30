// 회원가입 완료 페이지
import { useNavigate } from "react-router-dom";
import Home from "routes/Home";
const SignUpDone = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1> 회원가입이 완료되었습니다. </h1>
            <button onClick={()=> navigate('/Home')}>홈으로</button>
        </div>
    );
}

export default SignUpDone;
