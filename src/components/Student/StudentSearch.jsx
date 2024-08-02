import { useEffect, useState } from "react";
import Select, { components } from "react-select";
import { useRecoilState } from "recoil";
import styled, { keyframes } from "styled-components";
import { ReactComponent as Cancel } from "../../Assets/Cancel.svg";
import { ReactComponent as DClose } from "../../Assets/DropdownClosed.svg";
import { ReactComponent as DOpen } from "../../Assets/DropdownOpened.svg";
import {
  currentPageState,
  totalElementsState,
  totalPageState,
} from "../../Atom";
import { MainDiv, RowDiv } from "../../style/CommonStyle";
import { ReactComponent as CustomArrowDown } from "../../Assets/dropdownicon.svg";

const options = [
  { value: "M3", label: "중3" },
  { value: "H1", label: "고1" },
  { value: "H2", label: "고2" },
  { value: "H3", label: "고3" },
];

const customStyle = {
  control: (provided, state) => ({
    ...provided,
    width: 102,// 너비를 300으로 설정
    margin: 0,
    padding: "0px 4px 0px 4px",
    border: state.isFocused ? '1px solid #15521D' : '1px solid #e0e0e0',  // 기본 테두리 설정
    borderRadius: 100, // 둥근 모서리 설정
    fontSize: 15,
    // padding: "0px 0px 0px 5px",
    color:"#bababa",
    backgroundColor: 'transparent',
    fontFamily: "Pretendard Variable",
    fontWeight: 400,
    boxShadow: 'none', // 기본 그림자 제거
    '&:hover': {
      border: state.isFocused ? '1px solid #15521D' : '1px solid #e0e0e0',  // 호버 시 border 없음
    },
  }),
  menu: (provided) => ({
    ...provided,
    marginTop: 15,
    // boxShadow: '0 3px 10px 0 rgba(0, 0, 0, 0.16)',
    borderTop: '0',
    width: 94, // 메뉴의 너비 설정
  }),
  option: (provided, state) => ({
    ...provided,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    color: state.isSelected ? 'white' : 'black',
    backgroundColor: state.isSelected ? '#479051' : state.isFocused ? '#E9F2EB' : 'white',
    cursor: 'pointer',
    '&:active': {
      backgroundColor: '#479051', // 클릭 시 배경 색상
      color: 'white',
    }
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#bababa',  // Placeholder 색상
    fontSize: '14px',  // Placeholder 폰트 크기
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#000000',  // 선택된 값의 텍스트 색상
    fontSize: '15px',  // 선택된 값의 폰트 크기
    fontWeight: 400,
  }),
  indicatorSeparator: () => ({
    display: 'none',  // 드롭다운 화살표와 구분선 제거
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    padding: "4px 8px 4px 0px", // 패딩 조정
  }),
};

const CustomDropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <CustomArrowDown /> {/* 아이콘 크기 조정 */}
    </components.DropdownIndicator>
  );
};

const StudentSearch = ({ searchKeyword, setSearchKeyword }) => {
  const { nameList, schoolList, gradeList } = searchKeyword;
  const [tempSearchKewords, setTempSearchKeywords] = useState([]);
  const [studentKeyword, setStudentKeyword] = useState("");
  const [schoolKeyword, setSchoolKeyword] = useState("");
  const [gradeKeyword, setGradeKeyword] = useState("");
  const [currentPage, setCurrentPage] = useRecoilState(currentPageState);
  const [totalElements, setTotalElements] = useRecoilState(totalElementsState);
  const [totalPage, setTotalPage] = useRecoilState(totalPageState);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const combinedKeywords = [...nameList, ...schoolList, ...gradeList];

    if (combinedKeywords.length > 0) {
      setTempSearchKeywords(combinedKeywords);
    }
  }, [nameList, schoolList, gradeList]);

  // 검색어 추가
  const addKeywordByType = () => {
    if (studentKeyword !== "") {
      const updateNameList = [...nameList, studentKeyword];
      setSearchKeyword((prevKeywords) => ({
        ...prevKeywords,
        nameList: updateNameList,
      }));
      setStudentKeyword("");
    }
    if (schoolKeyword !== "") {
      const updateSchoolList = [...schoolList, schoolKeyword];
      setSearchKeyword((prevKeywords) => ({
        ...prevKeywords,
        schoolList: updateSchoolList,
      }));
      setSchoolKeyword("");
    }

    console.log(gradeKeyword);
    if (gradeKeyword !== "") {
      const updateGradeList = [...gradeList, gradeKeyword.label];
      setSearchKeyword((prevKeywords) => ({
        ...prevKeywords,
        gradeList: updateGradeList,
      }));
      setGradeKeyword("");
    }

    setTempSearchKeywords([...nameList, ...schoolList, ...gradeList]);

    setIsOpen(false);
  };

  // 검색어 초기화
  const resetKeywords = () => {
    setSearchKeyword({ nameList: [], schoolList: [], gradeList: [] });
    setTempSearchKeywords([]);
    setIsOpen(false);
  };

  const handleRemoveKeyword = (event, keywordToRemove) => {
    event.stopPropagation();
    removeKeyword(keywordToRemove);
  };

  // 검색어 삭제
  const removeKeyword = (keywordToRemove) => {
    const updateKeywords = (keywords) =>
      keywords.filter((keyword) => keyword !== keywordToRemove);

    setSearchKeyword((prevState) => ({
      nameList: updateKeywords(prevState.nameList),
      schoolList: updateKeywords(prevState.schoolList),
      gradeList: updateKeywords(prevState.gradeList),
    }));

    setTempSearchKeywords((prevKeywords) => updateKeywords(prevKeywords));
  };

  // 검색어 입력값 변경
  const handleChangeKeyword = (type, value) => {
    switch (type) {
      case "student":
        setStudentKeyword(value);
        break;
      case "school":
        setSchoolKeyword(value);
        break;
      case "grade":
        setGradeKeyword(value);
        break;
      default:
        break;
    }
  };

  return (
    <MainDiv>
      <DropdownContainer>
        {/* 버튼 박스 */}
        <DropdownButtonContainer isOpen={isOpen} onClick={toggleDropdown}>
          {tempSearchKewords.length > 0 ? (
            <SearchKewordWrapper>
              {tempSearchKewords.map((keyword, index) => (
                <SearchKeword key={index}>
                  {keyword}
                  <CancelIcon
                    onClick={(e) => handleRemoveKeyword(e, keyword)}
                  />
                </SearchKeword>
              ))}
            </SearchKewordWrapper>
          ) : (
            <div>학생 검색하기</div>
          )}
          {/* 아이콘 */}
          <OpenCloseIcon>{isOpen ? <DOpen /> : <DClose />}</OpenCloseIcon>
        </DropdownButtonContainer>
        {/* isOpen인 경우 드롭다운 형식으로 서치박스 나타남 */}
        {isOpen && (
          <DropdownContent>
            <SearchArea>
              <SearchOptions>
                <SearchField>
                  <div>학생 이름</div>
                  <SearchInput
                    type="text"
                    placeholder="학생 이름을 입력해주세요"
                    value={studentKeyword}
                    onChange={(e) =>
                      handleChangeKeyword("student", e.target.value)
                    }
                  />
                </SearchField>
                <SearchField>
                  <div>학교 이름</div>
                  <SearchInput
                    type="text"
                    placeholder="학교 이름을 입력해주세요"
                    value={schoolKeyword}
                    onChange={(e) =>
                      handleChangeKeyword("school", e.target.value)
                    }
                  />
                </SearchField>
                <SearchField>
                  <div>학년</div>
                  <CustomSelect 
                  options={options} 
                  onChange={setGradeKeyword}
                  styles={customStyle}
                  placeholder="학년 선택"
                  components={{ DropdownIndicator: CustomDropdownIndicator }} />
                </SearchField>
              </SearchOptions>

              {/* 서치 박스 내부 버튼들 */}
              <ButtonArea>
                <div />
                <ButtonGap>
                  <StyledButton
                    onClick={resetKeywords}
                    background={"#F1F1F1"}
                    color={"black"}
                  >
                    초기화
                  </StyledButton>
                  <StyledButton
                    background={"#15521D"}
                    color={"white"}
                    onClick={addKeywordByType}
                  >
                    검색
                  </StyledButton>
                </ButtonGap>
              </ButtonArea>
            </SearchArea>
          </DropdownContent>
        )}
      </DropdownContainer>
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

const DropdownButtonContainer = styled.div`
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
  /* gap: 8px; */
  border-radius: 100px;
  background: #fbfbfd;
  /* border: 1px solid #e0e0e0; */
  font-family: Pretendard Variable;
  font-size: 14px;
  font-weight: 400;
  box-shadow: none;

  &:focus {
    border: 1px solid #15521d;
  }
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
    background-color:${({ color }) => color==="black"?"#E0E0E0" :"#479051"};
  }
  font-size: 14px;
  font-weight: 400;
`;

const SearchKewordWrapper = styled.div`
  display: flex;
  margin-left: -20px;
`;

const SearchKeword = styled(RowDiv)`
  align-items: center;
  width: 100%;
  height: 40px;
  border-radius: 100px;
  background-color: ${(props) => props.theme.colors.primary_light};
  margin-right: 8px;
  white-space: nowrap;
  padding: 0 15px;

  font-size: 14px;
  font-weight: 400;
  color: #000000;
`;

const CancelIcon = styled(Cancel)`
  padding-left: 11px;
  width: 11.67px;
  height: 11.67px;
  fill: black;
  cursor: pointer;
`;

const OpenCloseIcon = styled.div`
  display: flex;
  justify-self: flex-end;
`;

export default StudentSearch;
