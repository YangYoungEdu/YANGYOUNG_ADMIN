import { useState } from "react";
import styled from "styled-components";
import StudentAdd from "../StudentComponents/StudentModal/StudentAdd";
import { MainDiv } from "../../style/CommonStyle";
import StudentHide from "./StudentModal/StudentHide";

const GeneralTableMenus = ({
  isEditing,
  setIsEditing,
  setIsHidden,
  isHidden,
  totalElements,
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isHideModalOpen, setIsHideModalOpen] = useState(false);

  const setEdit = () => {
    setIsEditing(true);
  };

  const goToSave = () => {
    setIsHidden(true);
  };

  const openAddModal = () => {
    setIsAddModalOpen(!isAddModalOpen);
  };

  const openHideModal = () => {
    setIsHideModalOpen(!isHideModalOpen);
  };

  return (
    <MainDiv>
      {/* 보관함 들어온 경우 */}
      <Top>
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
            <EditButton
              onClick={openHideModal}
            >
              퇴원처리
            </EditButton>
          </EditModeButtons>
        ) : (
          // 편집 모드가 아닌 경우
          <SideMenus>
            <>
              <div onClick={goToSave}>보관함</div>
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
      </Top>
    </MainDiv>
  );
};

const Top = styled.div`
display: flex;
flex-direction: column;
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
  margin-top: 40px;
  align-items: center;
`;

const EditModeButtons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
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
cursor: pointer;
`;
const SideMenus = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

export default GeneralTableMenus;
export { Top, TableMenusStyle,EditModeButtons,SideMenus};
