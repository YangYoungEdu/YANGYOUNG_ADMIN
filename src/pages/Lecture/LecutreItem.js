import styled from "styled-components";
import { MainDiv, ColumnDiv, RowDiv } from "../../style/CommonStyle";
import { getTime } from "../../util/Util";

const LectureItem = ({ lecture }) => {
  return (
    <LectureItemWrapper>
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

const LectureItemWrapper = styled(RowDiv)`
  width: 80%;
  height: ${(props) => (props.slot * 50) / 12}px;
  z-index: 1;
  margin-left: 55px;
  position: absolute;
  border-radius: 5px;
`;

const Left = styled.div`
  width: 1%;
  height: ${(props) => (props.slot * 50) / 12}px;
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
