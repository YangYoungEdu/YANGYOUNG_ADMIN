import { useState, useEffect } from "react";
import styled from "styled-components";
import { ReactComponent as DownArrow } from "../../../Assets/DownArrow.svg";
import { ReactComponent as UpArrow } from "../../../Assets/UpArrow.svg";
import { teacherList } from "../../../const/Const";
import { ReactComponent as Check } from "../../../Assets/Check.svg";

const LectureFilter = ({ mode, originLectures, setLectures }) => {
  const [checkedTeachers, setCheckedTeachers] = useState({});
  useEffect(() => {
    filterLecturesByCheckedTeachers();
  }, [checkedTeachers]);

  // 강의 필터 함수 - 선생님
  const filterLecturesByCheckedTeachers = () => {
    const lecturesByTeacher = filterLecturesByTeacher();
    setLectures(lecturesByTeacher);
  };

  // 강의 필터 - 선생님
  const filterLecturesByTeacher = () => {
    if (
      // 체크된 선생님이 없거나 모두 false인 경우 원본 강의 반환
      Object.keys(checkedTeachers).length === 0 ||
      Object.values(checkedTeachers).every((value) => value === false)
    ) {
      return originLectures;
    }

    const checkedTeacherNames = new Set(
      Object.keys(checkedTeachers).filter((name) => checkedTeachers[name])
    );

    const filteredLectures = originLectures.filter((lecture) =>
      checkedTeacherNames.has(lecture.teacher)
    );

    console.log("filteredLectures", filteredLectures);

    return filteredLectures;
  };

  // 필터 토글 함수 - 선생님, 학년, 강의실, 요일
  // const toggleFilter = (filter) => {
  //   setIsToggled((prev) => ({
  //     ...prev,
  //     [filter]: !prev[filter],
  //   }));
  // };

  // 체크박스 변경 함수 - 선생님
  const handleCheckboxChange = (name) => {
    setCheckedTeachers((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  // 필터 섹션 컴포넌트
  const FilterSection = ({ title, isToggled, onToggle, children }) => (
    <>
      <FilterWrapper onClick={onToggle}>
        <FilterTitle>{title}</FilterTitle>
        {/* {isToggled ? <ArrowUp /> : <ArrowDown />} */}
      </FilterWrapper>
      {children}
    </>
  );

  return (
    <SearchWrapper>
      {mode === "month" ? <Line /> : null}
      {/* 선생님 필터 */}
      <FilterSection
        title="선생님"
        // isToggled={isToggled.teacher}
        // onToggle={() => toggleFilter("teacher")}
      >
        {teacherList.map((teacher) => (
          <OptionLabel key={teacher.id}>
            <CheckboxWrapper>
              <CheckBox
                type="checkbox"
                checked={checkedTeachers[teacher.name] || false}
                onChange={() => handleCheckboxChange(teacher.name)}
                checkColor={teacher.color}
              />
              <CheckIcon />
            </CheckboxWrapper>
            {teacher.name}
          </OptionLabel>
        ))}
      </FilterSection>
    </SearchWrapper>
  );
};

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 14.5%;
`;

const Line = styled.hr`
  border: none;
  width: 100%;
`;

const ArrowUp = styled(UpArrow)`
  cursor: pointer;
  margin: 7px 3px 0px 0px;
`;

const ArrowDown = styled(DownArrow)`
  cursor: pointer;
  margin: 7px 3px 0px 0px;
`;

const FilterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const FilterTitle = styled.div`
  font-size: ${(props) => props.theme.fontSizes.subTitle2};
  font-weight: 600;
  color: ${(props) => props.theme.colors.gray_006};
`;

const OptionLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: ${(props) => props.theme.fontSizes.bodyText3};
  color: ${(props) => props.theme.colors.gray_006};
  font-weight: 400;
  gap: 8px;
  margin-bottom: 7px;
    cursor: pointer;
`;
const CheckboxWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  position: relative;

`;

const CheckBox = styled.input.attrs({ type: "checkbox" })`
  padding: 10px;
  border: 1px solid ${(props) => props.theme.colors.gray_004};
  border-radius: 2px;
  font-size: 16px;
  cursor: pointer;

  &:checked {
    background-color: ${(props) => props.theme.colors[props.checkColor]};
  }
`;

const CheckIcon = styled(Check)`
  position: absolute;
  display: none;
  ${CheckBox}:checked + & {
    display: block;
  }
`;

export default LectureFilter;
