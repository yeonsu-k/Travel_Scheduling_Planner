// 기본 url
const HOST = process.env.REACT_APP_API_BASE_URL + "/api/";

// 세부 url
const AUTH = "auth/";
const USER = "user/";
const FRIEND = "friend/";
const NOTIFICATION = "notification/";
const SCHEDULE = "schedule/";
const SCHEDULE2 = "schedule2/";

interface apiInterface {
  auth: {
    login: () => string; // 로그인
    logout: () => string; //로그아웃
    kakaoLogin: () => string; // 카카오 로그인
    join: () => string; // 회원가입
    duplicatedCheck: () => string; // 이메일 중복확인
  };
  user: {
    user: () => string; // 마이페이지 조회 & 회원정보 수정 & 회원탈퇴
    editProfile: () => string; // 프로필 사진 등록/수정
    getScheduleList: () => string; // 일정 목록 조회
    schedule: (schedule_id: number) => string; // 여행 이름 수정 & 일정 삭제
    shareSchedule: (schedule_id: number) => string; // 완성된 일정 공유
    openSchedule: (schedule_id: number) => string; // 일정 공개여부 수정
    mobileSchedule: (schedule_id: number) => string; // 모바일 일정표 조회
    excelSchedule: (schedule_id: number) => string; // 엑셀 일정표 조회
  };
  friend: {
    friend: () => string; // 친구 목록 확인 & 친구 삭제 & 친구 요청
    searchUser: () => string; // 사용자 검색
  };
  notification: {
    deleteOneNotification: (notification_id: number) => string; // 알림 개별 삭제
    deleteAllNotification: () => string; // 알림 전체 삭제
  };
  createSchedule: {
    schedule: () => string; // 여행 일정 생성 & 여행지 검색
    getTravels: () => string; // 여행기 조회
    inviteFriend: (schedule_id: number) => string; // 일정공유 - 친구 초대하기
    getFullList: (schedule_id: number) => string; // 일정 내용 전체 조회
    mainPlace: () => string; // 메인 장소 저장 & 메인 장소 조회 & 메인 장소 리스트 조회
    period: (schedule_id: number) => string; // 일정 기간 저장 & 일정 기간 조회
    startEndPlace: (schedule_id: number) => string; // 일정시작/끝장소 저장 & 일정시작/끝장소 조회
    selectPlace: (schedule_id: number) => string; // 선택 장소 저장 & 선택 장소 조회
    hotel: (schedule_id: number) => string; // 선택 호텔 조회
    vehicle: (schedule_id: number) => string; // 이동 수단 저장 & 이동 수단 조회
    searchLocation: () => string; // 장소 검색
    getRecommendHotel: () => string; // 추천 호텔 조회
    location: () => string; // 추천 장소 조회 & 장소 상세 조회
    getLocationDetail: (location_id: number) => string; // 장소 상세 조회
    makeSchedule: () => string; // 일정 생성 완료
  };
  editSchedule: {
    getScheduleInfo: (schedule_id: number) => string; // 일정 정보 조회
    saveSchedule: () => string; // 일정 정보 저장(순서, 시간)
    getScheduleDetail: (schedule_id: number) => string; // 일정 상세 조회
    makeSchedule: () => string; // 일정생성2 완료
  };
}

const api: apiInterface = {
  auth: {
    login: () => HOST + AUTH + "login",
    logout: () => HOST + AUTH + "logout",
    kakaoLogin: () => HOST + AUTH + "kakao",
    join: () => HOST + AUTH + "join",
    duplicatedCheck: () => HOST + AUTH + "email",
  },
  user: {
    user: () => HOST + "user",
    editProfile: () => HOST + USER + "profile",
    getScheduleList: () => HOST + USER + "schedule_list",
    schedule: (schedule_id) => HOST + USER + schedule_id,
    shareSchedule: (schedule_id) => HOST + USER + "share/" + schedule_id,
    openSchedule: (schedule_id) => HOST + USER + "open/" + schedule_id,
    mobileSchedule: (schedule_id) => HOST + USER + "mobile/" + schedule_id,
    excelSchedule: (schedule_id) => HOST + USER + "excel/" + schedule_id,
  },
  friend: {
    friend: () => HOST + "friend",
    searchUser: () => HOST + FRIEND + "search",
  },
  notification: {
    deleteOneNotification: (notification_id) => HOST + NOTIFICATION + notification_id,
    deleteAllNotification: () => HOST + NOTIFICATION,
  },
  createSchedule: {
    schedule: () => HOST + SCHEDULE,
    getTravels: () => HOST + SCHEDULE + "travels",
    inviteFriend: (schedule_id) => HOST + SCHEDULE + FRIEND + schedule_id,
    getFullList: (schedule_id) => HOST + SCHEDULE + schedule_id,
    mainPlace: () => HOST + SCHEDULE + "main",
    period: (schedule_id) => HOST + SCHEDULE + "period/" + schedule_id,
    startEndPlace: (schedule_id) => HOST + SCHEDULE + "start/" + schedule_id,
    selectPlace: (schedule_id) => HOST + SCHEDULE + "select/" + schedule_id,
    hotel: (schedule_id) => HOST + SCHEDULE + "hotel/" + schedule_id,
    vehicle: (schedule_id) => HOST + SCHEDULE + "vehicle/" + schedule_id,
    searchLocation: () => HOST + SCHEDULE + "location",
    getRecommendHotel: () => HOST + SCHEDULE + "hotel",
    location: () => HOST + SCHEDULE + "location",
    getLocationDetail: (location_id) => HOST + SCHEDULE + location_id,
    makeSchedule: () => HOST + SCHEDULE + "make",
  },
  editSchedule: {
    getScheduleInfo: (schedule_id) => HOST + SCHEDULE2 + schedule_id,
    saveSchedule: () => HOST + SCHEDULE2 + "info",
    getScheduleDetail: (schedule_id) => HOST + SCHEDULE2 + "info/" + schedule_id,
    makeSchedule: () => HOST + SCHEDULE2 + "info/make",
  },
};

export default api;
