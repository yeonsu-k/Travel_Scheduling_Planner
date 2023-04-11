import React, { Dispatch, SetStateAction } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import styles from "./css/Header.module.css";
import { Avatar } from "@mui/material";
import Text from "./Text";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { selectLoginState, selectUserInfo, setLogout } from "slices/authSlice";
import { disconnectSocket } from "features/user/notice/Socket";
import { useAppSelector } from "app/hooks";

interface HeaderMobileProps {
  open: boolean;
  setDrawerOpen: Dispatch<SetStateAction<boolean>>;
}

const HeaderMobile = ({ open, setDrawerOpen }: HeaderMobileProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const login = useAppSelector(selectLoginState);
  const userInfo = useAppSelector(selectUserInfo);

  const onLogout = () => {
    dispatch(setLogout());
    disconnectSocket();
    window.location.replace("/"); // 새로고침 하면서 로그아웃
  };

  return (
    <Drawer anchor="right" open={open} onClose={() => setDrawerOpen(false)}>
      <Box sx={{ width: "60vw" }}>
        {login ? (
          <Box className={styles.mobileProfile}>
            {userInfo.profile == "" ? (
              <Avatar sx={{ width: 60, height: 60, bgcolor: "#63C6E6" }}>
                <Text value={userInfo.nickname.slice(0, 1)} type="caption" color="white" />
              </Avatar>
            ) : (
              <Box className={styles.mobileProfileImg}>
                <img src={userInfo.profile} alt="프로필" />
              </Box>
            )}
            <Box sx={{ pt: 1 }}>
              <Text value={userInfo.nickname} type="caption" color="black" />
            </Box>
            <Box
              onClick={onLogout}
              sx={{ width: 65, textAlign: "center", backgroundColor: "#000", pt: 1, pb: 1, pl: 2, pr: 2, mt: 1 }}
            >
              <Text value="로그아웃" type="caption" color="white" />
            </Box>
          </Box>
        ) : (
          <Box className={styles.mobileProfile}>
            <Avatar sx={{ width: 60, height: 60, bgcolor: "#63C6E6", mt: 2 }}></Avatar>
            <Box
              onClick={() => navigate("/login")}
              sx={{ width: 65, textAlign: "center", backgroundColor: "#000", pt: 1, pb: 1, pl: 2, pr: 2, mt: 3 }}
            >
              <Text value="로그인" type="caption" color="white" />
            </Box>
          </Box>
        )}
        <List>
          <ListItem
            onClick={() => {
              setDrawerOpen(false);
              navigate("/");
            }}
          >
            <ListItemButton>
              <ListItemText disableTypography primary="메인페이지" sx={{ fontSize: "0.9rem", letterSpacing: 3 }} />
            </ListItemButton>
          </ListItem>
          <ListItem
            onClick={() => {
              setDrawerOpen(false);
              navigate("/mypage");
            }}
          >
            <ListItemButton>
              <ListItemText disableTypography primary="마이페이지" sx={{ fontSize: "0.9rem", letterSpacing: 3 }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default HeaderMobile;
