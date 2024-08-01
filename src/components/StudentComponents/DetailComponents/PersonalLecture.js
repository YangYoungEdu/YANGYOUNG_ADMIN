import { useState, useEffect } from "react";
import styled from "styled-components";
import {
  TopDiv,
  BigDiv,
  BtnArea,
  PolygonText,
  Box,
  TopInfo,
  BottomInfo,
  Title,
  DetailBox,
  StyledHr,
} from "./PersonalTask";
import { ReactComponent as UnOpenBlackPolygon } from "../../../Assets/UnOpenBlackPolygon.svg";
import { ReactComponent as BlackPolygon } from "../../../Assets/BlackPolygon.svg";
import { ReactComponent as PlusIcon } from "../../../Assets/PlusIcon.svg";
const PersonalLecture = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <TopDiv>
      <BigDiv>
        <BtnArea>
          <div onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <BlackPolygon /> : <UnOpenBlackPolygon />}
            <PolygonText>진행 중인 수업</PolygonText>
          </div>
          <PlusIcon />
        </BtnArea>
        {isOpen && (
          <div>
            {/* 테스크 하나 */}
            <Box>
              <TopInfo>
                <Title>수업 이름</Title>
                <DetailBox background={"#FFF4DE"}>선생님</DetailBox>
              </TopInfo>
              <BottomInfo>
                <div>날짜</div>
                <div>|</div>
                <div>시간</div>
                <div>|</div>
                <div>제출 상태</div>
              </BottomInfo>
            </Box>
          </div>
        )}
      </BigDiv>
      <StyledHr />
    </TopDiv>
  );
};

export default PersonalLecture;
