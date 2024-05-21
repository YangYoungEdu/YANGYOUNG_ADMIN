import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getOneStudentAPI, patchStudentAPI } from "../../API/StudentAPI";

const PersonalInfo = () => {
  const [studentInfo, setStudentInfo] = useState({});
  const [tmpStudentInfo, setTmpStudentInfo] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const getOneStudent = async () => {
      try {
        const response = await getOneStudentAPI(id);
        setStudentInfo(response);
        setTmpStudentInfo(response);
      } catch (error) {
        console.error(error);
      }
    };
    getOneStudent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTmpStudentInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const activeButton = async () => {
    try {
      console.log(tmpStudentInfo);
      await patchStudentAPI(tmpStudentInfo);
      setStudentInfo(tmpStudentInfo);
      console.log("수정 완료!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TopDiv>
      {/* 이름, 학교 */}
      <UpperArea>
        <NamePart>
          <Name>{studentInfo.name}</Name>
          <Grade>{studentInfo.grade}</Grade>
        </NamePart>
        <SubmitButton type="button" onClick={activeButton}>
          수정
        </SubmitButton>
      </UpperArea>

      {/* form Parts*/}
      <StyledForm>
        <div>
          <label>학교</label>
          <StyledInput
            type="text"
            name="school"
            value={tmpStudentInfo.school || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>학번</label>
          <StyledInput
            type="text"
            name="id"
            value={tmpStudentInfo.id || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>학생 연락처</label>
          <StyledInput
            type="text"
            name="studentPhoneNumber"
            value={tmpStudentInfo.studentPhoneNumber || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>부모님 연락처</label>
          <StyledInput
            type="text"
            name="parentPhoneNumber"
            value={tmpStudentInfo.parentPhoneNumber || ""}
            onChange={handleChange}
          />
        </div>
      </StyledForm>
    </TopDiv>
  );
};

const TopDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 19px;
  margin-left: 50px;
  margin-top: 41px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 40px;
  div {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  label {
    font-family: Pretendard Variable;
    font-size: 14px;
    font-weight: 600;
    color: #555555;
  }
`;

const StyledInput = styled.input`
  width: 410px;
  height: 50px;
  border-radius: 5px;
  border: 1px solid #bababa;
  box-sizing: border-box;
  padding-left: 18px;
  font-family: Pretendard Variable;
  font-size: 20px;
  font-weight: 500;
  color: #555555;
`;

const UpperArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const NamePart = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const Name = styled.div`
  font-family: Pretendard Variable;
  font-size: 26px;
  font-weight: 700;
`;

const Grade = styled.div`
  width: 40px;
  height: 20px;
  border-radius: 3px;
  background: #fff4de;
  text-align: center;
  line-height: 20px;
  font-family: Pretendard Variable;
  font-size: 12px;
  font-weight: 400;
`;

const SubmitButton = styled.button`
  width: 100px;
  height: 35px;
  border: none;
  border-radius: 5px;
  background-color: #15521d;
  color: white;
  font-family: Pretendard Variable;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
`;

export default PersonalInfo;
