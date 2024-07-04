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
export const formatDate = (date) =>{
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}년 ${month}월 ${day}일`;
}
