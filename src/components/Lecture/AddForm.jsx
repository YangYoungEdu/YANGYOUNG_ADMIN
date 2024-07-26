import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import '../../style/css/app.css';
import { insertDate, deleteDate, editDate } from './UserDataController.jsx';
// store
import { useAddFormState } from '../../stores/addFormState.jsx';
import { useUserData } from '../../stores/userData.jsx';
import { useErrorState } from '../../stores/errorState.jsx';

const AddForm = () => {
  const [addFormState, setAddFormState] = useAddFormState();
  const { active, mode } = addFormState;

  const [newAddFormState, setNewAddFormState] = useState({
    lectureType: '',
    name: '',
    room: '',
    teacher: '',
    curDate: new Date(),
    startTime: { hour: 0, minute: 0, second: 0, nano: 0 },
    endTime: { hour: 1, minute: 0, second: 0, nano: 0 }
  });
  const { lectureType, name, room, teacher, curDate, startTime, endTime } = newAddFormState;
  const [userData, setUserData] = useUserData();
  const { schedule } = userData;
  const [beforeEdit, setBeforeEdit] = useState();
  const [errorState, setErrorState] = useErrorState();

  useEffect(() => {
    if (active) {
      const { lectureType,name, room, teacher, curDate, startTime, endTime } = addFormState;
      setNewAddFormState({
        lectureType: lectureType || '',
        name:name|| '' , 
        room: room|| '',
        teacher: teacher || '',
        curDate: curDate || new Date(),
        startTime: startTime || { hour: 0, minute: 0, second: 0, nano: 0 },
        endTime: endTime || { hour: 1, minute: 0, second: 0, nano: 0 }
      });
      if (mode === 'edit') {
        setBeforeEdit({ lectureType, name, room, teacher, curDate, startTime, endTime });
      }
    }
  }, [active, addFormState, mode]);

  const onChangeCurDate = (value) => {
    setNewAddFormState({ ...newAddFormState, curDate: value });
  };

  const onChangeNewAddFormState = (e) => {
    const { id, value } = e.target;
    console.log('밸류', value);
    const intValue = parseInt(value, 10);
    switch (id) {
      case 'input-lectureType':
        setNewAddFormState({ ...newAddFormState, lectureType: value });
        break;
      case 'input-name':
        setNewAddFormState({ ...newAddFormState, name: value });
        break;
      case 'input-room':
        setNewAddFormState({ ...newAddFormState, room: value });
        break;
      case 'teacher-select':
        setNewAddFormState({
          ...newAddFormState,
          teacher: value
        });
        break;
      case 'start-hour':
        setNewAddFormState({
          ...newAddFormState,
          startTime: { ...startTime, hour: intValue }
        });
        break;
      case 'start-minute':
        setNewAddFormState({
          ...newAddFormState,
          startTime: { ...startTime, minute: intValue }
        });
        break;
      case 'end-hour':
        setNewAddFormState({
          ...newAddFormState,
          endTime: { ...endTime, hour: intValue }
        });
        break;
      case 'end-minute':
        setNewAddFormState({
          ...newAddFormState,
          endTime: { ...endTime, minute: intValue }
        });
        break;
      default:
        break;
    }
  };

  const onClickCancel = () => {
    setAddFormState({ ...addFormState, active: false });
  };

  const onClickAdd = () => {
    if (lectureType === '') return;

    const newSchedule = insertDate(newAddFormState, schedule);
    if (newSchedule !== false) {
			console.log("일정추가", newAddFormState);
      setUserData({ ...userData, schedule: newSchedule });
      setAddFormState({ ...addFormState, active: false });
      setErrorState({
        ...errorState,
        active: true,
        mode: 'add',
        message: [['일정이 추가 되었습니다.']]
      });


    } else {
      setErrorState({
        ...errorState,
        active: true,
        mode: 'fail',
        message: [['일정을 추가할 수 없습니다.'], ['해당 시간에 이미 다른 일정이 존재합니다.']]
      });
    }
  };

  const onClickEdit = () => {
    if (lectureType === '') return;

    const newSchedule = editDate(newAddFormState, beforeEdit, schedule);

    if (newSchedule !== false) {
      setUserData({ ...userData, schedule: newSchedule });
      setAddFormState({ ...addFormState, active: false });
      setErrorState({
        ...errorState,
        active: true,
        mode: 'edit',
        message: [['일정이 수정 되었습니다.']]
      });
    } else {
      setErrorState({
        ...errorState,
        active: true,
        mode: 'fail',
        message: [['일정을 수정할 수 없습니다.'], ['해당 시간에 이미 다른 일정이 존재합니다.']]
      });
    }
  };

  const onClickDelete = () => {
    const newSchedule = deleteDate(curDate, startTime, endTime, schedule);
    setUserData({ ...userData, schedule: newSchedule });
    setAddFormState({ ...addFormState, active: false });
    setErrorState({
      ...errorState,
      active: true,
      mode: 'delete',
      message: [['일정이 삭제 되었습니다.']]
    });
  };

  if (!active) return null;
  else if (active)
    return (
      <div id="panel">
        <div id="add-form">
          <div id="add-form-title">{mode === 'add' ? '일정 추가' : '일정 수정'}</div>
          <div id="input-form">
            <div className="label">타입</div>
            <input id="input-lectureType" value={lectureType} onChange={onChangeNewAddFormState} />
          </div>
          <div id="input-form">
            <div className="label">이름</div>
            <input id="input-name" value={name} onChange={onChangeNewAddFormState} />
          </div>
          <div id="teacher-picker-form">
            <div className="label">담당 선생님</div>
            <div>
              <select id="teacher-select" value={teacher} onChange={onChangeNewAddFormState}>
                <option value="">선택하세요</option>
                <option value="김삼유">김삼유</option>
                <option value="장영해">장영해</option>
                <option value="전재우">전재우</option>
              </select>
            </div>
          </div>
          <div id="input-form">
            <div className="label">강의실</div>
            <input id="input-room" value={room} onChange={onChangeNewAddFormState} />
          </div>

          <div id="date-picker-form">
            <div className="label">날짜</div>
            <div id="date-picker">
              <DatePicker selected={curDate} onChange={onChangeCurDate} />
            </div>
          </div>
          <div id="time-picker-form">
            <div className="label">시작 시간</div>
            <div>
              <select id="start-hour" value={startTime.hour} onChange={onChangeNewAddFormState}>
                {Array.from({ length: 24 }, (_, i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
              시
              <select id="start-minute" value={startTime.minute} onChange={onChangeNewAddFormState}>
                {Array.from({ length: 60 }, (_, i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
              분
            </div>
          </div>
          <div id="time-picker-form">
            <div className="label">종료 시간</div>
            <div>
              <select id="end-hour" value={endTime.hour} onChange={onChangeNewAddFormState}>
                {Array.from({ length: 24 }, (_, i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
              시
              <select id="end-minute" value={endTime.minute} onChange={onChangeNewAddFormState}>
                {Array.from({ length: 60 }, (_, i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
              분
            </div>
          </div>
          <div id="option-form">
            <div id="cancel-btn" className="btn" onClick={onClickCancel}>
              취소
            </div>
            {mode === 'add' ? (
              <div id="add-btn" className="btn" onClick={onClickAdd}>
                저장
              </div>
            ) : null}
            {mode === 'edit' ? (
              <>
                <div id="edit-btn" className="btn" onClick={onClickEdit}>
                  수정
                </div>
                <div id="delete-btn" className="btn" onClick={onClickDelete}>
                  삭제
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    );
};

export default AddForm;
