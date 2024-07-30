export const getOverlappingIds = (schedule) => {
  const overlapMap = {}; // 강의 ID와 겹치는 강의 ID를 저장할 객체

  // 시간 문자열을 시, 분 객체로 변환하는 함수
  const parseTime = (time) => {
      const [hour, minute] = time.split(':').map(Number);
      return { hour, minute };
  };

  // 두 시간 범위가 겹치는지 확인하는 함수
  const timeRangeOverlap = (start1, end1, start2, end2) => {
      return !(start1.hour > end2.hour || (start1.hour === end2.hour && start1.minute > end2.minute) ||
               end1.hour < start2.hour || (end1.hour === start2.hour && end1.minute < start2.minute));
  };

  for (let i = 0; i < schedule.length; i++) {
      const lecture1 = schedule[i];
      const start1 = parseTime(lecture1.startTime.hour + ':' + lecture1.startTime.minute);
      const end1 = parseTime(lecture1.endTime.hour + ':' + lecture1.endTime.minute);

      if (!overlapMap[lecture1.id]) {
          overlapMap[lecture1.id] = [lecture1.id]; // 자기 자신의 ID를 배열에 포함
      }

      for (let j = 0; j < schedule.length; j++) {
          if (i !== j) {
              const lecture2 = schedule[j];
              const start2 = parseTime(lecture2.startTime.hour + ':' + lecture2.startTime.minute);
              const end2 = parseTime(lecture2.endTime.hour + ':' + lecture2.endTime.minute);

              if (lecture1.lectureDate === lecture2.lectureDate &&
                  timeRangeOverlap(start1, end1, start2, end2)) {
                  if (!overlapMap[lecture1.id].includes(lecture2.id)) {
                      overlapMap[lecture1.id].push(lecture2.id); // 겹치는 강의 ID를 배열에 추가
                  }
              }
          }
      }
  }

  return overlapMap; // 각 강의 ID별로 겹치는 강의 ID가 저장된 객체 반환
};


// ID별로 겹치는 개수에 따라 width를 결정하는 함수
export const determineWidths = (overlapMap) => {
  const widths = {}; // 각 강의 ID별로 width를 저장할 객체

  for (const [id, overlaps] of Object.entries(overlapMap)) {
      const count = overlaps.length; // 겹치는 강의 개수
      switch (count) {
          case 1:
            widths[id] = '100%'; // 겹치는 강의가 없는 경우 width를 100%로 설정
            break;
          case 2:
              widths[id] = '50%'; // 겹치는 강의가 1개인 경우 width를 50%로 설정
              break;
          case 3:
              widths[id] = '33%'; // 겹치는 강의가 2개인 경우 width를 33%로 설정
              break;
          case 4:
              widths[id] = '25%'; // 겹치는 강의가 3개인 경우 width를 25%로 설정
              break;
          default:
              widths[id] = '20%'; // 겹치는 강의가 4개 이상인 경우 width를 20%로 설정
              break;
      }
  }

  return widths; // 각 강의 ID별로 설정된 width 값을 반환
}

// 겹치는 강의의 개수에 따라 left 오프셋 배열을 반환하는 함수
export const getLeftOffsets = (count) => {
  switch (count) {
    case 1:
      return ['0%']; // 겹치는 강의가 없는 경우
    case 2:
      return ['-25%', '25%']; // 겹치는 강의가 1개인 경우
    case 3:
      return ['-33%', '0%', '33%']; // 겹치는 강의가 2개인 경우
    case 4:
      return ['-37%', '-7%', '17%', '37%']; // 겹치는 강의가 3개인 경우
    default:
      return ['-37%', '-7%', '17%', '37%']; // 겹치는 강의가 4개 이상인 경우
  }
};

// ------

export const getUniqueOverlapMap = (overlapMap) => {
  const normalizedMap = {}; // 정규화된 강의 ID와 겹치는 강의 ID를 저장할 객체
  const seenSets = new Set(); // 배열의 내용을 집합으로 저장하여 중복 제거

  for (const [id, overlaps] of Object.entries(overlapMap)) {
    // 강의 ID 배열을 정렬하고 문자열로 변환
    const sortedOverlaps = [...overlaps].sort((a, b) => a - b);
    const key = sortedOverlaps.join(',');

    // 이미 본 배열이 아니면 새로운 항목으로 추가
    if (!seenSets.has(key)) {
      seenSets.add(key);
      normalizedMap[id] = sortedOverlaps;
    }
  }

  // 정렬된 ID별로 정규화된 overlapMap을 다시 생성
  const sortedMap = Object.entries(normalizedMap)
    .map(([id, overlaps]) => [parseInt(id), overlaps])
    .sort(([id1], [id2]) => id1 - id2)
    .reduce((acc, [id, overlaps]) => {
      acc[id] = overlaps;
      return acc;
    }, {});

  return sortedMap;
};

// ID별로 겹치는 개수에 따라 left 오프셋을 결정하는 함수
export const determineLefts = (overlapMap) => {
  const lefts = {}; // 각 강의 ID별로 left 값을 저장할 객체

  // 중복된 배열을 제거하고 정렬된 overlapMap을 생성
  const uniqueOverlapMap = getUniqueOverlapMap(overlapMap);

  console.log("left uniqueOverlapMap", uniqueOverlapMap);

  for (const [id, overlaps] of Object.entries(uniqueOverlapMap)) {
    const count = overlaps.length; // 겹치는 강의 개수
    const offsets = getLeftOffsets(count);

    // 겹치는 강의 ID들에 대한 인덱스를 정렬하여 각 ID에 맞는 left 값을 할당
    const sortedOverlaps = [...overlaps].sort((a, b) => a - b);
    for (let i = 0; i < sortedOverlaps.length; i++) {
      lefts[sortedOverlaps[i]] = offsets[i] || '37%'; // 정해진 오프셋 배열에서 left 값을 가져와 할당
    }

    // 원본 ID의 left 값을 할당
    lefts[id] = offsets[Math.floor(sortedOverlaps.indexOf(parseInt(id)))] || '37%';
  }

  return lefts; // 각 강의 ID별로 설정된 left 값을 반환
}

