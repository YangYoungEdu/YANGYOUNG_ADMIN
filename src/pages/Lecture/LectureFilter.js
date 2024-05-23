import { useState } from "react";
import styled from "styled-components";
import { ReactComponent as DownArrow } from "../../Assets/DownArrow.svg";
import { ReactComponent as UpArrow } from "../../Assets/UpArrow.svg";

const LectureFilter = () => {
  const toggleFilter = (filter) => {
    setIsToggled({ ...isToggled, [filter]: !isToggled[filter] });
  };

  const [isToggled, setIsToggled] = useState({
    teacher: false,
    grade: false,
    room: false,
    day: false,
  });

  // todo: API로 받아오기
  const teacherList = [
    { id: 1, name: "선생님1" },
    { id: 2, name: "선생님2" },
    { id: 3, name: "선생님3" },
  ];
  const gradeList = [
    { id: 1, name: "고1" },
    { id: 2, name: "고2" },
    { id: 3, name: "고3" },
  ];
  const roomList = [
    { id: 1, name: "방1" },
    { id: 2, name: "방2" },
    { id: 3, name: "방3" },
  ];
  const dayList = [
    { id: 1, name: "월" },
    { id: 2, name: "화" },
    { id: 3, name: "수" },
    { id: 4, name: "목" },
    { id: 5, name: "금" },
    { id: 6, name: "토" },
    { id: 7, name: "일" },
  ];

  return (
    <>
      {/* 검색 필터 */}
      <SearchWrapper>
        <Line />
        <FilterWrapper onClick={() => toggleFilter("teacher")}>
          {/* 선생님 */}
          <FilterTitle>선생님</FilterTitle>
          {isToggled.teacher ? <ArrowUp /> : <ArrowDown />}
        </FilterWrapper>
        {isToggled.teacher && (
          <>
            {teacherList.map((teacher) => (
              <label key={teacher.id}>
                <CheckBox type="checkbox" value={teacher.name} />
                {teacher.name}
              </label>
            ))}
          </>
        )}
        <FilterWrapper onClick={() => toggleFilter("grade")}>
          {/* 학년 */}
          <FilterTitle>학년</FilterTitle>
          {isToggled.grade ? <ArrowUp /> : <ArrowDown />}
        </FilterWrapper>
        {isToggled.grade && (
          <>
            {gradeList.map((grade) => (
              <label key={grade.id}>
                <CheckBox type="checkbox" value={grade.name} />
                {grade.name}
              </label>
            ))}
          </>
        )}
      </SearchWrapper>
    </>
  );
};

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 15%;
`;

const ArrowUp = styled(UpArrow)`
  cursor: pointer;
  justify-content: end;
  margin-top: 7px;
`;

const ArrowDown = styled(DownArrow)`
  cursor: pointer;
  justify-content: end;
  margin-top: 7px;
`;

const Line = styled.hr`
  border: none;
  border-top: 1px solid ${(props) => props.theme.colors.gray_004};
  width: 100%;
  margin-top: 0px;
`;

const FilterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0px 15px 0px 15px;
`;

const FilterTitle = styled.div`
  font-size: ${(props) => props.theme.fontSizes.subTitle2};
  font-weight: 600;
`;

const CheckBox = styled.input.attrs({ type: "checkbox" })`
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 5px;
  font-size: 16px;

  &:focus {
    border-color: #15521d;
    outline: none;
  }

  cursor: pointer;
`;

export default LectureFilter;
