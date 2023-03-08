import { createSlice } from "@reduxjs/toolkit";
import { rootState } from "app/store";

export interface noticeListConfig {
  notificationId: number;
  noticeType: string;
  noticeStatus: string;
  noticeProfile: string;
  noticeContent: string;
}

interface noticeConfig {
  noticeList: noticeListConfig[];
}

const initialState: noticeConfig = {
  noticeList: [
    {
      notificationId: 1,
      noticeType: "friend",
      noticeStatus: "NO_RESPONSE",
      noticeProfile: "마이로",
      noticeContent: "친구 요청",
    },
    {
      notificationId: 2,
      noticeType: "schedule",
      noticeStatus: "ACCEPT",
      noticeProfile: "마이로",
      noticeContent: "강릉 여행",
    },
  ],
};

const noticeSlice = createSlice({
  name: "notice",
  initialState,
  reducers: {
    setNoticeList: (state, { payload }) => {
      state.noticeList = payload;
    },
    resetNoticeList: (state) => {
      const tmp: noticeListConfig[] = [];
      state.noticeList = [...tmp];
    },
  },
});

export const { setNoticeList, resetNoticeList } = noticeSlice.actions;

export const selectNoticeList = (state: rootState) => state.notice.noticeList;

export default noticeSlice.reducer;
