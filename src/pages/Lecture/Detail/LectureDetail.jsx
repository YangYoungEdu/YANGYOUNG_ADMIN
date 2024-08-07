import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { ColumnDiv, MainDiv, RowDiv } from "../../../style/CommonStyle";
import { theme } from "../../../style/theme";
import { ReactComponent as Cancel } from "../../../Assets/Cancel.svg";
import LectureAttendance from "./LectureAttendance";
import LectureMaterial from "./LectureMaterial";
import LectureStudent from "./LectureStudent";
import LectureTask from "./LectureTask";

const LectureDetail = ({
  currentDate,
  setIsClicked,
  setSelectedLecture,
  selectedLecture,
}) => {
  const id = selectedLecture.id;
  const today = currentDate.toLocaleDateString("en-CA");
  const [onClicked, setOnClicked] = useState({
    student: true,
    attendance: false,
    task: false,
    material: false,
  });

  const handleButtonClick = (type) => {
    setOnClicked((prevState) => ({
      ...prevState,
      student: type === "student" ? true : false,
      attendance: type === "attendance" ? true : false,
      task: type === "task" ? true : false,
      material: type === "material" ? true : false,
    }));
  };

  const handleCancelIsClicked = () => {
    setIsClicked(false);
    setSelectedLecture(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <LectureDetailWrapper>
        {/* 수업 정보 */}
        <TitleWrapper>
          <Title>{selectedLecture.name}</Title>
          <X onClick={() => handleCancelIsClicked()} />
        </TitleWrapper>
        <InfoWrapper>
          <Info>
            <Key>수업시간</Key>
            <Value>
              {/* {convertTime(lecture.startTime)} ~ {convertTime(lecture.endTime)} */}
            </Value>
          </Info>
          <Info>
            <Key>선생님</Key>
            <Value>{selectedLecture.teacher}</Value>
          </Info>
          <Info>
            <Key>강의실</Key>
            <Value>{selectedLecture.room}</Value>
          </Info>
        </InfoWrapper>

        {/* 학생, 출석, 과제 버튼*/}
        <ButtonWrapper>
          <Button
            isActive={onClicked.student}
            onClick={() => handleButtonClick("student")}
          >
            학생
          </Button>
          <Button
            isActive={onClicked.attendance}
            onClick={() => handleButtonClick("attendance")}
          >
            출석 체크
          </Button>
          <Button
            isActive={onClicked.task}
            onClick={() => handleButtonClick("task")}
          >
            과제
          </Button>
          <Button
            isActive={onClicked.material}
            onClick={() => handleButtonClick("material")}
          >
            {/* {" "} */}
            수업 자료
          </Button>
        </ButtonWrapper>

        {/* ToDo: 조건에 따라 정보 표시 */}
        {/* 강의별 학생 목록*/}
        {onClicked.student && <LectureStudent id={id} />}

        {/* 강의별 출석 목록*/}
        {onClicked.attendance && <LectureAttendance id={id} date={today}/>}

        {/* 강의별 과제 목록*/}
        {onClicked.task && <LectureTask id={id} />}

        {/* 강의별 자료 목록 */}
        {/* ToDo: 강의별 자료 목록 API 연동 */}
        {onClicked.material && (
          <LectureMaterial
            id={id}
            lecture={selectedLecture.name}
            date={today}
          />
        )}
      </LectureDetailWrapper>
    </ThemeProvider>
  );
};

const LectureDetailWrapper = styled(MainDiv)`
  position: absolute;
  justify-content: flex-start;
  top: 0;
  left: ${({ isClicked }) =>
    isClicked ? "25vw" : "100vw"}; // ToDo: 여백 생기는 문제 해결
  width: 50vw;
  height: 100%; // ToDo: 높이 확인 필요
  box-shadow: 0px 4px 4px 0px #00000040;
  transition: left 0.5s ease-in-out;
  transform: ${({ isClicked }) =>
    isClicked ? "translateX(-50vw)" : "translateX(-100%)"};
  z-index: 2;
  background-color: white;
  /* overflow: auto; */
`;

const InfoWrapper = styled(ColumnDiv)`
  padding-left: 12%;
`;

const Info = styled.div`
  justify-content: none;
  margin-bottom: 17px;
`;

const TitleWrapper = styled(RowDiv)`
  /* width: 80%; */
  padding-left: 12%;
  padding-top: 30px;
`;

const Title = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  font-size: ${(props) => props.theme.fontSizes.title2};
  color: ${(props) => props.theme.colors.gray_006};
  font-weight: 700;
  margin-bottom: 30px;
`;

const X = styled(Cancel)`
  display: flex;
  justify-content: flex-end;
  margin-right: 13%;
  cursor: pointer;
`;

const Key = styled.div`
  font-size: ${(props) => props.theme.fontSizes.bodyText3};
  font-weight: 700;
  margin-right: 10px;
`;

const Value = styled.div`
  font-size: ${(props) => props.theme.fontSizes.bodyText3};
  font-weight: 400;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 50px;
  border-radius: 10px;
  margin-bottom: 15px;
  background-color: ${(props) => props.theme.colors.gray_001};
`;

const Button = styled.button`
  width: 25%;
  height: 37px;
  border-radius: 5px;
  margin: 0 3px;
  font-size: ${(props) => props.theme.fontSizes.bodyText3};
  text-align: center;
  font-weight: 700;
  cursor: pointer;

  background-color: ${(props) =>
    props.isActive ? "#95C25C" : props.theme.colors.gray_001};
  color: ${(props) =>
    props.isActive ? props.theme.colors.white : props.theme.colors.black};

  border: none;
  outline: none;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

export default LectureDetail;
