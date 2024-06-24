import styled from "styled-components";
import { RowDiv } from "../../style/CommonStyle";
import { ReactComponent as LeftArrow } from "../../Assets/LeftArrow.svg";
import { ReactComponent as Plus } from "../../Assets/Plus.svg";
import { ReactComponent as RightArrow } from "../../Assets/RightArrow.svg";
import SelectArrow from "../../Assets/SelectArrow.svg";

const LectrueHeader = ({ mode, setMode, currentDate, setCurrentDate, setIsHighlight }) => {
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

  const setToday = () => {
    setIsHighlight({day: currentDate.getDate(), isHighlight: true});
  };

  return (
    <>
      <CalendarHeader>
        <ArrowLeft onClick={prev} />
        <DateTitle>
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </DateTitle>
        <ArrowRight onClick={next} />
        <Select value={mode} onChange={(e) => setMode(e.target.value)}>
          <option value="month">&nbsp;&nbsp;&nbsp;월</option>
          <option value="week">&nbsp;&nbsp;&nbsp;주</option>
          <option value="day">&nbsp;&nbsp;&nbsp;일</option>
        </Select>
        <TodayButton onClick={setToday}>오늘</TodayButton>
        <UploadButton>
          <PlusIcon />
          파일 업로드
        </UploadButton>
      </CalendarHeader>
    </>
  );
};

const CalendarHeader = styled(RowDiv)`
  width: 90%;
  justify-content: flex-start;
  padding: 0px 0px 17px 0px;
`;

const TodayButton = styled.button`
  width: 60px;
  height: 31px;
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.colors.gray_004};
  background-color: #ffffff;
  text-align: center;
  cursor: pointer;
`;

const ArrowLeft = styled(LeftArrow)`
  cursor: pointer;
  padding: 5px 12px 0px 20px;
`;

const ArrowRight = styled(RightArrow)`
  cursor: pointer;
  padding: 5px 26px 0px 0px;
`;

const DateTitle = styled.div`
  font-size: 20px;
  font-weight: 500;
  padding: 2px 20px 0px 0px;
`;

const Select = styled.select`
  width: 60px;
  height: 31px;
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.colors.gray_004};
  appearance: none;
  background: url(${SelectArrow}) no-repeat right 17.5px center;
  /* text-align-last: center;
  text-align: center; */
  padding-right: 5px;
  line-height: 31px;
  cursor: pointer;
`;

const UploadButton = styled.button`
  width: 108px;
  height: 31px;
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.colors.gray_004};
  background-color: #ffffff;
  cursor: pointer;
  margin-left: auto;
  padding-right: 5px;
`;

const PlusIcon = styled(Plus)`
  padding: 0px 2px 1.5px 8px;
`;

export default LectrueHeader;
