import React from 'react';
import styled from 'styled-components';

// 요일 배열 정의
const daysOfWeek = [
  { label: '월요일', value: 1 },
  { label: '화요일', value: 2 },
  { label: '수요일', value: 3 },
  { label: '목요일', value: 4 },
  { label: '금요일', value: 5 },
  { label: '토요일', value: 6 },
  { label: '일요일', value: 0 }
];

const MultiWeekdayPicker = ({ selectedDays, setSelectedDays }) => {
  const handleChange = (dayValue) => {
    setSelectedDays(prevSelectedDays => {
      if (prevSelectedDays.includes(dayValue)) {
        // 이미 선택된 날이면 제거
        return prevSelectedDays.filter(day => day !== dayValue);
      } else {
        // 새로 선택된 날이면 추가
        return [...prevSelectedDays, dayValue];
      }
    });
  };

  return (
    <div>
      {daysOfWeek.map(day => (
        <div key={day.value}>
          <label>
            <input
              type="checkbox"
              checked={selectedDays.includes(day.value)}
              onChange={() => handleChange(day.value)}
            />
            {day.label}
          </label>
        </div>
      ))}
      <div>
        <h3>선택된 요일들:</h3>
        <ul>
          {selectedDays.length > 0 && selectedDays.map(dayValue => (
            <li key={dayValue}>{daysOfWeek.find(day => day.value === dayValue).label}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MultiWeekdayPicker;
