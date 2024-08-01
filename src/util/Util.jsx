export const getAmPm = (hour) => {
  if (hour < 12) {
    return "오전 " + hour + "시";
  } else if (hour === 12) {
    return "오후 " + hour + "시";
  } else {
    return "오후 " + (hour - 12) + "시";
  }
};

export const getTime = (time) => {
  const [hour, minute] = time.split(":").map(Number);

  if (hour < 12) {
    return `오전 ${hour}:${minute}`;
  } else if (hour === 12) {
    return `오후 ${hour}:${minute}`;
  }
  return `오후 ${hour - 12}:${minute}`;
};

// yyyy년 MM달 dd일 형식 변환 메소드
export const formatDateYMD = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}년 ${month}월 ${day}일`;
};

export const formateDateMD = (date) => {
  const [year, month, day] = date.split("-");

  return `${month}월 ${day}일`;
};

export const formatDate = (dateStr) => {
  const date = dateStr.toLocaleDateString("ko-KR");
  const match = date.match(/(\d+)\. (\d+)\. (\d+)\./);

  if (!match) {
    throw new Error('Invalid date format'); // 예외 처리: 올바르지 않은 날짜 형식일 경우 에러 처리
  }

  let [, year, month, day] = match; // 배열 해체 할당으로 각 부분 추출

  // 월과 일이 한 자리 숫자일 경우 두 자리로 만들기
  month = month.padStart(2, '0');
  day = day.padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const getDay = (day) => {
  switch (day) {
    case "월요일":
      return "1";
    case "화요일":
      return "2";
    case "수요일":
      return "3";
    case "목요일":
      return "4";
    case "금요일":
      return "5";
    case "토요일":
      return "6";
    default:
      return "0";
  }
};
