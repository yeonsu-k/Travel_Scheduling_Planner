import React, { useState } from "react";
import Modal from "components/Modal";
import Button from "components/Button";
import Toast from "components/Toast";
import searchStyles from "../search/Search.module.css";
import { AccountBalance, Hotel } from "@mui/icons-material";
import { Box, Stack, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import ImageMap from "./ImageMap";

interface ButtonsAddModalType {
  setAddPlaceModal: React.Dispatch<React.SetStateAction<boolean>>;
}

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
    "&:after": { borderBottom: "2px solid #26a69a", margin: "0 6px", transition: "none" },
  },
});

function ButtonsAddModal(props: ButtonsAddModalType) {
  const { setAddPlaceModal } = props;
  const [addCurrentTab, setAddCurrentTab] = useState("장소");
  const [openToast, setOpenToast] = useState(false);
  const [addressValue, setAddressValue] = useState("");
  const [addressSearch, setAddressSearch] = useState(false);
  const [addSuccess, setAddSuccess] = useState(false);

  const clickRadioButton = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddCurrentTab(e.target.value);
  };

  const addPlaceBtnClick = () => {
    if (!addSuccess) setOpenToast(true);
    else {
      setAddSuccess(true);
      // 장소추가 API
    }
  };

  const searchClick = () => {
    // 장소 검색
    if (addressValue.length == 0) return;
    console.log(addressSearch);
  };

  return (
    <>
      <Modal title="" modalClose={() => setAddPlaceModal(false)}>
        <Stack alignItems="center" spacing={2}>
          <Typography variant="h5" display="block">
            장소 등록
          </Typography>

          <Stack component="span" width="100%" height="15vh">
            {addressSearch ? (
              <ImageMap address={addressValue} setAddressSearch={setAddressSearch} />
            ) : (
              <>
                <p style={{ color: "#999" }}>검색해도 나오지 않는 장소를 이곳에서 등록 후 다시 검색해보세요.</p>
                <p style={{ color: "#999" }}>추가하실 장소의 유형을 선택해주세요.</p>
              </>
            )}
          </Stack>

          <Stack width="40vw" spacing={1}>
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

            <Stack direction="row" spacing={1} justifyContent="space-between">
              <CssTextField
                variant="filled"
                label="주소 검색"
                fullWidth
                value={addressValue}
                onChange={(e) => setAddressValue(e.target.value)}
              />
              <Button text="검색" color="pink" width="10%" onClick={() => searchClick()} />
            </Stack>

            <CssTextField variant="filled" label="장소이름(최대 50자)" />
            <CssTextField variant="filled" multiline label="설명사항(최대 200자, 생략 가능)" />
          </Stack>

          <Button
            text="장소추가"
            color={addSuccess ? "main" : "gray"}
            width="20%"
            radius
            onClick={() => addPlaceBtnClick()}
          />
        </Stack>
      </Modal>
      <Toast message="검색된 주소만 등록할 수 있습니다. " open={openToast} onClose={setOpenToast} />
    </>
  );
}

export default ButtonsAddModal;
