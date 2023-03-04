import { createSlice } from "@reduxjs/toolkit";
import { rootState } from "app/store";

interface noticeListConfig {
  noticeType: string;
  noticeProfile: string;
  noticeContent: string;
}

interface noticeConfig {
  noticeList: noticeListConfig[];
}

const initialState: noticeConfig = {
  noticeList: [
    {
      noticeType: "friend",
      noticeProfile: "마이로",
      noticeContent: "친구 요청",
    },
    {
      noticeType: "schedule",
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
  },
});

export const { setNoticeList } = noticeSlice.actions;

export const selectNoticeSlice = (state: rootState) => state.notice.noticeList;

export default noticeSlice.reducer;
