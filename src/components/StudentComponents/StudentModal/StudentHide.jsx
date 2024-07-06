import styled from "styled-components";
import { useRecoilState } from "recoil";
import { selectedStudentState } from "../../../Atom";
import { hideStudentAPI } from "../../../API/StudentAPI";

const StudentHide = ({ setIsHideModalOpen }) => {
  const [selectedStudent, setSelectedStudent] =
    useRecoilState(selectedStudentState);
  // 모달 외부 클릭시 모달을 닫는 함수
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsHideModalOpen(false);
    }
  };

  const hideStudent = async () => {
    try {
      console.log (selectedStudent);
      const response = await hideStudentAPI(selectedStudent);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Overlay onClick={handleOverlayClick}>
      <Modal>
        정말로 퇴원처리하시겠습니까?
        <br />
        퇴원처리한 학생은 보관함에서 볼 수 있습니다.
        {/* 하단 버튼들 */}
        <ButtonDiv>
          <div />
          <div>
            <StyledButton
              background={"#F1F1F1"}
              color={"black"}
              onClick={handleOverlayClick}
            >
              아니오
            </StyledButton>
            <StyledButton
              background={"#15521D"}
              color={"white"}
              onClick={hideStudent}
            >
              네
            </StyledButton>
          </div>
        </ButtonDiv>
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
  width: 385px;
  height: 180px;
  border-radius: 10px;
  background: #fff;
  display: flex;
  flex-direction: column;
  padding-top: 31px;
  padding-left: 29px;
  box-sizing: border-box;
  z-index: 999;

  font-family: Pretendard Variable;
  font-size: 16px;
  font-weight: 600;
`;

const ButtonDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 35px;
  box-sizing: border-box;
`;

const StyledButton = styled.button`
  width: 106px;
  height: 51px;
  padding: 10px;
  border-radius: 5px;
  box-sizing: border-box;
  background: #e9f2eb;
  background: ${({ background }) => background};
  color: ${({ color }) => color};
  white-space: nowrap;
  text-align: center;
  font-family: Pretendard Variable;
  font-size: 16px;
  font-weight: 500;
  margin-right: 13px;
  cursor: pointer;
`;

export default StudentHide;
