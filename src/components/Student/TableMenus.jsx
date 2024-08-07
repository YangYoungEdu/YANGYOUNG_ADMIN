import { useState } from "react";
import styled from "styled-components";
<<<<<<< HEAD:src/components/Student/TableMenus.jsx
import { MainDiv } from "../../style/CommonStyle";
import StudentAdd from "../Student/StudentModal/StudentAdd";
=======
import StudentAdd from "../StudentComponents/StudentModal/StudentAdd";
import { deleteStudentAPI, hideStudentAPI } from "../../API/StudentAPI";
import { useRecoilState } from "recoil";
import { selectedStudentState } from "../../Atom";
import { MainDiv } from "../../style/CommonStyle";
>>>>>>> 2e60c9fb9a18603c131dc4b6847cac09fd493bed:src/components/StudentComponents/TableMenus.js
import StudentHide from "./StudentModal/StudentHide";

const TableMenus = ({
  isEditing,
  setIsEditing,
  setIsHidden,
  isHidden,
  searchDataCount,
}) => {
<<<<<<< HEAD:src/components/Student/TableMenus.jsx
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isHideModalOpen, setIsHideModalOpen] = useState(false);
=======
  const [selectedStudent, setSelectedStudent] =
    useRecoilState(selectedStudentState);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isHideModalOpen, setIsHideModalOpen] = useState(false);

>>>>>>> 2e60c9fb9a18603c131dc4b6847cac09fd493bed:src/components/StudentComponents/TableMenus.js

  const setEdit = () => {
    setIsEditing(true);
  };

  const closeEdit = () =>{
    setIsEditing(false);
  }

  const goToSave = () => {
    setIsHidden(!isHidden);
    window.location.reload();
  };

  const openAddModal = () => {
    setIsAddModalOpen(!isAddModalOpen);
  };

  const openHideModal = () => {
    setIsHideModalOpen(!isHideModalOpen);
  };

<<<<<<< HEAD:src/components/Student/TableMenus.jsx
=======
  // const hideStudent = async () => {
  //   try {
  //     const response = await hideStudentAPI(selectedStudent);
  //     // window.location.reload();
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
>>>>>>> 2e60c9fb9a18603c131dc4b6847cac09fd493bed:src/components/StudentComponents/TableMenus.js
  return (
    <MainDiv>
      {/* 보관함 들어온 경우 */}
      {isHidden && (
        <TitleDiv>
          <div />
          <StyledH1>학생보관함</StyledH1>
        </TitleDiv>
      )}
      <TableMenusStyle>
        {isEditing ? (
          //편집 모드의 경우
          <div>전체선택</div>
        ) : (
          //편집 모드 아닌 경우
          <div>총 {searchDataCount}개</div>
        )}

        {isEditing ? (
          // 편집 모드의 경우
          <EditModeButtons>
<<<<<<< HEAD:src/components/Student/TableMenus.jsx
            <div onClick={closeEdit}>취소</div>
=======
>>>>>>> 2e60c9fb9a18603c131dc4b6847cac09fd493bed:src/components/StudentComponents/TableMenus.js
            <EditButton
              onClick={openHideModal}
            >
              퇴원처리
            </EditButton>
            {/* <EditButton
              onClick={deleteStudent}
              color="black"
              background="#EFEFEF"
            >
              삭제
            </EditButton>
            <EditButton color="white" background="#15521D">
              저장
            </EditButton> */}
          </EditModeButtons>
        ) : (
          // 편집 모드가 아닌 경우
          <SideMenus>
            <>
              <div onClick={goToSave}>{isHidden? "학생목록":"보관함"}</div>
              <div>|</div>
              <div onClick={openAddModal}>등록</div>
              <div>|</div>
            </>
            <div onClick={setEdit}>편집</div>
          </SideMenus>
        )}
      </TableMenusStyle>
      {/* 모달창들 */}
      {isAddModalOpen && <StudentAdd setIsAddModalOpen={setIsAddModalOpen} />}
      {isHideModalOpen && <StudentHide setIsHideModalOpen={setIsHideModalOpen} />}
    </MainDiv>
  );
};

const TitleDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledH1 = styled.h1`
  display: flex;
  font-size: 30px;
  font-weight: 700;
  margin-top: 41px;
`;

const TableMenusStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  white-space: nowrap;
  color: ${(props) => props.theme.colors.gray_003};
  font-size: ${(props) => props.theme.fontSizes.bodyText2};
  font-weight: 500;
  cursor: pointer;
  width: 1050px;
  margin-bottom: 14px;
  margin-top: 65px;
  align-items: center;
`;

const EditModeButtons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;

`;
const EditButton = styled.button`
  width: 84px;
  height: 31px;
  padding: 10px;
  border-radius: 5px;
  box-sizing: border-box;
  background: #efefef;
  font-family: Pretendard Variable;
  font-size: 14px;
  font-weight: 400;
  text-align: center;
  color: black;
line-height: 14px;
`;
const SideMenus = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

export default TableMenus;
