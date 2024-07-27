import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

const MultiDatePicker = ({ multidates, setmultiDates }) => {
  const [startDate, setStartDate] = useState(null);

  const handleChange = (date) => {
    if (date) {
      const newDate = format(date, 'yyyy-MM-dd');
      if (multidates.some(d => format(d, 'yyyy-MM-dd') === newDate)) {
        // 이미 선택된 날짜라면 제거
        setmultiDates(multidates.filter(d => format(d, 'yyyy-MM-dd') !== newDate));
      } else {
        // 새로운 날짜 추가
        setmultiDates([...multidates, date]);
      }
    }
  };

  return (
    <div>
      <DatePicker
        selected={startDate}
        onChange={date => {
          setStartDate(date);
          handleChange(date);
        }}
        onClickOutside={() => setStartDate(null)}
        selectsStart
        startDate={startDate}
        dateFormat="yyyy/MM/dd"
        inline
        highlightDates={multidates}
      />
      <div>
        <h3>선택한 날짜들:</h3>
        <ul>
          {multidates.length > 0 && multidates.map(date => (
            <li key={format(date, 'yyyy-MM-dd')}>{format(date, 'yyyy-MM-dd')}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MultiDatePicker;
