import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Avatar, Box, Menu, MenuItem, Stack, ButtonBase, Badge, IconButton } from "@mui/material";
import { Notifications } from "@mui/icons-material";
import Text from "./Text";
import styles from "./css/Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import Notice from "features/user/notice/Notice";
import { rootState } from "app/store";
import { setLogout, selectUserInfo, setUserInfo } from "slices/authSlice";
import { useAppSelector } from "app/hooks";
import HeaderMobile from "./HeaderMobile";
import MenuIcon from "@mui/icons-material/Menu";
import Axios from "api/JsonAxios";
import api from "api/Api";
import { selectNotiNumber } from "slices/mainSlice";

const AvatarStyled = styled(Avatar)(() => ({
  margin: 3,
  width: "30px",
  height: "30px",
  fontSize: "1rem",
}));

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userInfo = useAppSelector(selectUserInfo);
  const { login, accessToken } = useSelector((state: rootState) => state.auth);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [anchorElNotice, setAnchorElNotice] = React.useState<null | HTMLElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const notiNumber = useAppSelector(selectNotiNumber);

  useEffect(() => {
    window.addEventListener("scroll", updateScroll);
  });

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    if (login) {
      await Axios.post(api.auth.token(), {
        accessToken: accessToken,
      }).catch((err) => {
        console.log("토큰 에러:", err);
        dispatch(setLogout());
        navigate("/");
      });
    }
  };

  const onLogout = () => {
    handleCloseUserMenu();
    dispatch(setLogout());
    window.location.replace("/");
  };

  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenNotice = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNotice(event.currentTarget);
  };

  const handleCloseNotice = () => {
    setAnchorElNotice(null);
  };

  const toggleDrawer = (open: boolean) => {
    setDrawerOpen(open);
  };

  if (["/login", "/regist"].includes(location.pathname)) return null;
  else
    return (
      <header>
        <div
          className={`${styles.wrapper} ${location.pathname == "/" && scrollPosition < 200 ? "" : styles.isScroll}`}
          style={location.pathname.includes("schedule") ? { position: "static" } : { position: "fixed" }}
        >
          <NavLink to="/" className={styles.link}>
            <Stack direction="row" spacing={1} alignItems="baseline">
              <span className={styles.title}>MYRO</span>
              <span className={styles.subTitle}>MAKE YOUR ROUTE OPTIMIZED</span>
            </Stack>
          </NavLink>

          {/* 모바일 사이드메뉴 */}
          <div id={styles.mobileDrawer}>
            <MenuIcon className={styles.mobileBtn} onClick={() => toggleDrawer(true)} />
            <HeaderMobile open={drawerOpen} setDrawerOpen={setDrawerOpen} />
          </div>
          {/* 모바일 사이드메뉴 */}

          <Stack id={styles.nav} direction="row" spacing={3} alignItems="center">
            {location.pathname == "/" && (
              <span className={styles.link} style={{ color: scrollPosition < 200 ? "white" : "black" }}>
                여행지
              </span>
            )}

            {login ? (
              <>
                <Box sx={{ flexGrow: 0 }}>
                  <ButtonBase onClick={handleOpenNotice} disableRipple>
                    <IconButton
                      sx={{ color: location.pathname == "/" && scrollPosition < 200 ? "white" : "black" }}
                      disableRipple
                    >
                      <Badge color="error" overlap="circular" badgeContent={notiNumber}>
                        <Notifications />
                      </Badge>
                    </IconButton>
                  </ButtonBase>
                  <Menu
                    sx={{
                      cursor: "pointer",
                      "& .MuiList-root": {
                        pt: 0,
                        pb: 0,
                      },
                    }}
                    anchorEl={anchorElNotice}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1,
                        ml: 0,
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          mr: 1,
                        },
                        "&:before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 10,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%)  rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    }}
                    open={Boolean(anchorElNotice)}
                    onClose={handleCloseNotice}
                  >
                    <MenuItem onClick={handleCloseNotice}>
                      <Notice />
                    </MenuItem>
                  </Menu>
                </Box>
                <Box sx={{ flexGrow: 0 }}>
                  <ButtonBase onClick={handleOpenUserMenu} disableRipple>
                    {userInfo.profile == "" ? (
                      <AvatarStyled sx={{ bgcolor: "#63C6E6" }}>{userInfo.nickname.slice(0, 1)}</AvatarStyled>
                    ) : (
                      <AvatarStyled sx={{ bgcolor: "transparent" }}>
                        <img src={userInfo.profile} style={{ width: "100%" }} />
                      </AvatarStyled>
                    )}
                    {/* {menuOpen ? <KeyboardArrowUp fontSize="small" /> : <KeyboardArrowDown fontSize="small" />} */}
                  </ButtonBase>
                  <Menu
                    sx={{
                      cursor: "pointer",
                      "& .MuiList-root": {
                        pt: 0,
                        pb: 0,
                      },
                    }}
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1,
                        ml: 0,
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          mr: 1,
                        },
                        "&:before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 10,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%)  rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem onClick={handleCloseUserMenu}>
                      <NavLink to="/mypage" className={styles.link}>
                        <Text value="마이페이지" type="caption" />
                      </NavLink>
                    </MenuItem>
                    <MenuItem onClick={onLogout}>
                      <Text value="Logout" type="caption" />
                    </MenuItem>
                  </Menu>
                </Box>
              </>
            ) : (
              <NavLink
                to="/login"
                className={styles.link}
                style={{ color: location.pathname == "/" && scrollPosition < 200 ? "white" : "black" }}
              >
                로그인
              </NavLink>
            )}
          </Stack>
        </div>
      </header>
    );
}

export default Header;
