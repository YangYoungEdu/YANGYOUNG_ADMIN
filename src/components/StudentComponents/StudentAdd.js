import styled from "styled-components";
import { ReactComponent as XIcon } from "../../Assets/XIcon.svg";

const StudentAdd = ({ setIsModalOpen }) => {
  // 모달 외부 클릭시 모달을 닫는 함수
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
    }
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <Modal>
        {/* 상단 */}
        <FirstDiv>
          <h1>학생 등록</h1>
          <XIcon onClick={() => setIsModalOpen(false)} />
        </FirstDiv>

        {/* 중간 폼 영역 */}
        <StyledForm>
          <OneForm>
            <label>아이디</label>
            <StyledInput type="text" width="576px" placeholder="입력" />
          </OneForm>
          <TwoForms>
            <OneForm>
              <label>성</label>
              <StyledInput type="text" width="272px" placeholder="입력" />
            </OneForm>
            <OneForm>
              <label>이름</label>
              <StyledInput type="text" width="272px" placeholder="입력" />
            </OneForm>
          </TwoForms>
          <TwoForms>
            <OneForm>
              <label>학교</label>
              <StyledInput type="text" width="272px" placeholder="입력" />
            </OneForm>
            <OneForm>
              <label>학년</label>
              <StyledInput type="text" width="272px" placeholder="입력" />
            </OneForm>
          </TwoForms>
        </StyledForm>

        {/* 하단 버튼들 */}
        <ThirdDiv>
          <div />
          <div>
            <StyledButton1>학생 파일 업로드</StyledButton1>
            <StyledButton2>저장</StyledButton2>
          </div>
        </ThirdDiv>
      </Modal>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 998; /* Modal보다 뒤에 배치 */
`;

const Modal = styled.div`
  width: 885px;
  height: 555px;
  border-radius: 10px;
  background: #fff;
  display: flex;
  flex-direction: column;
  padding: 32.37px 60px;
  box-sizing: border-box;
  z-index: 999;
`;

const FirstDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  h1 {
    font-family: Pretendard Variable;
    font-size: 30px;
    font-weight: 700;
    line-height: 35.8px;
    text-align: left;
  }
  svg {
    cursor: pointer;
  }
  margin-bottom: 65.35px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 38px;

  label {
    font-family: Pretendard Variable;
    font-size: 14px;
    font-weight: 600;
  }
`;

const OneForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const TwoForms = styled.div`
  display: flex;
  flex-direction: row;
  gap: 32px;
`;
const StyledInput = styled.input`
  width: ${(props) => props.width};
  height: 42px;
  padding: 10px 10px 10px 18px;
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid #e0e0e0;
  &::placeholder {
    color: #bababa;
    //styleName: text field 2;
    font-family: Pretendard Variable;
    font-size: 15px;
    font-weight: 400;
  }
`;

const ThirdDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 84px;
  box-sizing: border-box;
`;

const StyledButton1 = styled.button`
  width: 137px;
  height: 51px;
  padding: 16px 16px 16px 16px;
  border-radius: 5px;
  box-sizing: border-box;
  background: #e9f2eb;
  color: black;
  white-space: nowrap;
  text-align: center;
  font-family: Pretendard Variable;
  font-size: 16px;
  font-weight: 500;
  margin-right: 13px;
`;

const StyledButton2 = styled.button`
  width: 102px;
  height: 51px;
  padding: 16px 16px 16px 16px;
  border-radius: 5px;
  box-sizing: border-box;
  background: #15521d;
  color: white;
  white-space: nowrap;
  text-align: center;
  font-family: Pretendard Variable;
  font-size: 16px;
  font-weight: 500;
`;

export default StudentAdd;
