import { useEffect } from "react";
import styled from "styled-components";
import { RowDiv } from "../../style/CommonStyle";
import { ReactComponent as LeftArrow } from "../../Assets/LeftArrow.svg";
import { ReactComponent as Plus } from "../../Assets/Plus.svg";
import { ReactComponent as RightArrow } from "../../Assets/RightArrow.svg";
import SelectArrow from "../../Assets/SelectArrow.svg";
import { useCalendarState } from '../../stores/calendarState';

const LectrueHeader = ({
  mode,
  setMode,
  currentDate,
  setCurrentDate,
  setIsHighlight,
  isToday,
  setIsToday,
}) => {
  useEffect(() => {
    if (isToday) {
      setCurrentDate(new Date());
      setIsToday(false);
    }
  }, [isToday]);

	const [ calendarState, setCalendarState ] = useCalendarState();
	const { date } = calendarState;


  // 모드(달,주,일)에 따라서 날짜 변경 함수
  const changeDate = (amount, mode) => {
    const newDate = new Date(currentDate);
    let newDateCal;

    switch (mode) {
      case "month":
        newDate.setMonth(newDate.getMonth() + amount);
        newDateCal = new Date(date.getFullYear(), date.getMonth() + amount, date.getDate());
        break;
      case "week":
        newDate.setDate(newDate.getDate() + amount * 7);
        newDateCal = new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount * 7);
        break;
      case "day":
        newDate.setDate(newDate.getDate() + amount);
        newDateCal = new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount);
        break;
      default:
        break;
    }
    setCurrentDate(newDate);
    setCalendarState({ ...calendarState, date: newDateCal, mode: mode });
  };

  const prev = () => {
    changeDate(-1, mode);
  };

  const next = () => {
    changeDate(1, mode);
  };

  const setToday = () => {
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate().toString().padStart(2, "0");

    setIsToday(true);
    setIsHighlight({
      year: year,
      month: month,
      day: day,
      isHighlight: true,
    });

    setCalendarState({ ...calendarState, date: new Date() });
  };

  return (
    <>
      <CalendarHeader>
        <DatePicker>
          <ArrowLeft onClick={prev} />
          <DateTitle>
            {mode === "month"
              ? currentDate.toLocaleString("default", {
                  year: "numeric",
                  month: "long",
                })
              : currentDate.toLocaleString("default", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
          </DateTitle>
          <ArrowRight onClick={next} />
        </DatePicker>
        <ButtonArea>
          <LeftButtons>
            <Select value={mode} onChange={(e) => setMode(e.target.value)}>
              <option value="month">&nbsp;&nbsp;&nbsp;월</option>
              <option value="week">&nbsp;&nbsp;&nbsp;주</option>
              <option value="day">&nbsp;&nbsp;&nbsp;일</option>
            </Select>
            <TodayButton onClick={setToday}>오늘</TodayButton>
          </LeftButtons>
          <UploadButton>
            {/* <PlusIcon /> */}
            구글 시트 동기화
          </UploadButton>
        </ButtonArea>
      </CalendarHeader>
    </>
  );
};

const CalendarHeader = styled(RowDiv)`
  display: flex;
  justify-content: flex-start;
  box-sizing: border-box;
  margin-top: 41px;
  padding-bottom: 21px;
  margin-bottom: 14px;
  padding-left: 15%;
  padding-right: 7%;
  border-bottom: 1px solid #e0e0e0;
`;

const DatePicker = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  white-space: nowrap;
`;
const TodayButton = styled.button`
  width: 60px;
  height: 31px;
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.colors.gray_004};
  background-color: #ffffff;
  text-align: center;
  margin-left: 6px;
  cursor: pointer;
`;

const ArrowLeft = styled(LeftArrow)`
  cursor: pointer;
  padding: 0px 0px 0px 9px;
`;

const ArrowRight = styled(RightArrow)`
  cursor: pointer;
  padding: 0px 9px 0px 0px;
`;

const DateTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 500;
  padding: 0 6px 0 6px;
`;

const ButtonArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`;

const Select = styled.select`
  display: flex;
  width: 60px;
  height: 31px;
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.colors.gray_004};
  appearance: none;
  background: url(${SelectArrow}) no-repeat right 17.5px center;
  padding-right: 5px;
  line-height: 31px;
  cursor: pointer;
`;

const LeftButtons = styled.div`
  display: flex;
  flex-direction: row;
`;
const UploadButton = styled.button`
  box-sizing: border-box;
  width: 130px;
  height: 31px;
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.colors.gray_004};
  background-color: #ffffff;
  cursor: pointer;
  text-align: center;
  white-space: nowrap;
  padding-left: 11px;
  padding-right: 11px;
`;

const PlusIcon = styled(Plus)`
  padding: 0px 2px 1.5px 8px;
`;

export default LectrueHeader;
