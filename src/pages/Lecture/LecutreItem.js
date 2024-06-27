import styled from "styled-components";
import { ColumnDiv } from "../../style/CommonStyle";
import { getTime } from "../../util/Util";

const LectureItem = ({ lecture }) => {
  return (
    <div>
      <div>
        {getTime(lecture.startTime)} ~ {getTime(lecture.endTime)}
      </div>
      <div>{lecture.name}</div>
    </div>
  );
};



export default LectureItem;
