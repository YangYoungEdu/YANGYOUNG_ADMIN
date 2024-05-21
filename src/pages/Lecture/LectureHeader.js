import styled from "styled-components";
import { ReactComponent as LeftArrow } from "../../Assets/LeftArrow.svg";
import { ReactComponent as Plus } from "../../Assets/Plus.svg";
import { ReactComponent as RightArrow } from "../../Assets/RightArrow.svg";
import SelectArrow from "../../Assets/SelectArrow.svg";

const LectrueHeader = ({ currentDate, setCurrentDate, setMonth }) => {
  const prevMonth = () => {
    setMonth(prevMonth => prevMonth - 1);
  
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  };
  
  const nextMonth = () => {
    setMonth(prevMonth => prevMonth + 1);
  
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  return (
    <>
      <CalendarHeader>
        <TodayButton>오늘</TodayButton>
        <ArrowLeft onClick={prevMonth} />
        <ArrowRight onClick={nextMonth} />
        <DateTitle>
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </DateTitle>
        <Select>
          <option value="month">월</option>
          <option value="week">주</option>
          <option value="day">일</option>
        </Select>
        <UploadButton>
          <PlusIcon />
          파일 업로드
        </UploadButton>
      </CalendarHeader>
    </>
  );
};

const CalendarHeader = styled.div`
  display: flex;
  flex-direction: row;
  /* margin: 0px 0px 10px -750px; */
`;

const TodayButton = styled.button`
  width: 60px;
  height: 31px;
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.colors.gray_004};
  background-color: #ffffff;
  cursor: pointer;
`;

const Select = styled.select`
  width: 60px;
  height: 31px;
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.colors.gray_004};
  background-color: #ffffff;
  appearance: none;
  background: url(${SelectArrow}) no-repeat right 13px center;
  padding-left: 12.5px;
`;

const UploadButton = styled.button`
  width: 108px;
  height: 31px;
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.colors.gray_004};
  background-color: #ffffff;
  cursor: pointer;
`;

const PlusIcon = styled(Plus)`
  margin: 0px 7.5px 0px 1px;
`;

const DateTitle = styled.div`
  font-size: 20px;
  font-weight: 500;
`;

const ArrowLeft = styled(LeftArrow)`
  cursor: pointer;
  margin: 4px 0px 0px 0px;
  /* margin: 4px 0px 0px 20px; */
`;

const ArrowRight = styled(RightArrow)`
  cursor: pointer;
  margin: 4px 0px 0px 0px;
  /* margin: 4px 12px 0px 0px; */
`;

export default LectrueHeader;
