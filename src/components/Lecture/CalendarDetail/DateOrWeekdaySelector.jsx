import React, { useState } from 'react';
import MultiDatePicker from './MultiDatePicker'; // 경로에 맞게 수정
import MultiWeekdayPicker from './MultiWeekdayPicker'; // 경로에 맞게 수정

const DateOrWeekdaySelector = ({
  isDateSelected,
  setIsDateSelected,
  multidates,
  setmultiDates,
  selectedDays,
  setSelectedDays}) => {

  return (
    <div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={isDateSelected}
            onChange={() => setIsDateSelected(true)}
          />
          날짜 선택
        </label>
        <label>
          <input
            type="checkbox"
            checked={!isDateSelected}
            onChange={() => setIsDateSelected(false)}
          />
          요일 선택
        </label>
      </div>

      {isDateSelected ? (
        <div id="date-picker-form">
          <div id="date-picker">
            <MultiDatePicker
              multidates={multidates}
              setmultiDates={setmultiDates}
            />
          </div>
        </div>
      ) : (
        <div>
          <MultiWeekdayPicker
            selectedDays={selectedDays}
            setSelectedDays={setSelectedDays}
          />
        </div>
      )}
    </div>
  );
};

export default DateOrWeekdaySelector;
