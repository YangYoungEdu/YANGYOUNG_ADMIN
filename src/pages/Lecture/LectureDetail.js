import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getOneLectureAPI } from "../../API/LectureAPI";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "../../style/theme";
import { ReactComponent as Cancel } from "../../Assets/Cancel.svg";
import { MainDiv, RowDiv, ColumnDiv } from "../../style/CommonStyle";
import { getStudentByLectureAPI } from "../../API/StudentAPI";
import { getAttendanceByLectureAndDateAPI } from "../../API/AttendanceAPI";
import { getLectureTaskAPI } from "../../API/TaskAPI";

const LectureDetail = () => {
  const { id } = useParams();
  const today = new Date().toLocaleDateString("en-CA");
  const [lecture, setLecture] = useState({});
  const [students, setStudents] = useState([]);
  const [attendances, setAttendances] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [onClicked, setOnClicked] = useState({
    student: false,
    attendance: false,
    assignment: true,
  });

  const taskDummy = [
    {
      content: "과제1",
      taskType: "전체과제",
      taskDate: "2021-09-01",
    },
    {
      content: "과제2",
      taskType: "전체과제",
      taskDate: "2021-09-01",
    },
    {
      content: "과제3",
      taskType: "전체과제",
      taskDate: "2021-09-01",
    },
  ];

  useEffect(() => {
    getOneLectureAPI(id).then((res) => {
      setLecture(res);
      console.log(res);
    });
  }, [id]);

  useEffect(() => {
    if (onClicked.student) {
      getStudentByLectureAPI(id).then((res) => {
        setStudents(res);
        console.log(res);
      });
    }
    if (onClicked.attendance) {
      getAttendanceByLectureAndDateAPI(id, today).then((res) => {
        setAttendances(res);
        console.log(res);
      });
    }
    if (onClicked.assignment) {
      getLectureTaskAPI(id).then((res) => {
        setAssignments(res);
        console.log(res);
      });
    }
  }, [onClicked]);

  // 오전/오후 구분 함수
  const convertTime = (time) => {
    const [hour, minute] = time.split(":");
    const hourNum = parseInt(hour, 10);

    if (hourNum < 12) {
      return `오전${time}`;
    } else {
      const adjustedHour = hourNum === 12 ? 12 : hourNum - 12;
      return `오후${adjustedHour}:${minute}`;
    }
  };

  const handleButtonClick = (type) => {
    setOnClicked((prevState) => ({
      ...prevState,
      student: type === "student" ? true : false,
      attendance: type === "attendance" ? true : false,
      assignment: type === "assignment" ? true : false,
    }));
  };

  return (
    <ThemeProvider theme={theme}>
      <LectureDetailWrapper>
        {/* 수업 정보 */}
        <InfoWrapper>
          <TitleWrapper>
            <Title>{lecture.name}</Title>
            <X />
          </TitleWrapper>
          <Info>
            <Key>수업시간</Key>
            <Value>
              {/* {convertTime(lecture.startTime)} ~ {convertTime(lecture.endTime)} */}
            </Value>
          </Info>
          <Info>
            <Key>선생님</Key>
            <Value>{lecture.teacher}</Value>
          </Info>
          <Info>
            <Key>강의실</Key>
            <Value>{lecture.room}</Value>
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
            isActive={onClicked.assignment}
            onClick={() => handleButtonClick("assignment")}
          >
            과제
          </Button>
        </ButtonWrapper>

        {/* 강의별 학생 목록*/}
        {onClicked.student && (
          <ColumnDiv>
            {students.map((student, index) => (
              <RowDiv key={index}>
                <div>{student.name}</div>
                <div>{student.school}</div>
                <div>{student.grade}</div>
              </RowDiv>
            ))}
          </ColumnDiv>
        )}

        {/* 강의별 출석 목록*/}
        {onClicked.attendance && (
          <ColumnDiv>
            {attendances.map((attendance, index) => (
              <RowDiv key={index}>
                <div>{attendance.name}</div>
                <div>{attendance.studentPhoneNumber}</div>
                <div>{attendance.attendanceType}</div>
              </RowDiv>
            ))}
          </ColumnDiv>
        )}

        {/* 강의별 과제 목록*/}
        {onClicked.assignment && (
          <ColumnDiv>
            {taskDummy.map((task, index) => (
              <RowDiv key={index}>
                <div>{task.content}</div>
                <div>{task.taskType}</div>
                <div>{task.taskDate}</div>
              </RowDiv>
            ))}
          </ColumnDiv>
        )}
      </LectureDetailWrapper>
    </ThemeProvider>
  );
};

const LectureDetailWrapper = styled(MainDiv)`
  width: 50%;
  height: 100%;
  align-items: flex-start;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 2.5%;
  width: 100%;
`;

const Info = styled.div`
  justify-content: none;
  margin-bottom: 17px;
`;

const TitleWrapper = styled.div`
  width: 100%;
`;

const Title = styled.div`
  font-size: ${(props) => props.theme.fontSizes.title2};
  font-weight: 700;
  margin-bottom: 30px;
  flex: 1;
  margin-right:45%;
`;

const X = styled(Cancel)`
  width: 16.5px;
  height: 18px;
  cursor: pointer; /* 커서 포인터로 변경 */
`;

const Key = styled.div`
  font-size: ${(props) => props.theme.fontSizes.bodyText3};
  font-weight: 700;
  margin-right: 10px; /* Add margin to separate key and value */
`;

const Value = styled.div`
  font-size: ${(props) => props.theme.fontSizes.bodyText3};
  font-weight: 400;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.gray_001};
`;

const Button = styled.button`
  width: 31%;
  height: 100%;
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
