import { recoilPersist } from "recoil-persist";
import { atom } from "recoil";

const { persistAtom } = recoilPersist();

export const loginCheck = atom({
  key: "loginState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const currentPageState = atom({
  key:"currentPageState",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

export const totalElementsState = atom({
  key:"totalElementsState",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

export const totalPageState = atom({
  key:"totalPageState",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

export const isHiddenState = atom({
  key: "isHiddenState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const dataState = atom({
  key: "dataState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const selectedStudentState = atom({
  key: "selectedStudentState",
  default: [],
});

export const getCalendarData = atom({
  key: "getCalendarData",
  default: [],
  effects_UNSTABLE: [persistAtom]
});
