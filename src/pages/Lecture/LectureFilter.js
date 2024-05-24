import { useState, useEffect } from "react";
import styled from "styled-components";
import { ReactComponent as DownArrow } from "../../Assets/DownArrow.svg";
import { ReactComponent as UpArrow } from "../../Assets/UpArrow.svg";

const LectureFilter = ({ lectures, setLectures }) => {
  const [isToggled, setIsToggled] = useState({
    teacher: false,
    grade: false,
    room: false,
    day: false,
  });
  const [checkedTeachers, setCheckedTeachers] = useState({});

  useEffect(() => {
    // 선생님 검색
    const filterLecturesByCheckedTeachers = (lectures, checkedTeachers) => {
      console.log(checkedTeachers);

      if (
        Object.keys(checkedTeachers).length === 0 ||
        Object.values(checkedTeachers).every((value) => value === false)
      ) {
        setLectures(lectures);
      }

      const checkedTeacherIds = Object.keys(checkedTeachers).filter(
        (name) => checkedTeachers[name]
      );
      console.log(checkedTeacherIds);

      const filteredLectures = lectures.filter((lecture) =>
        checkedTeacherIds.includes(lecture.teacher)
      );

      console.log(filteredLectures);
      setLectures(filteredLectures);

      return filteredLectures;
    };
    filterLecturesByCheckedTeachers(lectures, checkedTeachers);
  }, [checkedTeachers]);

  const toggleFilter = (filter) => {
    setIsToggled((prev) => ({
      ...prev,
      [filter]: !prev[filter],
    }));
  };

  const handleCheckboxChange = (name) => {
    setCheckedTeachers((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  // todo: API로 받아오기
  const teacherList = [
    { id: 1, name: "선생님1", color: "prof_kim" },
    { id: 2, name: "선생님2", color: "prof_hong" },
    { id: 3, name: "선생님3", color: "prof_lee" },
  ];
  const gradeList = [
    { id: 1, name: "고1" },
    { id: 2, name: "고2" },
    { id: 3, name: "고3" },
  ];

  return (
    <SearchWrapper>
      <Line />
      {/* 선생님 필터 */}
      <FilterSection
        title="선생님"
        isToggled={isToggled.teacher}
        onToggle={() => toggleFilter("teacher")}
      >
        {isToggled.teacher &&
          teacherList.map((teacher) => (
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
      {/* 학년 필터 */}
      <FilterSection
        title="학년"
        isToggled={isToggled.grade}
        onToggle={() => toggleFilter("grade")}
      >
        {isToggled.grade &&
          gradeList.map((grade) => (
            <OptionLabel key={grade.id}>
              <CheckBox type="checkbox" value={grade.name} />
              {grade.name}
            </OptionLabel>
          ))}
      </FilterSection>
    </SearchWrapper>
  );
};

const FilterSection = ({ title, isToggled, onToggle, children }) => (
  <>
    <FilterWrapper onClick={onToggle}>
      <FilterTitle>{title}</FilterTitle>
      {isToggled ? <ArrowUp /> : <ArrowDown />}
    </FilterWrapper>
    {children}
  </>
);

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 15%;
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
