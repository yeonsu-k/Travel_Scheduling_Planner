import React, { Dispatch, SetStateAction } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import styles from "./css/Header.module.css";
import { Avatar } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import Text from "./Text";
import { useNavigate } from "react-router-dom";

interface HeaderMobileProps {
  open: boolean;
  setDrawerOpen: Dispatch<SetStateAction<boolean>>;
}

const HeaderMobile = ({ open, setDrawerOpen }: HeaderMobileProps) => {
  const navigate = useNavigate();
  return (
    <Drawer anchor="right" open={open} onClose={() => setDrawerOpen(false)}>
      <Box sx={{ width: "60vw" }}>
        <Box className={styles.mobileProfile}>
          <Avatar sx={{ width: 60, height: 60, bgcolor: deepPurple[500] }}>
            <Text value="김" type="caption" color="white" />
          </Avatar>
          <Box sx={{ pt: 1 }}>
            <Text value="연수" type="caption" color="black" />
          </Box>
          <Box sx={{ backgroundColor: "#000", pt: 1, pb: 1, pl: 2, pr: 2, mt: 1 }}>
            <Text value="로그아웃" type="caption" color="white" />
          </Box>
        </Box>
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
