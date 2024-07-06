import styled from "styled-components";
import { ColumnDiv, RowDiv } from "../../style/CommonStyle";
import { getTime } from "../../util/Util";

const LectureItem = ({ setIsClicked, setSelectedLecture, lecture, slot }) => {
  const handleChangeIsClicked = () => {
    setIsClicked(true);
    setSelectedLecture(lecture);
  };

  return (
    <LectureItemWrapper onClick={() => handleChangeIsClicked()}>
      <Left>&nbsp;</Left>
      <Content>
        <Time>
          {getTime(lecture.startTime)} ~ {getTime(lecture.endTime)}
        </Time>
        <Title>{lecture.name}</Title>
      </Content>
    </LectureItemWrapper>
  );
};

// ToDo: 위치 조정(화면 축소, 확대 시)
const LectureItemWrapper = styled(RowDiv)`
  position: absolute;
  justify-content: none;
  z-index: 1;
  width: 81%;
  height: ${(props) => (props.slot * 4.5) / 12}vh;
  border-radius: 5px;

  cursor: pointer;
`;

const Left = styled.div`
  width: 1%;
  height: ${(props) => (props.slot * 4.5) / 12}vh;
  background-color: #95c25c;
  border-radius: 5px 0 0 5px;
`;

const Content = styled(ColumnDiv)`
  height: 90%;
  background-color: #95c25c4d;
  opacity: 0.7;
  border-radius: 0 5px 5px 0;
  padding-left: 12px;
`;

const Time = styled.div`
  font-size: 13px;
  font-weight: 400;
`;

const Title = styled.div`
  font-size: 15px;
  font-weight: 600;
`;

export default LectureItem;
