import styled from "styled-components";
import { ReactComponent as LeftArrow } from "../../Assets/LeftArrow.svg";
import { ReactComponent as Plus } from "../../Assets/Plus.svg";
import { ReactComponent as RightArrow } from "../../Assets/RightArrow.svg";
import SelectArrow from "../../Assets/SelectArrow.svg";

const LectrueHeader = ({ mode, setMode, currentDate, setCurrentDate }) => {

  // 모드(달,주,일)에 따라서 날짜 변경 함수
  const changeDate = (amount, mode) => {
    const newDate = new Date(currentDate);
    switch (mode) {
      case "month":
        newDate.setMonth(newDate.getMonth() + amount);
        break;
      case "week":
        newDate.setDate(newDate.getDate() + amount * 7);
        break;
      case "day":
        newDate.setDate(newDate.getDate() + amount);
        break;
      default:
        break;
    }
    setCurrentDate(newDate);
  };

  const prev = () => {
    changeDate(-1, mode);
  };

  const next = () => {
    changeDate(1, mode);
  };

  return (
    <>
      <CalendarHeader>
        <TodayButton>오늘</TodayButton>
        <ArrowLeft onClick={prev} />
        <ArrowRight onClick={next} />
        <DateTitle>
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </DateTitle>
        <Select value={mode} onChange={(e) => setMode(e.target.value)}>
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
