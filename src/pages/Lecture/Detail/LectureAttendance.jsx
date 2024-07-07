import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getAttendanceByLectureAndDateAPI,
  updateAttendanceAPI,
} from "../../../API/AttendanceAPI";
import { RowDiv } from "../../../style/CommonStyle";

const LectureAttendance = ({ id, date }) => {
  const [attendances, setAttendances] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    getAttendanceByLectureAndDateAPI(id, date).then((res) => {
      setAttendances(res);
    });
  }, [isUpdated]);

  const updateAttendance = async () => {
    console.log(attendances);

    const updateRequest = attendances
      .filter((attendance) => attendance.attendanceType !== null) // Filter out entries where attendanceType is null
      .map((attendance) => ({
        id: attendance.id,
        studentId: attendance.studentId,
        lectureId: id,
        attendanceType: attendance.attendanceType,
      }));

    try {
      await updateAttendanceAPI(updateRequest);
      setIsUpdated(true);
      alert("출석 정보가 변경되었습니다.");
    } catch (error) {
      console.error("Error updating attendance:", error);
    }
  };

  const handleOptionChange = (e, studentId) => {
    const { value } = e.target;
    const updatedAttendances = attendances.map((attendance) =>
      attendance.studentId === studentId
        ? { ...attendance, attendanceType: value }
        : attendance
    );
    setAttendances(updatedAttendances);
  };

  return (
    <TableWrapper>
      <AttendanceTable>
        <thead>
          <tr>
            <TableHeader style={{ width: "164px" }}>이름</TableHeader>
            <TableHeader style={{ width: "174px" }}>학생 연락처</TableHeader>
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
                      name={`attendance-${attendance.studentId}`} // 고유한 name 속성 부여
                      value="ATTENDANCE"
                      checked={attendance.attendanceType === "ATTENDANCE"}
                      onChange={(e) =>
                        handleOptionChange(e, attendance.studentId)
                      }
                    />
                    출석
                  </label>
                  <label>
                    <RadioInput
                      type="radio"
                      name={`attendance-${attendance.studentId}`} // 고유한 name 속성 부여
                      value="LATE"
                      checked={attendance.attendanceType === "LATE"}
                      onChange={(e) =>
                        handleOptionChange(e, attendance.studentId)
                      }
                    />
                    지각
                  </label>
                  <label>
                    <RadioInput
                      type="radio"
                      name={`attendance-${attendance.studentId}`} // 고유한 name 속성 부여
                      value="ABSENCE"
                      checked={attendance.attendanceType === "ABSENCE"}
                      onChange={(e) =>
                        handleOptionChange(e, attendance.studentId)
                      }
                    />
                    결석
                  </label>
                </RadioWrapper>
              </TableCell>
            </tr>
          ))}
        </tbody>
      </AttendanceTable>
      <UploadButton onClick={updateAttendance}>
        <UploadButtonText>저장 사항 변경</UploadButtonText>
      </UploadButton>
    </TableWrapper>
  );
};

const TableWrapper = styled.div`
  width: 90%;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 10px;
  margin-bottom: 20px;
  /* overflow: hidden; */
`;

const TableHeader = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
  background-color: #f2f2f2;

  &:first-child {
    border-top-left-radius: 10px;
  }

  &:last-child {
    border-top-right-radius: 10px;
  }
`;

const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
`;

const AttendanceTable = styled(Table)`
  tbody tr:last-child ${TableCell}:first-child {
    border-bottom-left-radius: 10px;
  }

  tbody tr:last-child ${TableCell}:last-child {
    border-bottom-right-radius: 10px;
  }
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

const TaskBox = styled(RowDiv)`
  display: flex;
  height: 50px;
  border-radius: 5px;
  border: 1px solid #e0e0e0;
  margin: 2.5px 0px;
  /* padding: 18.5px 0 0 23px; */
  box-sizing: border-box;
`;

const UploadButton = styled(TaskBox)`
  background-color: #15521d;
  justify-content: center;
  align-items: center;
  /* padding-top: -10px; */
  cursor: pointer;
`;

const UploadButtonText = styled.div`
  color: white;
  font-size: 20px;
  margin-left: -35px;
`;

export default LectureAttendance;
