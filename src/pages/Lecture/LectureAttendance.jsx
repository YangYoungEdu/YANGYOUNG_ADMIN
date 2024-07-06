import styled from "styled-components";

const LectureAttendance = ({ attendances }) => {
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
                    <RadioInput type="radio" name="attendance" value="출석" />
                    출석
                  </label>
                  <RadioLabel>
                    <RadioInput type="radio" name="attendance" value="지각" />
                    지각
                  </RadioLabel>
                  <label>
                    <RadioInput type="radio" name="attendance" value="결석" />
                    결석
                  </label>
                </RadioWrapper>
              </TableCell>
            </tr>
          ))}
        </tbody>
      </AttendanceTable>
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

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
`;

export default LectureAttendance;
