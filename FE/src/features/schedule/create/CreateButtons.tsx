import { AccountBalance, DirectionsCar, DirectionsSubway, Hotel } from "@mui/icons-material";
import { Box, Stack, TextField, Tooltip, tooltipClasses, TooltipProps, Typography } from "@mui/material";
import Modal from "components/Modal";
import Button from "components/Button";
import React, { useState } from "react";
import styles from "./Create.module.css";
import searchStyles from "../create/search/Search.module.css";
import { styled } from "@mui/material/styles";

interface ScheduleCreatPropsType {
  currentMove: string;
  setCurrentMove: React.Dispatch<React.SetStateAction<string>>;
  scheduleCreateClick: () => void;
}

const TooltipStyled = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
    fontSize: 13,
  },
}));

const CssTextField = styled(TextField)({
  "& .MuiInputLabel-root": {
    fontFamily: "Pretendard-Regular ",
    fontSize: "0.95rem",
  },
  "& label.Mui-focused": {
    color: "#26a69a",
  },
  "& .MuiFilledInput-root": {
    fontFamily: "Pretendard-Regular",
    fontSize: "0.95rem",
    backgroundColor: "white !important",
    "&:before": { borderBottom: "0px" },
    "&:hover:not(.Mui-disabled, .Mui-error):before": { borderBottom: "0px" },
    "&:after": { borderBottom: "0px" },
  },
});

function CreateButtons(props: ScheduleCreatPropsType) {
  const { currentMove, setCurrentMove, scheduleCreateClick } = props;
  const [createScheduleModal, setCreateScheduleModal] = useState(false);
  const [addPlaceModal, setAddPlaceModal] = useState(false);
  const [addCurrentTab, setAddCurrentTab] = useState("장소");

  const clickRadioButton = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddCurrentTab(e.target.value);
  };

  const MoveArr = [
    {
      name: "car",
      toolTip: "대중교통",
      icon: <DirectionsCar />,
    },
    {
      name: "bus",
      toolTip: "자동차",
      icon: <DirectionsSubway />,
    },
  ];

  return (
    <div className={`${styles.multibtndiv}`}>
      {MoveArr.map((ele, index) => {
        return (
          <TooltipStyled title={`이동수단:${ele.toolTip}`} placement="right" key={index}>
            <a
              className={currentMove === ele.name ? `${styles.floatBtn} ${styles.floatBtn_On}` : `${styles.floatBtn}`}
              onClick={() => setCurrentMove(ele.name)}
            >
              {ele.icon}
            </a>
          </TooltipStyled>
        );
      })}
      <a className={styles.floatBtn} onClick={() => setAddPlaceModal(true)}>
        장소등록
      </a>
      <a className={styles.floatBtn} onClick={() => setCreateScheduleModal(true)}>
        일정생성
      </a>
      {addPlaceModal && (
        <Modal title="" modalClose={() => setAddPlaceModal(false)}>
          <Stack alignItems="center" spacing={2}>
            <Typography variant="h5" display="block">
              장소 등록
            </Typography>
            <span style={{ color: "#999" }}>검색해도 나오지 않는 장소를 이곳에서 등록 후 다시 검색해보세요.</span>
            <span style={{ color: "#999" }} data-langnum="40">
              추가하실 장소의 유형을 선택해주세요.
            </span>

            <Stack width="40vw" spacing={1} py={2}>
              <div className={searchStyles.searchRadio}>
                <label className={searchStyles.radio_label}>
                  <input
                    type="radio"
                    value="호텔"
                    checked={addCurrentTab === "호텔"}
                    onChange={(e) => clickRadioButton(e)}
                  />
                  <span>
                    <Hotel fontSize="small" />
                    호텔
                  </span>
                </label>
                <label className={searchStyles.radio_label}>
                  <input
                    type="radio"
                    value="장소"
                    checked={addCurrentTab === "장소"}
                    onChange={(e) => clickRadioButton(e)}
                  />
                  <span>
                    <AccountBalance fontSize="small" />
                    장소
                  </span>
                </label>
              </div>

              <CssTextField variant="filled" label="장소이름(최대 50자)" />
              <CssTextField variant="filled" multiline label="설명사항(최대 200자, 생략 가능)" />
            </Stack>

            <Button text="검색" color="black" width="30%" />
          </Stack>
        </Modal>
      )}
      {createScheduleModal && (
        <Modal title="" modalClose={() => setCreateScheduleModal(false)}>
          <Stack width="400px">
            <Box pb={3}>
              <p>일정을 생성하시겠습니까?</p>
            </Box>
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
              <Button text="확인" color="main" radius width="30%" onClick={scheduleCreateClick} />
              <Button text="취소" color="black" radius width="30%" onClick={() => setCreateScheduleModal(false)} />
            </Stack>
          </Stack>
        </Modal>
      )}
    </div>
  );
}

export default CreateButtons;
