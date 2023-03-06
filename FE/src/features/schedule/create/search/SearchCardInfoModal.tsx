import React from "react";
import styles from "./Search.module.css";
import { Close } from "@mui/icons-material";
import { Stack } from "@mui/material";
import Text from "components/Text";
import Button from "components/Button";

interface modalProps {
  place: { id: number; image: string; name: string };
  setModalOpen: () => void;
}

interface searchType {
  site: string;
  searchKeyword: string;
  x?: string;
  y?: string;
}

function searchInWeb({ site, searchKeyword, x, y }: searchType) {
  let searchUrl;
  if ("naver" == site) searchUrl = "https://search.naver.com/search.naver?query=" + searchKeyword;
  else if ("google" == site) searchUrl = "https://www.google.com/maps/search/" + searchKeyword + "/@" + x + "," + y;
  else if ("instagram" == site) searchUrl = "https://www.instagram.com/explore/tags/" + searchKeyword;
  else if ("myrealtrip" == site) searchUrl = "https://www.myrealtrip.com/q/" + searchKeyword;
  else return;
  window.open(searchUrl);
}

function SearchCardInfoModal({ place, setModalOpen }: modalProps) {
  return (
    <div className={styles.mainModalContainer}>
      <div className={styles.imgContainer}>
        <img className={styles.imgContainer} src={place.image} />
        <div className={styles.socialBtnContainer}>
          <div>
            <div
              className={styles.socialBtn}
              onClick={() =>
                searchInWeb({
                  site: "google",
                  searchKeyword: place.name,
                  // x: "35.16320037841797",
                  // y: "129.16000366210938",
                })
              }
            >
              <img src="https://www.myro.co.kr/myro_image/googlemaps_circle_btn.png" />
            </div>
            <div
              className={styles.socialBtn}
              onClick={() =>
                searchInWeb({
                  site: "naver",
                  searchKeyword: place.name,
                })
              }
            >
              <img src="https://www.myro.co.kr/myro_image/naver_circle_btn.png" />
            </div>
            <div
              className={styles.socialBtn}
              onClick={() =>
                searchInWeb({
                  site: "instagram",
                  searchKeyword: "" + place.name.replace(/\s+/g, ""),
                })
              }
            >
              <img src="https://www.myro.co.kr/myro_image/instagram_circle_btn.png" />
            </div>
          </div>
        </div>
      </div>
      <Stack justifyContent="space-between" spacing={3} p={3}>
        <Text value={place.name} type="groupTitle" />
        <div className={styles.contentGrid}>
          <span>영업시간</span>
          <span>보기</span>
          <span>홈페이지</span>
          <span></span>
          <span>주소</span>
          <span></span>
          <span>전화</span>
          <span></span>
        </div>
        <Stack direction="row" justifyContent="flex-end" spacing={1}>
          <Button text="리뷰보기 (0)" color="black" width="25%" />
          <Button text="목록에 추가" color="main" width="25%" />
        </Stack>
      </Stack>
      <div className={styles.closeBtn} onClick={() => setModalOpen()}>
        <Close />
      </div>
    </div>
  );
}

export default SearchCardInfoModal;
