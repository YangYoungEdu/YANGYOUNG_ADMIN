import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';

import { useAddFormState } from '../../../stores/addFormState.jsx';
import AddForm from './AddForm.jsx';
import EditForm from './EditForm.jsx';

const CalendarModal = () => {
  const [addFormState, setAddFormState] = useAddFormState();
  const { active, mode } = addFormState;

  if (!active) {
    return null; // `active`가 false일 경우 아무 것도 렌더링하지 않습니다.
  }
  // `active`가 true일 경우
  return mode === "add" ? <AddForm /> : <EditForm/>;
}

export default CalendarModal;
