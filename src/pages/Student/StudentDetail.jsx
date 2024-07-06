import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as Class } from "../../Assets/Class.svg";
import { ReactComponent as Homework } from "../../Assets/Homework.svg";
import { ReactComponent as Student } from "../../Assets/Student.svg";
import PersonalInfo from "../../components/StudentComponents/DetailComponents/PersonalInfo";
import PersonalTask from "../../components/StudentComponents/DetailComponents/PersonalTask";
import PersonalLecture from "../../components/StudentComponents/DetailComponents/PersonalLecture";
import { getOneStudentAPI } from "../../API/StudentAPI";
import { getOneStudentTaskAPI } from "../../API/TaskAPI";
import { getLectureByStudentAPI } from "../../API/LectureAPI";

const StudentDetail = () => {
  const { id } = useParams();
  const [selectedMenu, setSelectedMenu] = useState("personal");
  const [studentInfo, setStudentInfo] = useState({});
  const [studentTask, setStudentTask] = useState([]);
  const [studentLecture, setStudentLecture] = useState([]);

  useEffect(() => {
    const getStudent = async () => {
      try {
        const response = await getOneStudentAPI(id);
        setStudentInfo(response);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };

    const getTask = async () => {
      try {
        const response = await getOneStudentTaskAPI(id);
        setStudentTask(response);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };

    const getLecture = async () => {
      try {
        const response = await getLectureByStudentAPI(id);
        setStudentLecture(response);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };

    getStudent();
    getTask();
    getLecture();
  }, [id]);

  const renderContent = () => {
    switch (selectedMenu) {
      case "personal":
        return <PersonalInfo studentInfo={studentInfo} />;
      case "homework":
        return (
          <PersonalTask
            studentTask={studentTask}
            studentLecture={studentLecture}
          />
        );
      case "class":
        return <PersonalLecture studentLecture={studentLecture} />;
      default:
        return null;
    }
  };

  return (
    <BackDiv>
      {/* 왼쪽 사이드바 */}
      <Menus>
        <MenuItem
          aria-label="Personal Details"
          onClick={() => setSelectedMenu("personal")}
          isActive={selectedMenu === "personal"}
        >
          <Student />
          <div>인적 사항</div>
        </MenuItem>

        <MenuItem
          aria-label="Homework"
          onClick={() => setSelectedMenu("homework")}
          isActive={selectedMenu === "homework"}
        >
          <Homework />
          <div>과제</div>
        </MenuItem>

        <MenuItem
          aria-label="Class Information"
          onClick={() => setSelectedMenu("class")}
          isActive={selectedMenu === "class"}
        >
          <Class />
          <div>수강 정보</div>
        </MenuItem>
      </Menus>

      {/* 오른쪽 컨텐츠 */}
      <Content>{renderContent()}</Content>
    </BackDiv>
  );
};

const BackDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

const Menus = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 41px;
  margin-left: 195px;
`;

const MenuItem = styled.button`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 199px;
  height: 39px;
  padding: 10px 10px 10px 15px;
  gap: 18px;
  border-radius: 10px;
  font-family: Pretendard Variable;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  background: ${(props) => (props.isActive ? "#e9f2eb" : "transparent")};
  border: none;

  &:hover {
    background: #f1f1f1;
  }
  &:active {
    background: #e9f2eb;
  }
`;

const Content = styled.div``;

export default StudentDetail;
