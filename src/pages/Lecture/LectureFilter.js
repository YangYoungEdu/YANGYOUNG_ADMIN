import { useState, useEffect } from "react";
import styled from "styled-components";
import { ReactComponent as DownArrow } from "../../Assets/DownArrow.svg";
import { ReactComponent as UpArrow } from "../../Assets/UpArrow.svg";

const LectureFilter = ({ originLectures, setLectures }) => {
  // const [isToggled, setIsToggled] = useState({
  //   teacher: false,
  // });
  const [checkedTeachers, setCheckedTeachers] = useState({});

  // todo: API로 받아오기
  const teacherList = [
    { id: 1, name: "김삼유", color: "prof_kim" },
    { id: 2, name: "홍길동", color: "prof_hong" },
    { id: 3, name: "김수지", color: "prof_lee" },
  ];
  const gradeList = [
    { id: 1, name: "고1", color: "primary_normal" },
    { id: 2, name: "고2", color: "primary_normal" },
    { id: 3, name: "고3", color: "primary_normal" },
  ];

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
      <Line />
      {/* 선생님 필터 */}
      <FilterSection
        title="선생님"
        // isToggled={isToggled.teacher}
        // onToggle={() => toggleFilter("teacher")}
      >
        {teacherList.map((teacher) => (
          <OptionLabel key={teacher.id}>
            <CheckBox
              type="checkbox"
              checked={checkedTeachers[teacher.name] || false}
              onChange={() => handleCheckboxChange(teacher.name)}
              checkColor={teacher.color}
            />
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
  width: 15%;
  padding-top: 56px;
`;

const Line = styled.hr`
  border: none;
  border-top: 1px solid ${(props) => props.theme.colors.gray_004};
  width: 100%;
  margin-top: 49.5px;
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
  margin: 0px 15px 0px 15px;
`;

const FilterTitle = styled.div`
  font-size: ${(props) => props.theme.fontSizes.subTitle2};
  font-weight: 600;
  margin: 5px 0px 10px 5px;
`;

const OptionLabel = styled.label`
  font-size: ${(props) => props.theme.fontSizes.bodyText3};
  font-weight: 400;
  margin-bottom: 10px;
`;

const CheckBox = styled.input.attrs({ type: "checkbox" })`
  padding: 10px;
  border: 1px solid ${(props) => props.theme.colors.gray_004};
  border-radius: 2px;
  font-size: 16px;
  margin: 5px 5px -5px 30px;
  cursor: pointer;

  &:checked {
    background-color: ${(props) => props.theme.colors[props.checkColor]};
  }
`;

export default LectureFilter;
