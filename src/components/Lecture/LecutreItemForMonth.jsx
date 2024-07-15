import { useEffect } from "react";
import styled from "styled-components";
import { ColumnDiv } from "../../style/CommonStyle";
import { getTime } from "../../util/Util";

const LectureItemForMonth = ({ setIsClicked, setSelectedLecture, lecture }) => {
  useEffect(() => {
    console.log(lecture);
  }, []);

  const teacher = lecture.teacher;
  const slot = lecture.differenceSlot;

  const handleChangeIsClicked = () => {
    console.log("clicked");
    setIsClicked(true);
    setSelectedLecture(lecture);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <LectureItemWrapper slot={slot} onClick={() => handleChangeIsClicked()}>
      <Left teacher={teacher}>&nbsp;</Left>
      <Content teacher={teacher}>
        <Time>
          {getTime(lecture.startTime)} ~ {getTime(lecture.endTime)}
        </Time>
        <Title>{lecture.name}</Title>
      </Content>
    </LectureItemWrapper>
  );
};

// ToDo: 위치 조정(화면 축소, 확대 시)
const LectureItemWrapper = styled.div`
  flex: 1;
  position: absolute;
  margin-left: 48px;
  width: 82%;
  height: ${(props) => (props.slot * 4.5) / 12}vh;
  display: flex;
  justify-content: center;
  cursor: pointer;
  z-index: 1;
`;

const Left = styled.div`
  width: 1%;
  height: ${(props) => (props.slot * 4.5) / 12}vh;
  border-radius: 5px 0 0 5px;

  /* background-color: #95c25c; */
  background-color: ${(props) => {
    switch (props.teacher) {
      case "김삼유":
        return "#95c25c";
      case "장영해":
        return "#D8CD63";
      case "전재우":
        return "#BCD7EA";
      default:
        return "#95c25c";
    }
  }};
`;

const Content = styled(ColumnDiv)`
  display: flex;
  height: 90%;
  opacity: 0.7;
  border-radius: 0 5px 5px 0;
  padding-left: 12px;

  background-color: ${(props) => {
    switch (props.teacher) {
      case "김삼유":
        return "#95c25c";
      case "장영해":
        return "#D8CD63";
      case "전재우":
        return "#BCD7EA";
      default:
        return "#95c25c";
    }
  }};
  opacity: 0.3;
`;

const Time = styled.div`
  font-size: 13px;
  font-weight: 400;
`;

const Title = styled.div`
  font-size: 15px;
  font-weight: 600;
`;

export default LectureItemForMonth;
