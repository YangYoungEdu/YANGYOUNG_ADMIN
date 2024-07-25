import styled from "styled-components";
import moment from "moment";

const AttendanceTable = ({
  attendance,
  updateAttendance,
  handleOptionChange,
}) => (
  <AttendanceTableArea>
    <Top>
      {console.log(attendance)}
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
          <th>타임 스탬프</th>
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
                      onChange={(e) => handleOptionChange(e, item.studentId)}
                    />
                    <label>출석</label>
                  </div>
                  <div>
                    <RadioInput
                      type="radio"
                      name={`attendance-${item.studentId}`} // 고유한 name 속성 부여
                      value="LATE"
                      checked={item.attendanceType === "LATE"}
                      onChange={(e) => handleOptionChange(e, item.studentId)}
                    />
                    <label>지각</label>
                  </div>
                  <div>
                    <RadioInput
                      type="radio"
                      name={`attendance-${item.studentId}`} // 고유한 name 속성 부여
                      value="ABSENCE"
                      checked={item.attendanceType === "ABSENCE"}
                      onChange={(e) => handleOptionChange(e, item.studentId)}
                    />
                    <label>결석</label>
                  </div>
                </RadioButtonWrapper>
              </td>
              <td>
                {item.attendedDateTime
                  ? moment(item.attendedDateTime).format("HH:mm:ss") ===
                    "00:00:00"
                    ? "수동 출결 처리"
                    : moment(item.attendedDateTime).format("HH:mm:ss")
                  : ""}
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
);

const AttendanceTableArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-top: 62px;
  width: 75%;
  margin-bottom: 150px;
`;

const Top = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
  white-space: nowrap;
  cursor: pointer;
`;

const StyledThead = styled.thead`
  height: 48px;
  white-space: nowrap;

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

export default AttendanceTable;
