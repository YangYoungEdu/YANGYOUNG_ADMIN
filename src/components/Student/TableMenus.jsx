import { useState } from "react";
import styled from "styled-components";
import { MainDiv } from "../../style/CommonStyle";
import StudentAdd from "../Student/StudentModal/StudentAdd";
import StudentHide from "./StudentModal/StudentHide";
import { isUnregisteredState } from "../../Atom";
import { useRecoilState } from "recoil";
import { getUnregisteredStudentRefreshAPI } from "../../API/StudentAPI";

const TableMenus = ({
  isEditing,
  setIsEditing,
  setIsHidden,
  isHidden,
  searchDataCount,
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isHideModalOpen, setIsHideModalOpen] = useState(false);
  const [isUnregistered, setIsUnregistered] =
    useRecoilState(isUnregisteredState);

  const setEdit = () => {
    setIsEditing(true);
  };

  const closeEdit = () => {
    setIsEditing(false);
  };

  const goToSave = () => {
    setIsHidden(!isHidden);
    window.location.reload();
  };

  const goToUnregistered = () => {
    setIsUnregistered(!isUnregistered);
    window.location.reload();
  };

  const openAddModal = () => {
    setIsAddModalOpen(!isAddModalOpen);
  };

  const openHideModal = () => {
    setIsHideModalOpen(!isHideModalOpen);
  };

  const handleRefresh = async () => {
    getUnregisteredStudentRefreshAPI();
  };
  return (
    <MainDiv>
      {/* 보관함 들어온 경우 */}
      {isHidden && !isUnregistered && (
        <TitleDiv>
          <div />
          <StyledH1>학생보관함</StyledH1>
        </TitleDiv>
      )}
      {isUnregistered && !isHidden && (
        <TitleDiv>
          <div />
          <StyledH1>미등록 학생 조회</StyledH1>
        </TitleDiv>
      )}
      <TableMenusStyle>
        {isEditing ? (
          //편집 모드의 경우
          <div>전체선택</div>
        ) : (
          //편집 모드 아닌 경우
          <div>총 {searchDataCount}명</div>
        )}

        {isEditing ? (
          // 편집 모드의 경우
          <EditModeButtons>
            <div onClick={closeEdit}>취소</div>
            <EditButton onClick={openHideModal}>퇴원처리</EditButton>
          </EditModeButtons>
        ) : (
          // 편집 모드가 아닌 경우
          <SideMenus>
            <>
              {!isHidden && (
                <>
                  <div onClick={goToUnregistered}>
                    {isUnregistered ? "학생목록" : "미등록 학생"}
                  </div>
                  <div>|</div>
                </>
              )}
              {isUnregistered && (
                <StyledButton onClick={handleRefresh}>동기화</StyledButton>
              )}
              <div onClick={goToSave}>
                {isHidden ? "학생목록" : isUnregistered ? "" : "보관함"}
              </div>{" "}
              {!isUnregistered && <div>|</div>}
              <div onClick={openAddModal}>{isUnregistered ? "" : "등록"}</div>
              {!isUnregistered && <div>|</div>}
            </>
            <div onClick={setEdit}>{isUnregistered ? "" : "편집"}</div>
          </SideMenus>
        )}
      </TableMenusStyle>
      {/* 모달창들 */}
      {isAddModalOpen && <StudentAdd setIsAddModalOpen={setIsAddModalOpen} />}
      {isHideModalOpen && (
        <StudentHide setIsHideModalOpen={setIsHideModalOpen} />
      )}
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
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const StyledButton = styled.button`
  padding: 5px 10px;
  box-sizing: border-box;
  border: 1px solid #e0e0e0;
  background-color: white;
  border-radius: 5px;
  cursor: pointer;
`;

export default TableMenus;
