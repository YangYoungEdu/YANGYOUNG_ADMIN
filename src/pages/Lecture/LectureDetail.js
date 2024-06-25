import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getOneLectureAPI } from "../../API/LectureAPI";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "../../style/theme";
import { ReactComponent as Cancel } from "../../Assets/Cancel.svg";
import { ReactComponent as Plus } from "../../Assets/Plus.svg";
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
    student: true,
    attendance: false,
    assignment: false,
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

  const convertDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${month}월 ${day}일`;
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
        <TitleWrapper>
          <Title>{lecture.name}</Title>
          <X />
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
              <ColumnDiv key={index}>
                <StudentWrapper key={index}>
                  <StudentName>{student.name}</StudentName>
                  <SchoolAndGrade>
                    {student.school} l {student.grade}
                  </SchoolAndGrade>
                </StudentWrapper>
                <Line />
              </ColumnDiv>
            ))}
            <PlusIcon />
            <Line />
          </ColumnDiv>
        )}

        {/* 강의별 출석 목록*/}
        {onClicked.attendance && (
          // <ColumnDiv>
          <TableWrapper>
            <Table>
              <thead>
                <tr>
                  <TableHeader>이름</TableHeader>
                  <TableHeader>학생 연락처</TableHeader>
                  <TableHeader>출결</TableHeader>
                </tr>
              </thead>
              <tbody>
                {attendances.map((attendance, index) => (
                  <tr key={index}>
                    <TableCell>{attendance.name}</TableCell>
                    <TableCell>{attendance.studentPhoneNumber}</TableCell>
                    <TableCell>
                      <RadioWrapper>
                        <label>
                          <RadioInput
                            type="radio"
                            name="attendance"
                            value="출석"
                          />
                          출석
                        </label>
                        <RadioLabel>
                          <RadioInput
                            type="radio"
                            name="attendance"
                            value="지각"
                          />
                          지각
                        </RadioLabel>
                        <label>
                          <RadioInput
                            type="radio"
                            name="attendance"
                            value="결석"
                          />
                          결석
                        </label>
                      </RadioWrapper>
                    </TableCell>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableWrapper>
          // </ColumnDiv>
        )}

        {/* 강의별 과제 목록*/}
        {onClicked.assignment && (
          <TaskWrapper>
            {taskDummy.map((task, index) => (
              <TaskBox key={index}>
                <div>
                  <TaskTitle>{task.content}</TaskTitle>
                  <TaskType>{task.taskType}</TaskType>
                </div>
                <TaskDate>마감일:{convertDate(task.taskDate)}</TaskDate>
              </TaskBox>
            ))}
            <TaskBox>
              <PlusIcon />
            </TaskBox>
          </TaskWrapper>
        )}
      </LectureDetailWrapper>
    </ThemeProvider>
  );
};

const LectureDetailWrapper = styled(MainDiv)`
  width: 50%;
`;

const InfoWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-left: 12%;
`;

const Info = styled.div`
  justify-content: none;
  margin-bottom: 17px;
`;

const TitleWrapper = styled(RowDiv)`
  width: 100%;
  padding-left: 12%;
`;

const Title = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  font-size: ${(props) => props.theme.fontSizes.title2};
  font-weight: 700;
  margin-bottom: 30px;
`;

const X = styled(Cancel)`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding-right: 13%;
  width: 16.5px;
  height: 18px;
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
  width: 33.3%;
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

const StudentWrapper = styled(RowDiv)`
  justify-content: flex-start;
  padding-left: 8%;
  margin: 9px 0;
`;
const StudentName = styled.div`
  font-size: ${(props) => props.theme.fontSizes.bodyText3};
  font-weight: 700;
  padding-right: 18px;
`;

const SchoolAndGrade = styled.div`
  font-size: ${(props) => props.theme.fontSizes.bodyText4};
  font-weight: 400;
`;

const Line = styled.hr`
  width: 90%;
  border: none;
  height: 1px;
  background-color: ${(props) => props.theme.colors.gray_003};
`;

const PlusIcon = styled(Plus)`
  width: 100%;
  display: flex;
  justify-content: center;
  cursor: pointer;
  margin: 9px 0;
`;

const TableWrapper = styled.div`
  width: 90%;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const TableHeader = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
  background-color: #f2f2f2;
`;

const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
`;

const RadioWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RadioInput = styled.input.attrs({ type: "radio" })`
  width: 12px;
  height: 12px;
  border: 0.5px solid #95c25c;
  border-radius: 50%;
  outline: none;
  margin-left: 16px;
  margin-right: 3px;
  position: relative;
  cursor: pointer;

  &::before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &::after {
    content: "";
    display: block;
    width: 60%;
    height: 60%;
    border-radius: 50%;
    background-color: #95c25c;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
  }

  &:checked::after {
    opacity: 1;
  }
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
`;

const TaskWrapper = styled(ColumnDiv)`
  /* width: 90%; */
  padding-left: 9.5%;
`;
const TaskBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 84px;
  /* height: 14%; */
  border-radius: 5px;
  border: 1px solid #e0e0e0;
  margin: 2.5px 0px;
`;

const TaskTitle = styled.div`
  font-size: ${(props) => props.theme.fontSizes.bodyText3};
  font-weight: 700;
`;

const TaskType = styled.div`
  width: 57px;
  height: 20px;
  background-color: ${(props) => props.theme.colors.yellow};
  font-size: ${(props) => props.theme.fontSizes.bodyText4};
  font-weight: 400;
  text-align: center;
`;

const TaskDate = styled.div`
  font-size: ${(props) => props.theme.fontSizes.bodyText4};
  font-weight: 400;
`;

export default LectureDetail;
