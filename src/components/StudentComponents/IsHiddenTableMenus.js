import { useState } from "react";
import styled from "styled-components";
import { MainDiv } from "../../style/CommonStyle";
import StudentDelete from "./StudentModal/StudentDelete";
import {
  Top,
  TableMenusStyle,
  EditModeButtons,
  SideMenus,
} from "./GeneralTableMenus";
import { restoreStudentAPI } from "../../API/StudentAPI";
import { useRecoilState } from "recoil";
import { selectedStudentState } from "../../Atom";

const IsHiddenTableMenus = ({
  isEditing,
  setIsEditing,
  setIsHidden,
  isHidden,
  totalElements,
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] =
    useRecoilState(selectedStudentState);

  const setEdit = () => {
    setIsEditing(true);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  const restoreStudent = () => {
    try {
      const response = restoreStudentAPI(selectedStudent);
      console.log(response);
      alert("선택한 학생이 복구처리 되었습니다.");
    } catch (error) {
      console.error(error);
    }
    window.location.reload();
  };

  return (
    <MainDiv>
      {/* 보관함 들어온 경우 */}
      <Top>
        <TitleDiv>
          <StyledH1>학생보관함</StyledH1>
          <div />
        </TitleDiv>

        <TableMenusStyle>
          {isEditing ? (
            //편집 모드의 경우
            <div>전체선택</div>
          ) : (
            //편집 모드 아닌 경우
            <div>총 {totalElements}개</div>
          )}

          {isEditing ? (
            // 편집 모드의 경우
            <EditModeButtons>
              <EditButton onClick={restoreStudent}>복구</EditButton>
              <EditButton onClick={openDeleteModal}>삭제</EditButton>
            </EditModeButtons>
          ) : (
            // 편집 모드가 아닌 경우
            <SideMenus>
              <div onClick={setEdit}>편집</div>
            </SideMenus>
          )}
        </TableMenusStyle>
        {/* 모달창들 */}
        {isDeleteModalOpen && (
          <StudentDelete setIsDeleteModalOpen={setIsDeleteModalOpen} />
        )}
      </Top>
    </MainDiv>
  );
};

const TitleDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 41px;
`;

const StyledH1 = styled.h1`
  display: flex;
  font-size: 30px;
  font-weight: 700;
`;

const EditButton = styled.button`
  width: 60px;
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

export default IsHiddenTableMenus;
