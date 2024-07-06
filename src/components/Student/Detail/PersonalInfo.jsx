import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getOneStudentAPI, patchStudentAPI } from "../../../API/StudentAPI";

const PersonalInfo = () => {
  const [studentInfo, setStudentInfo] = useState({});
  const [tmpStudentInfo, setTmpStudentInfo] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const { id } = useParams();

  //학생의 인적사항 정보를 불러오는 로직
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

  // 버튼을 눌렀을 경우 처리 로직
  const activeButton = async () => {
    try {
      console.log(tmpStudentInfo);
      if (isEditing) {
        await patchStudentAPI(tmpStudentInfo);
        setStudentInfo(tmpStudentInfo);
        console.log("수정 완료!");
        alert("수정되었습니다.");
        setIsEditing(false);
      } else {
        setIsEditing(true);
      }
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
        {isEditing ? (
          <SubmitButton type="button" onClick={activeButton}>
            저장
          </SubmitButton>
        ) : (
          <SubmitButton type="button" onClick={activeButton}>
            편집
          </SubmitButton>
        )}
      </UpperArea>

      {/* form Parts*/}
      <StyledForm>
        <StyledFormOne>
          <StyledDiv>
            <label>학교</label>
            <StyledInput
              type="text"
              name="school"
              value={tmpStudentInfo.school || ""}
              onChange={handleChange}
            />
          </StyledDiv>
          <StyledDiv>
            <label>학번</label>
            <StyledInput
              type="text"
              name="id"
              value={tmpStudentInfo.id || ""}
              onChange={handleChange}
            />
          </StyledDiv>
        </StyledFormOne>

        <StyledFormOne>
          <StyledDiv>
            <label>학생 연락처</label>
            <StyledInput
              type="text"
              name="studentPhoneNumber"
              value={tmpStudentInfo.studentPhoneNumber || ""}
              onChange={handleChange}
            />
          </StyledDiv>
          <StyledDiv>
            <label>부모님 연락처</label>
            <StyledInput
              type="text"
              name="parentPhoneNumber"
              value={tmpStudentInfo.parentPhoneNumber || ""}
              onChange={handleChange}
            />
          </StyledDiv>
        </StyledFormOne>
      </StyledForm>
    </TopDiv>
  );
};

const TopDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 56px;
  margin-left: 50px;
  margin-top: 41px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 41px;
`;

const StyledFormOne = styled.div`
  display: flex;
  flex-direction: row;
  gap: 61px;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  label {
    font-family: Pretendard Variable;
    font-size: 14px;
    font-weight: 600;
    color: #555555;
  }
`;

const StyledInput = styled.input`
  width: 370px;
  height: 50px;
  border-radius: 5px;
  border: 1px solid #efefef;
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
  width: 61px;
  height: 31px;
  padding: 10px;
  border-radius: 5px;
  background: #efefef;
  box-sizing: border-box;
  text-align: center;
  line-height: 13px;

  //styleName: Button 3;
  font-family: Pretendard Variable;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;

  &:hover {
    background: #e0e0e0;
  }
`;

export default PersonalInfo;
