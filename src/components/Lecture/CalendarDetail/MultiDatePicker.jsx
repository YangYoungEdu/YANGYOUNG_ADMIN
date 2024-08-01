import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

const MultiDatePicker = ({ multidates, setmultiDates, curDate }) => {
  const [startDate, setStartDate] = useState(curDate);
  
  // 컴포넌트가 마운트될 때 multidates를 리셋하고 curDate를 추가
  useEffect(() => {
    if (curDate) {
      const formattedDate = format(curDate, 'yyyy-MM-dd');
      // multidates를 새롭게 설정 (리셋)하고 curDate를 추가
      setmultiDates([formattedDate]);
      setStartDate(curDate); // DatePicker의 시작 날짜도 curDate로 설정
    }
  }, [curDate, setmultiDates]);

  const handleChange = (date) => {
    console.log('받은 날자 확인', curDate);
    if (date) {
      const newDate = format(date, 'yyyy-MM-dd');
      if (multidates.includes(newDate)) {
        // 이미 선택된 날짜라면 제거
        setmultiDates(multidates.filter(d => d !== newDate));
      } else {
        // 새로운 날짜 추가
        setmultiDates([...multidates, newDate]);
      }
    }
  };

  return (
    <div>
      <div>
        <ul>
          {multidates.length > 0 && multidates.map(date => (
            <li key={date}>{date}</li>
          ))}
        </ul>
      </div>
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
        highlightDates={multidates.map(d => new Date(d))}
      />
      
    </div>
  );
};

export default MultiDatePicker;
