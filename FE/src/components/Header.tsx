import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Avatar, Box, Menu, MenuItem, Stack, Button, Link, ButtonBase, Badge, IconButton } from "@mui/material";
import { Notifications } from "@mui/icons-material";
import Text from "./Text";
import styles from "./css/Header.module.css";
import palette from "styles/colorPalette";
import { useDispatch, useSelector } from "react-redux";
// import { rootState } from "app/store";
// import api from "api/Api";
// import Axios from "api/JsonAxios";
// import { authActions } from "slices/authSlice";

const AvatarStyled = styled(Avatar)(() => ({
  margin: 3,
  width: "30px",
  height: "30px",
}));

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // const { login, githubId, githubImage } = useSelector((state: rootState) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
    setMenuOpen(true);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    setMenuOpen(false);
  };

  const onLogin = () => {
    // Axios.get(api.auth.getUri()).then((res) => {
    //   window.location.href = res.data.uri;
    // });
  };

  const onLogout = () => {
    handleCloseUserMenu();
    // dispatch(authActions.logout());
    navigate("/");
  };

  if (location.pathname == "/login" || location.pathname == "/regist") return null;
  else
    return (
      <header>
        <div
          className={styles.wrapper}
          style={
            location.pathname === "/map"
              ? {
                  backgroundColor: "white",
                  position: "static",
                }
              : { position: "fixed" }
          }
        >
          <NavLink to="/" className={styles.link}>
            <Stack direction="row" spacing={1} alignItems="baseline">
              <span
                style={{
                  fontFamily: "Montserrat",
                  fontWeight: "700",
                  fontSize: "2.125rem",
                }}
              >
                MYRO
              </span>
              <span
                style={{
                  fontFamily: "Montserrat",
                  fontWeight: "400",
                  fontSize: "0.7rem",
                  letterSpacing: "0.12rem",
                }}
              >
                MAKE YOUR ROUTE OPTIMIZED
              </span>
            </Stack>
          </NavLink>

          <Stack direction="row" spacing={3} alignItems="center">
            <NavLink to="/map" className={styles.link}>
              일정생성
            </NavLink>
            <NavLink to="/" className={styles.link}>
              여행지
            </NavLink>
            <NavLink target={"_blank"} to="/login" className={styles.link}>
              로그인
            </NavLink>
            <IconButton sx={{ color: "black" }} disableRipple>
              <Badge color="error" overlap="circular" badgeContent={1} variant="dot">
                <Notifications />
              </Badge>
            </IconButton>
            {
              // login ? (
              <>
                <Box sx={{ flexGrow: 0 }}>
                  <ButtonBase onClick={handleOpenUserMenu} disableRipple>
                    <AvatarStyled sx={{ bgcolor: "#63C6E6" }}>K</AvatarStyled>
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
              //)
              // : (
              // <GithubButton startIcon={<GitHub />} onClick={onLogin}>
              //   Login
              // </GithubButton>
              // )
            }
          </Stack>
        </div>
      </header>
    );
}

export default Header;
