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
    token: () => string; // 토큰 확인
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
    notification: () => string; // 알림 조회, 알림 처리, 알림 전체 삭제
  };
  createSchedule: {
    schedule: () => string; // 여행 일정 생성 & 여행지 검색
    getTravels: () => string; // 여행기 조회
    inviteFriend: () => string; // 일정 친구 초대
    invitedFriend: (schedule_id: number) => string; // 일정공유 - 친구 초대하기
    getFullList: (schedule_id: number) => string; // 일정 내용 전체 조회
    mainPlace: () => string; // 메인 장소 저장 & 메인 장소 조회 & 메인 장소 리스트 조회
    getRegion: (region_id: number) => string; // 특정 메인 장소 조회
    basiclocation: () => string; // 기본 장소 추가
    customlocation: () => string; // 사용자 장소 추가
    searchLocation: () => string; // 장소 검색
    getRecommend: (is_hotel: number, region_id: number) => string; // 추천 호텔 및 장소 검색
    makeSchedule: () => string; // 일정 생성 완료
    setLocation: () => string;
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
    token: () => HOST + AUTH + "token",
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
    notification: () => HOST + NOTIFICATION,
  },
  createSchedule: {
    schedule: () => HOST + SCHEDULE,
    getTravels: () => HOST + SCHEDULE + "travels",
    inviteFriend: () => HOST + SCHEDULE + FRIEND,
    invitedFriend: (schedule_id) => HOST + SCHEDULE + FRIEND + schedule_id,
    getFullList: (schedule_id) => HOST + SCHEDULE + schedule_id,
    mainPlace: () => HOST + SCHEDULE + "main",
    getRegion: (region_id) => HOST + SCHEDULE + "main/" + region_id,
    basiclocation: () => HOST + SCHEDULE + "basiclocation",
    customlocation: () => HOST + SCHEDULE + "customlocation",
    searchLocation: () => HOST + SCHEDULE + "location",
    getRecommend: (is_hotel, region_id) => HOST + SCHEDULE + "location/" + is_hotel + "/" + region_id,
    makeSchedule: () => HOST + SCHEDULE + "make",
    setLocation: () => HOST + SCHEDULE + "setlocation",
  },
  editSchedule: {
    getScheduleInfo: (schedule_id) => HOST + SCHEDULE2 + schedule_id,
    saveSchedule: () => HOST + SCHEDULE2 + "info",
    getScheduleDetail: (schedule_id) => HOST + SCHEDULE2 + "info/" + schedule_id,
    makeSchedule: () => HOST + SCHEDULE2 + "info/make",
  },
};

export default api;
