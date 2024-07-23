import Calendar from "react-calendar";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { MainDiv } from "../../style/CommonStyle";
import "./CustomCalendar.css"; // 커스텀 CSS 파일 import
import moment from "moment";
import { ko } from "date-fns/locale";
import { getAllLectureByDayAPI } from "../../API/LectureAPI";
import {
  getAttendanceByLectureAndDateAPI,
  updateAttendanceAPI,
} from "../../API/AttendanceAPI";

const AttendanceSelect = () => {
  const [date, setDate] = useState(new Date());
  const [lectures, setLectures] = useState([]);
  const [selectedLecture, setSelectedLecture] = useState(null); // 선택된 강의
  const [attendance, setAttendance] = useState([]); // 출결 데이터
  const [isUpdated, setIsUpdated] = useState(false);
  const [activeLectureId, setActiveLectureId] = useState(null);

  useEffect(() => {
    const formattedDate = moment(date).format("YYYY-MM-DD");
    if (isUpdated) {
      getAttendanceByLectureAndDateAPI(selectedLecture, formattedDate).then(
        (res) => {
          setAttendance(res);
        }
      );
      setIsUpdated(false);
    }
  }, [isUpdated]);

  // 날짜가 변경될 때마다 호출되는 함수
  const handleDateChange = async (newDate) => {
    setDate(newDate);
    try {
      const formattedDate = moment(newDate).format("YYYY-MM-DD");
      const response = await getAllLectureByDayAPI(formattedDate); // API 호출

      console.log("API Response:", response); // API 응답 데이터 확인

      setLectures(response || []); // 받은 데이터를 상태에 저장
    } catch (error) {
      console.error("Error fetching lectures:", error);
    }
  };

  // 데이터를 가공하여 시간대와 수업 이름을 반환
  const formatLectures = () => {
    const timeSlotMap = new Map();

    // console.log("Lectures for formatting:", lectures); // lectures 상태 확인

    (lectures || []).forEach((lecture) => {
      // console.log("Processing lecture:", lecture); // 디버깅 메시지
      const timeSlot = `${lecture.startTime} ~ ${lecture.endTime}`;
      if (!timeSlotMap.has(timeSlot)) {
        timeSlotMap.set(timeSlot, []);
      }
      timeSlotMap.get(timeSlot).push({ name: lecture.name, id: lecture.id });
    });

    // 디버깅 메시지: timeSlotMap의 내용을 확인
    const formattedLectures = Array.from(timeSlotMap.entries());
    // console.log("Formatted Lectures:", formattedLectures);

    return formattedLectures;
  };

  const formattedLectures = formatLectures();

  // 강의를 선택하면 학생 출결 테이블
  const handleLectureSelect = async (lectureId) => {
    try {
      const formattedDate = moment(date).format("YYYY-MM-DD");
      const response = await getAttendanceByLectureAndDateAPI(
        lectureId,
        formattedDate
      ); // API 호출
      setAttendance(response || []);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const updateAttendance = async () => {
    const updateRequest = attendance
      .filter((item) => item.attendanceType !== null)
      .map((item) => ({
        id: item.id,
        studentId: item.studentId,
        lectureId: selectedLecture,
        attendanceType: item.attendanceType,
        note: "수동 출결",
      }));

    try {
      console.log(updateRequest);
      await updateAttendanceAPI(updateRequest);
      setIsUpdated(true);
      alert("출석 정보가 변경되었습니다.");
    } catch (error) {
      console.error("Error updating attendance:", error);
    }
  };

  const handleOptionChange = (e, studentId) => {
    const { value } = e.target;
    const updatedAttendances = attendance.map((item) =>
      item.studentId === studentId ? { ...item, attendanceType: value } : item
    );
    setAttendance(updatedAttendances);
  };

  const handleLectureClick = (selectedLectureId) => {
    setActiveLectureId(selectedLectureId);
  }
  return (
    <MainDiv>
      {/* 상단 영역 */}
      <Upper>
        <CalendarWrapper>
          <Calendar
            onChange={handleDateChange}
            value={date}
            locale={ko}
            formatDay={(locale, date) => moment(date).format("DD")}
          />
        </CalendarWrapper>
        <LecturesWrapper>
          {formattedLectures.length > 0 ? (
            formattedLectures.map(([timeSlot, names]) => (
              <LectureSlot key={timeSlot}>
                <TimeSlot>{timeSlot}</TimeSlot>
                {lectures.map((lecture) => (
                  <LectureName
                    key={lecture.id}
                    isActive={activeLectureId === lecture.id}
                    onClick={() => {
                      setSelectedLecture(lecture.id);
                      handleLectureSelect(lecture.id); // 강의 선택 시 출결 데이터 가져오기
                      handleLectureClick(lecture.id);
                    }}
                  >
                    {lecture.name}
                  </LectureName>
                ))}
              </LectureSlot>
            ))
          ) : (
            <div>수업 정보가 없습니다.</div>
          )}
        </LecturesWrapper>
      </Upper>

      {/* 하단 테이블 영역 */}
      <AttendanceTableArea>
        <Top>
          <StyledH1>출석 체크</StyledH1>
          <SubmitButton onClick={updateAttendance}>저장</SubmitButton>
        </Top>
        <StyledTable cellSpacing={0}>
          <StyledThead>
            <tr>
              <th>순번</th>
              <th>이름</th>
              <th>학생 연락처</th>
              <th>부모님 연락처</th>
              <th>출결</th>
              <th>비고</th>
            </tr>
          </StyledThead>
          <StyledTbody>
            {attendance.length > 0 ? (
              attendance.map((item, index) => (
                <tr key={item.studentId}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.studentPhoneNumber}</td>
                  <td>{item.parentPhoneNumber}</td>
                  <td>
                    <RadioButtonWrapper>
                      <div>
                        <RadioInput
                          type="radio"
                          name={`attendance-${item.studentId}`} // 고유한 name 속성 부여
                          value="ATTENDANCE"
                          checked={item.attendanceType === "ATTENDANCE"}
                          onChange={(e) =>
                            handleOptionChange(e, item.studentId)
                          }
                        />
                        <label>출석</label>
                      </div>
                      <div>
                        <RadioInput
                          type="radio"
                          name={`attendance-${item.studentId}`} // 고유한 name 속성 부여
                          value="LATE"
                          checked={item.attendanceType === "LATE"}
                          onChange={(e) =>
                            handleOptionChange(e, item.studentId)
                          }
                        />
                        <label>지각</label>
                      </div>
                      <div>
                        <RadioInput
                          type="radio"
                          name={`attendance-${item.studentId}`} // 고유한 name 속성 부여
                          value="ABSENCE"
                          checked={item.attendanceType === "ABSENCE"}
                          onChange={(e) =>
                            handleOptionChange(e, item.studentId)
                          }
                        />
                        <label>결석</label>
                      </div>
                    </RadioButtonWrapper>
                  </td>
                  <td>
                    {moment(item.attendedDateTime).format(
                      "YYYY-MM-DD HH:mm:ss"
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">출결 데이터가 없습니다.</td>
              </tr>
            )}
          </StyledTbody>
        </StyledTable>
      </AttendanceTableArea>
    </MainDiv>
  );
};

const Upper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 74px;
  width: 70%;
`;

const CalendarWrapper = styled.div`
  width: 431px;
`;

const LecturesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 522px;
  height: 364px;
  overflow-y: scroll;
`;

const AttendanceTableArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-top: 62px;
  width: 70%;
  margin-bottom: 150px;
`;

const Top = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const LectureSlot = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 39px;
`;

const TimeSlot = styled.div`
  font-weight: bold;
  font-size: 16px;
  color: #15521d;
  margin-bottom: 14px;
`;

const LectureName = styled.div`
  width: 466px;
  height: 39px;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 10px 10px 10px 15px;
  background-color: ${({ isActive }) => (isActive ? '#15521D' : '#f7f7f7')};
  color: ${({ isActive }) => (isActive ? 'white' : 'black')};
  font-weight: 500;
  font-size: 16px;
  margin-bottom: 5px;

  cursor: pointer;

  &:hover {
    background-color: #E0E0E0;
  }

`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const StyledH1 = styled.h1`
  font-weight: bold;
  font-size: 16px;
`;

const SubmitButton = styled.button`
  width: 68px;
  height: 32px;
  border-radius: 5px;
  text-align: center;
  background-color: #15521d;

  font-weight: 400;
  font-size: 14px;
  color: white;
  cursor: pointer;
`;

const StyledThead = styled.thead`
  height: 48px;

  th {
    background: #e9f2eb;
    border-left: 1px solid white;
    border-right: 1px solid white;
    border-bottom: 1px solid ${(props) => props.theme.colors.gray_002};
    width: 200px; // 기본 너비 설정
  }

  th:first-child {
    border-radius: 10px 0 0 0;
    border-left: 1px solid #e9f2eb;
    width: 80px;
  }

  th:last-child {
    border-radius: 0 10px 0 0;
    border-right: 1px solid #e9f2eb;
    width: 210px;
  }

  th:nth-child(2) {
    width: 134px;
  }

  th:nth-child(5) {
    width: 226px;
  }
`;

const StyledTbody = styled.tbody`
  tr {
    height: 50px;
    cursor: pointer;
  }
  td {
    border: 1px solid;
    border-color: ${(props) => props.theme.colors.gray_002};
  }
`;

const RadioButtonWrapper = styled.div`
  display: flex;
  label {
    white-space: nowrap;
  }
  div {
    display: flex;
    flex-direction: row;
    gap: 4px;
    align-items: center;
  }
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

const RadioInput = styled.input.attrs({ type: "radio" })`
  width: 12px;
  height: 12px;
  border: 1.5px solid #95c25c;
  border-radius: 50%;
  outline: none;
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

export default AttendanceSelect;
