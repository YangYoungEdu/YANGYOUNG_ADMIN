import { useState } from "react";
import styled from "styled-components";
import StudentAdd from "./StudentAdd";
import { deleteStudentAPI, hideStudentAPI } from "../../API/StudentAPI";
import { useRecoilState } from "recoil";
import { selectedStudentState } from "../../Atom";
import { MainDiv } from "../../style/CommonStyle";

const TableMenus = ({
  isEditing,
  setIsEditing,
  setIsHidden,
  isHidden,
  totalElements,
}) => {
  const [selectedStudent, setSelectedStudent] =
    useRecoilState(selectedStudentState);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const setEdit = () => {
    setIsEditing(true);
  };

  const goToSave = () => {
    setIsHidden(!isHidden);
    window.location.reload();
  };

  const openModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const deleteStudent = async () => {
    try {
      const response = await deleteStudentAPI(selectedStudent);
      console.log(response);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const hideStudent = async () => {
    try {
      const response = await hideStudentAPI(selectedStudent);
      // window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };
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
          <div>전체 선택</div>
        ) : (
          //편집 모드 아닌 경우
          <div>총 {totalElements}개</div>
        )}

        {isEditing ? (
          // 편집 모드의 경우
          <EditModeButtons>
            <EditButton
              onClick={hideStudent}
              color="black"
              background="#EFEFEF"
            >
              보관
            </EditButton>
            <EditButton
              onClick={deleteStudent}
              color="black"
              background="#EFEFEF"
            >
              삭제
            </EditButton>
            <EditButton color="white" background="#15521D">
              저장
            </EditButton>
          </EditModeButtons>
        ) : (
          // 편집 모드가 아닌 경우
          <SideMenus>
            <>
              <div onClick={goToSave}>보관함</div>
              <div>|</div>
              <div onClick={openModal}>등록</div>
              <div>|</div>
            </>
            <div onClick={setEdit}>편집</div>
          </SideMenus>
        )}
      </TableMenusStyle>
      {isModalOpen && <StudentAdd setIsModalOpen={setIsModalOpen} />}
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
`;
const EditButton = styled.button`
  width: 60px;
  height: 31px;
  padding: 7px 17.5px 7px 17.5px;
  gap: 10px;
  border-radius: 5px;
  box-sizing: border-box;
  background: ${({ background }) => background};
  color: ${({ color }) => color};
  //styleName: Button 3;
  font-family: Pretendard Variable;
  font-size: 14px;
  font-weight: 400;
`;
const SideMenus = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

export default TableMenus;
