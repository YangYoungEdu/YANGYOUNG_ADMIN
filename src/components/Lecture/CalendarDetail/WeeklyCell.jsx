import React, { useState, useEffect, useRef } from 'react';
// import '../../style/css/app.css';
// store
import { useAddFormState } from '../../../stores/addFormState';
import { useUserData } from '../../../stores/userData';
import { useDragAndDrop } from '../../../stores/dragAndDrop';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { getCalendarData } from '../../../Atom';
import { DragNDropPatchAPI, ResizingPatchAPI, serverformatTime } from './UserDataController';

const oneCellHeight = 12.5;

const WeeklyCell = (props) => {
    const { index, day, date, startHour, schedule, styleWidths, StyleLefts } = props;
    const [addFormState, setAddFormState] = useAddFormState();
    const { active } = addFormState;

    const [calSchedule, setCalSchedule] = useRecoilState(getCalendarData
    );
    
    const [isnewClick, setisNewClick] =useState(false);
    const [defaultData, setDefaultData] =useState({});

    // const [userData, setUserData] = useUserData();
    const [dragAndDrop, setDragAndDrop] = useDragAndDrop();
    const [isResizing, setIsResizing] = useState(false); // 리사이징 상태 추가

    // HH:MM 형태의 string 타입인 startHour를 숫자로 변환
    const [propsHour, propsMin] = (typeof startHour === 'string' ? startHour.split(':') : ['0', '0']).map(Number);


    // 마우스 업 이벤트를 처리하여 리사이징 종료
    useEffect(() => {
        const handleMouseUp = () => {
            if (isResizing) {
                document.body.classList.remove('resizing');
            }
        };

        if (isResizing) {
            document.body.classList.add('resizing');
            document.querySelectorAll('.weekly-schedule').forEach(el => el.classList.add('resizing'));
            document.addEventListener('mouseup', handleMouseUp);
        } else {
            document.body.classList.remove('resizing');
            document.querySelectorAll('.weekly-schedule').forEach(el => el.classList.remove('resizing'));
        }

        return () => {
            document.body.classList.remove('resizing');
            document.querySelectorAll('.weekly-schedule').forEach(el => el.classList.remove('resizing'));
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isResizing]);

    //시작시간과 끝시간 사이의 15분 단위 타임스탬프 갯수 확인
    const toMinutes = (hour, minute) => hour * 60 + minute;

    const toTime = (totalMinutes) => ({
        hour: Math.floor(totalMinutes / 60),
        minute: totalMinutes % 60
    });

    const get15MinIntervals = (startTime, endTime) => {
        const startMinutes = toMinutes(startTime.hour, startTime.minute);
        const endMinutes = toMinutes(endTime.hour, endTime.minute);
    
        // 15분 단위로 시작 시간을 올림하여 첫 번째 15분 단위로 설정
        let intervalStart = Math.ceil(startMinutes / 15) * 15;
    
        // 종료 시간까지 반복하여 모든 15분 단위 타임스탬프를 수집
        const intervals = [];
        while (intervalStart <= endMinutes) {
            intervals.push(toTime(intervalStart));
            intervalStart += 15;
        }

        // 끝 시간이 15분 단위의 배수인지 확인
        if (startTime.minute % 15 !== 0) {
            return intervals.length+1
        }

        return intervals.length;
    
    };

    // 일정의 높이를 계산하는 부분
    // 일정의 시작 시간과 끝 시간을 15분 단위로 계산하여 px 단위로 변환
    // 60 = 분 / 15 = 분단위 / oneCellHeight = 한칸 높이 / 22 = 마진값
    const calculateHeight = (startTime, endTime) => {
        const intervals = get15MinIntervals(startTime, endTime);

        // 15분 단위로 높이 조정 
        const heightInPixels = intervals * oneCellHeight-22;
        return `${heightInPixels}px`;
    };

    // 일정 높이 업데이트를 위한 useEffect
    const [height, setHeight] = useState({});

    useEffect(() => {
        if (schedule.length > 0) {
          // 계산된 height 값을 저장할 새로운 객체를 생성
          const newHeights = {};
    
          schedule.forEach(item => {
            // 높이 계산
            const height = calculateHeight(item.startTime, item.endTime);
            // id를 키로 사용하여 새로운 heights 객체에 저장
            newHeights[item.id] = height;
          });
    
          // 새로운 heights 객체로 상태 업데이트
          setHeight(newHeights);
        }
      }, [schedule]);

    // 빈 셀을 클릭하여 일정을 추가하는 함수
    const onClickDate = () => {
        if(!isnewClick){
            // setisNewClick(true);
            setDefaultData({
                startTime: { 
                hour: propsHour, 
                minute: propsMin, 
                }, 
                endTime: { 
                    hour: propsHour + 1, 
                    minute: propsMin, 

                }})
            if (!active && !isResizing) {
                setAddFormState({
                    ...addFormState,
                    active: true,
                    mode: 'add',
                    name: '',
                    room: '',
                    lectureType: '',
                    teacher: '',
                    curDate: date, // Date 객체 그대로 유지
                    startTime: { 
                        hour: propsHour, 
                        minute: propsMin, 
                        second: 0, 
                        nano: 0 
                    }, // 새로운 시간 형식 적용
                    endTime: { 
                        hour: propsHour + 1, 
                        minute: propsMin, 
                        second: 0, 
                        nano: 0 
                    } ,// 새로운 시간 형식 적용,
                    lectureDateList: [],
                    studentList: []
                });
                
            }
        }
    };

    // 일정을 클릭하여 수정하는 함수
    const onClickSchedule = (e, schedule) => {
        e.stopPropagation();

        const { id, name, room,lectureType, teacher, curDate, startTime, endTime,lectureDate,allLectureDate, studentList, repeated } = schedule;

        console.log("주간 schedule", schedule);
        if (!active&& !isResizing) { // 리사이징 중일 때 클릭 방지
          setAddFormState({
              ...addFormState,
              id: id,
              active: true,
              mode: 'edit',
              name: name,
              room:room,
              lectureType:lectureType,
              teacher:teacher,
              curDate: curDate,
              startTime: {...startTime},
              endTime: {...endTime},
              studentList: studentList,
              lectureDate: lectureDate,
              allLectureDate: allLectureDate,
              repeated: repeated
          });
        }
      };

    // 일정을 드래그 앤 드랍으로 이동시키는 함수
    const onDropSchedule = async(e) => {
        e.preventDefault();
        try{
            // 드래그 앤 드랍 데이터 확인
            if (!dragAndDrop.from) return;

            const { from, to, initialY } = dragAndDrop;

            // Y좌표의 차이 계산
            const yDifference = e.clientY - initialY;
            const differenceInMinutes = Math.round(yDifference / oneCellHeight) * 15; // 50px = 15분

            // 새로운 시작 시간과 끝 시간 계산
            const newStartTotalMin = (to.startTime.hour * 60) + to.startTime.minute + differenceInMinutes;

            // 시간 값이 음수가 되지 않도록 조정
            const newStartHour = Math.max(Math.floor(newStartTotalMin / 60), 0);
            const newStartMinute = Math.max(newStartTotalMin % 60, 0);

            // 기존 시간차 유지 + 끝 시간이 24:를 넘지 않도록 보장
            const durationInMinutes = (from.endTime.hour * 60 + from.endTime.minute) - (from.startTime.hour * 60 + from.startTime.minute);
            let newEndTotalMin = newStartTotalMin + durationInMinutes;

            const maxEndMinute = 24 * 60;
            newEndTotalMin = Math.min(newEndTotalMin, maxEndMinute);

            const newEndHour = Math.floor(newEndTotalMin / 60);
            const newEndMinute = newEndTotalMin % 60;

            //서버에 보낼 데이터 가공
            const newDateForm = date.toLocaleDateString("en-CA");
            const startTimeStr = serverformatTime(newStartHour, newStartMinute);
            const endTimeStr = serverformatTime(newEndHour, newEndMinute);

            console.log("날짜 확인",newDateForm);
        
            const data ={
                id: from.id,
                startTime : startTimeStr,
                endTime: endTimeStr,
                updatedLectureDate:to.lectureDate
            }

            const response = await DragNDropPatchAPI(data);
            setCalSchedule([...calSchedule, response]);
            

        }
        catch(err){
            console.error(err);
        }
    };

    // 드래그가 들어왔을 때 호출되는 함수
    const onDragEnterCell = (e) => {
        e.preventDefault();
        const { from } = dragAndDrop;
        console.log('드래그', from);
        const diff = (from.endTime.hour * 60 + from.endTime.minute) - (from.startTime.hour * 60 + from.startTime.minute);

        const newScheduleForm = { ...from, lectureDate: date.toLocaleDateString("en-CA"),
            startTime: {
                ...from.startTime,
                hour: propsHour,
                minute: propsMin
            },
            endTime: {
                ...from.endTime,
                hour: propsHour + Math.floor(diff / 60),
                minute: propsMin + (diff % 60)
            }, };

        // 현재 Y좌표 저장
        setDragAndDrop({ ...dragAndDrop, to: newScheduleForm, initialY: e.clientY });
        console.log("newScheduleForm", newScheduleForm);

        // 콘솔에 시작 시간 변화를 로그로 출력
        console.log("Original start hour:", from.startTime.hour);
        console.log("New start hour", propsHour);
    };

    // 드래그가 시작되었을 때 호출되는 함수
    const onDragCell = (e, schedule) => {
        if (!isResizing) {
            console.log("schedule from", schedule, "dragAndDrop", dragAndDrop)
            setDragAndDrop({ ...dragAndDrop, from: schedule });
        }
    };

    // 일정 리사이징을 위한 마우스 다운 이벤트 처리 함수
    const onResizeMouseDown = (e, schedule) => {
        e.preventDefault();
        e.stopPropagation();

        let data;
        const initialY = e.clientY;
        const initialEndMinute = schedule.endTime.hour * 60 + schedule.endTime.minute;

        const onResizeMouseMove = async (e) => {

            setIsResizing(true);
            
            const newY = e.clientY;
            const minDifference = Math.round((newY - initialY) / oneCellHeight) * 15; // oneCellHeight px = 15분
            let newEndMinute = initialEndMinute + minDifference;

            // 일정의 시작 시간을 초과하지 않도록 조정
            const startMinute = schedule.startTime.hour * 60 + schedule.startTime.minute;
            newEndMinute = Math.max(newEndMinute, startMinute);
    
            // 끝 시간이 24를 넘지 않도록 조정
            const maxEndMinute = 24 * 60 ;
            newEndMinute = Math.min(newEndMinute, maxEndMinute);
    
            const newEndTime = {
                hour: Math.floor(newEndMinute / 60),
                minute: newEndMinute % 60
            };

            const StartTimeStr = serverformatTime(schedule.startTime.hour, schedule.startTime.minute)
            const endTimeStr = serverformatTime(newEndTime.hour, newEndTime.minute);

            //patch
            data ={
                id: schedule.id,
                startTime: StartTimeStr,
                endTime: endTimeStr,
                updatedLectureDate: schedule.lectureDate
            }

            console.log(data);
            // setCalSchedule([...calSchedule, response]);
        };

        const onResizeMouseUp = async() => {
            
            document.removeEventListener('mousemove', onResizeMouseMove);
            document.removeEventListener('mouseup', onResizeMouseUp);
            document.body.classList.remove('resizing');
            if (data) {
                try {
                    const response = await DragNDropPatchAPI(data);
            
                    // 상태 업데이트를 위한 새로운 상태 배열 생성
                    const updatedSchedule = calSchedule.map((item) =>
                        item === response ? { ...item, endTime: response.response } : item
                    );
            
                    // 상태 업데이트
                    setCalSchedule(updatedSchedule);
                } catch (error) {
                    // 오류 처리
                    console.error("Error updating schedule:", error);
                }
            }

            setIsResizing(false);
            
        };

        document.addEventListener('mousemove', onResizeMouseMove);
        document.addEventListener('mouseup', onResizeMouseUp);
    };

    const formatTime = (hour, minute) => {
        if (hour === 24) {
            hour = 0; // 24시를 0시로 변환
        }
        const period = hour >= 12 ? '오후' : '오전';
        const formattedHour = (hour % 12) || 12; // 0시는 12시로 변환
        const formattedMinute = minute.toString().padStart(2, '0'); // 분을 두 자리로 맞추기
        return `${period} ${formattedHour}${minute === 0 ? '' : ':' + formattedMinute}`;
    };

    if (index === 0) {
        return (
            <WeekDiv className={'weekly-cell'}>
                {day}
            </WeekDiv>
        );
    }

    if (index === 1)
        return (
            <WeekDayDiv className={'weekly-cell'}>
                {date.getDate()}
            </WeekDayDiv>
        );

    return (
        <WeeklyCellDiv 
            onClick={onClickDate}
            onDragEnter={onDragEnterCell}
            onDragOver={(e) => e.preventDefault()}
            onDrop={onDropSchedule}
        >
            {/* {isnewClick &&            
            <WeeklySchedule
                style={{ height:"50px" }}
            >
                <p>{`${formatTime(defaultData.startTime.hour, defaultData.startTime.minute)} ~ ${formatTime(defaultData.endTime.hour, defaultData.endTime.minute)}`}</p>
                <p>(제목없음)</p>
            </WeeklySchedule>} */}

        {schedule.length>0 &&  schedule.map((sch, i) => {
            // console.log("schedule.length", schedule)
        return(
            <WeeklySchedule
                key={i}
                style={{ height: height[sch.id] }}
                onClick={(e) => onClickSchedule(e, sch)}
                draggable
                onDragStart={(e) => onDragCell(e, sch)}
                teacher= {sch.teacher}
                customstylewidth={styleWidths[sch.id]} 
                customstyleleft={schedule.length>1? null : StyleLefts[sch.id] } 
            >
                <p>{`${formatTime(sch.startTime.hour, sch.startTime.minute)} ~ ${formatTime(sch.endTime.hour, sch.endTime.minute)}`}</p>
                <p>{sch.name}</p>
                <ResizeHandle
                onMouseDown={(e) => onResizeMouseDown(e, sch)}
                onClick={(e) => e.stopPropagation()}
                />
            </WeeklySchedule>
            ) 
        })}
        </WeeklyCellDiv>
    );
};

//주간 캘린더 요일
const WeekDiv = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;

    color: var(--gray-gray-006, #555);
    font-family: "Pretendard Variable";
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    padding-top: 9px;
    padding-bottom: 6px;
    border-left: 1px solid var(--gray-gray-005, #FFF);
    border-right: 1px solid var(--gray-gray-005, #FFF);
`;

//주간 캘린더 날짜
const WeekDayDiv = styled.div`  
    display: flex;
    width: 100%;
    justify-content: center;
    color: var(--gray-gray-006, #555);
    font-family: "Pretendard Variable";
    font-size: 26px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-bottom: 24px;
    border-left: 1px solid var(--gray-gray-005, #FFF);
    border-right: 1px solid var(--gray-gray-005, #FFF);
`;

//주간 캘린더 한 칸
const WeeklyCellDiv = styled.div`
    width: 100%;
    height: 12.5px; //셀 한칸의 크기
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    cursor: pointer;
    overflow: visible;
    border-bottom: solid 1px #FFF; //배경색

    &:nth-child(3) {
        border-top: 1px solid var(--gray-gray-005, #BABABA);
        /* border-bottom: solid 1px #E0E0E0;  */
    }

    &:nth-child(4n + 2) {
    border-bottom: solid 1px #E0E0E0; 
    }
`;

//일정 
const WeeklySchedule = styled.div`
    display: flex;
    flex-direction: column;
    /* width: 100%; */

    width: ${props => {
        if (props.customstylewidth === '100%') {
            return 'calc(100%)'; // 100%인 경우 10px 빼기
        }
        return props.customstylewidth ? `calc(${props.customstylewidth})` : '100%';
    }};
    left: ${props => props.customstyleleft || '0%'};

    border-radius: 5px;

    background: ${(props) => {
    switch (props.teacher) {
        case "김삼유":
        return "rgba(149, 194, 92, 0.30)";
        case "장영해":
        return "rgba(216, 205, 99, 0.30)";
        case "전재우":
        return "rgba(188, 215, 234, 0.30)";
        default:
        return "#95c25c";
    }
    }};
    padding: 5px 5px 5px 0;
    /* margin: 5px; */
    border-radius: 5px;
    z-index: 3;
    cursor: pointer;
    position: relative;
    overflow: scroll;
    border-left: solid 4px ${(props) => {
    switch (props.teacher) {
        case "김삼유":
        return "#95C25C";
        case "장영해":
        return "#D8CD63";
        case "전재우":
        return  "#BCD7EA"
        default:
        return "#95c25c";
    }
    }};

    &:hover {
    opacity: 0.5;
    }

    p {
        margin: 0;
        padding-left: 12px;
        /* padding-top:7% ; */
        color: #000;
        font-family: "Pretendard Variable";
        font-size: 15px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
    }

    p:first-child{
        color: #000;
        font-family: "Pretendard Variable";
        font-size: 13px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        padding-top:7% ;
        padding-bottom: 7px;
    }
`;

//리사이징
const ResizeHandle = styled.div`
    width: 100%;
    height: 10px;
    cursor: ns-resize;
    position: absolute;
    bottom: 0;
    left: 0;
`;

export default WeeklyCell;