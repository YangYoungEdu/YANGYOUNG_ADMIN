import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import Select from "react-select";
import { MainDiv } from "../../style/CommonStyle";
import { ReactComponent as DOpen } from "../../Assets/DropdownOpened.svg";
import { ReactComponent as DClose } from "../../Assets/DropdownClosed.svg";
import { ReactComponent as DBtn } from "../../Assets/DropdownBtn.svg";
import { searchStudent } from "../../API/StudentAPI";
import { useRecoilState } from "recoil";
import { totalElementsState, isHiddenState } from "../../Atom";
import GeneralTableMenus from "./GeneralTableMenus";
import IsHiddenTableMenus from "./IsHiddenTableMenus";

const options = [
  { value: "M3", label: "중3" },
  { value: "H1", label: "고1" },
  { value: "H2", label: "고2" },
  { value: "H3", label: "고3" },
];

const StudentSearch = ({ isEditing, setIsEditing }) => {
  const [totalElements, setTotalElements] = useRecoilState(totalElementsState);
  const [isHidden, setIsHidden] = useRecoilState(isHiddenState);

  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    searchStudent();
  }, []);

  return (
    <MainDiv>
      <DropdownContainer>
        {/* 버튼 박스 */}
        {!isHidden && (
          <DropdownButton isOpen={isOpen} onClick={toggleDropdown}>
            학생 검색하기
            {/* 아이콘 */}
            {isOpen ? <DOpen /> : <DClose />}
          </DropdownButton>
        )}
        {/* isOpen인 경우 드롭다운 형식으로 서치박스 나타남 */}
        {isOpen && (
          <DropdownContent>
            <SearchArea>
              <SearchOptions>
                <SearchField>
                  <div>힉생 이름</div>
                  <SearchInput
                    type="text"
                    placeholder="학생 이름을 입력해주세요"
                  />
                </SearchField>
                <SearchField>
                  <div>학교 이름</div>
                  <SearchInput
                    type="text"
                    placeholder="학교 이름을 입력해주세요"
                  />
                </SearchField>
                <SearchField>
                  <div>학년</div>
                  <CustomSelect options={options} />
                  {/* <SelectField>
                    <option value="none" disabled selected>
                      학년 선택
                    </option>
                    <option value="M3">중3</option>
                    <option value="H1">고1</option>
                    <option value="H2">고2</option>
                    <option value="H3">고3</option>
                    <DBtn />
                  </SelectField> */}
                </SearchField>
              </SearchOptions>

              {/* 서치 박스 내부 버튼들 */}
              <ButtonArea>
                <div />
                <ButtonGap>
                  <StyledButton background={"#F1F1F1"} color={"black"}>
                    초기화
                  </StyledButton>
                  <StyledButton background={"#15521D"} color={"white"}>
                    검색
                  </StyledButton>
                </ButtonGap>
              </ButtonArea>
            </SearchArea>
          </DropdownContent>
        )}
      </DropdownContainer>

      {/* 버튼 영역 */}
      {!isHidden ? (
        <GeneralTableMenus
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          setIsHidden={setIsHidden}
          isHidden={isHidden}
          totalElements={totalElements}
        />
      ) : (
        <IsHiddenTableMenus
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          setIsHidden={setIsHidden}
          isHidden={isHidden}
          totalElements={totalElements}
        />
      )}
    </MainDiv>
  );
};

// 드롭다운 나타날 때 애니메이션
const slideIn = keyframes`
  from {
    transform: translateY(-10px);
    opacity: 0;
  }
  to {
    transform: translateY(0); 
    opacity: 1;
  }
`;

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.div`
  width: 1050px;
  height: 58px;
  box-sizing: border-box;
  line-height: 58px;
  display: flex;
  justify-content: space-between;
  padding-left: 34px;
  padding-right: 34px;
  margin-top: 60px;
  border-radius: 100px;
  border-width: 0px 0px 1px 0px;
  border-style: solid;
  border-color: #d5d5d5;
  box-shadow: ${(props) =>
    props.isOpen ? "0px 2px 4px 0px #00000040" : "0px 0px 0px 1px #15521D"};
  border-top-left-radius: ${(props) => (props.isOpen ? "10px" : "100px")};
  border-top-right-radius: ${(props) => (props.isOpen ? "10px" : "100px")};
  border-bottom-left-radius: ${(props) => (props.isOpen ? "0px" : "100px")};
  border-bottom-right-radius: ${(props) => (props.isOpen ? "0px" : "100px")};
  color: ${(props) => (props.isOpen ? "#000000" : "#BABABA")};
  font-weight: 500px;
  font-size: ${(props) => props.theme.fontSizes.textField1};
  align-items: center;
`;

const DropdownContent = styled.div`
  box-sizing: border-box;
  gap: 36px;
  padding-top: 41px;
  padding-left: 34px;
  padding-right: 34px;
  height: 195px;
  background-color: white;
  display: none;
  position: absolute;
  width: 1050px;
  box-shadow: 0px 4px 4px 0px #00000040;

  animation: ${slideIn} 0.3s ease;

  z-index: 1;

  ${DropdownContainer} & {
    display: flex;
  }

  border-top-left-radius: 0; /* Square top-left corner */
  border-top-right-radius: 0px; /* Rounded top-right corner */
  border-bottom-right-radius: 10px; /* Rounded bottom-right corner */
  border-bottom-left-radius: 10px; /* Rounded bottom-left corner */
`;

const SearchArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 51px;
`;

const SearchOptions = styled.div`
  display: flex;
  flex-direction: row;
  gap: 36px;
`;

const SearchField = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12.5px;
  align-items: center;
`;
const CustomSelect = styled(Select)`
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  width: 101px;
  height: 42px;
  padding: 10px 15px;
  gap: 8px;
  border-radius: 100px;
  background: #fbfbfd;
  border: 1px solid #e0e0e0;
  font-family: Pretendard Variable;
  font-size: 14px;
  font-weight: 400;
  box-shadow: none;

  &:focus {
    border: 1px solid #15521d;
  }

  /* &--menu-is-open {
        border-color: transparent;
        box-shadow: none; */

  /* &:hover {
          border-color: transparent;
        } */

  /* svg {
          color: white;
        } */
  /* } */

  &__menu {
    margin-top: 15px;
    top: calc(100% - 2px);
    box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.16);
    border-top: 0;

    &-list {
      padding: 0;
      justify-content: center;
      align-items: center;
    }
  }

  &__option {
    height: 40px;
    display: flex;
    align-items: center;
    padding: 9px 0px 9px 15px;
    border-top: 1px solid gray;
    color: black;
    background-color: white;

    &--is-selected {
      font-weight: bold;
    }

    &--is-focused {
      box-shadow: none;
      background-color: gray;
    }
  }
`;
const SelectField = styled.select`
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  width: 101px;
  height: 42px;
  padding: 10px 15px 10px 15px;
  gap: 8px;
  border-radius: 100px;
  border: 1px;
  background: #fbfbfd;
  border: 1px solid #e0e0e0;
  &:focus {
    border: 1px solid #15521d;
  }
  font-family: Pretendard Variable;
  font-size: 14px;
  font-weight: 400;
`;

const SearchInput = styled.input`
  box-sizing: border-box;
  width: 190px;
  height: 42px;
  padding: 10px 15px 10px 15px;
  gap: 10px;
  border-radius: 100px;
  border: 1px 0px 0px 0px;
  opacity: 0px;
  background: #fbfbfd;
  border: 1px solid #e0e0e0;
  &:focus {
    border: 1px solid #15521d;
  }
  &::placeholder {
    //styleName: text field 2;
    font-family: Pretendard Variable;
    font-size: 15px;
    font-weight: 400;
    line-height: 17.9px;
    text-align: left;
    color: #bababa;
  }
`;

const ButtonArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ButtonGap = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
`;

const StyledButton = styled.button`
  box-sizing: border-box;
  background: ${({ background }) => background};
  color: ${({ color }) => color};
  width: 88px;
  height: 39px;
  text-align: center;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #479051;
  }
  font-size: 14px;
  font-weight: 400;
`;

export default StudentSearch;
