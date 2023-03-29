import React from "react";
import { Link, Stack } from "@mui/material";
import Text from "components/Text";
import colorPalette from "styles/colorPalette";

function NotFound() {
  const divStyle = {
    width: "90vw",
    height: "80vh",
    backgroundImage: `url("https://www.myro.co.kr/myro_image/mainN7.jpg")`,
    backgroundSize: "cover",
  };

  const titleLeft = {
    fontSize: "2.5rem",
    lineHeight: "1.4",
    margin: "0 0 20px 0",
    fontWeight: 400,
  };

  const titleRight = {
    margin: "0 0 20px 0",
    marginTop: "40px",
    lineHeight: "1.2",
    fontFamily: "Montserrat",
    fontSize: "3.625rem",
    fontWeight: 700,
    borderLeft: "3px solid rgba(255, 255, 255, 0.7)",
    marginLeft: "16px",
    paddingLeft: "16px",
  };

  const titleHome = {
    fontSize: "1.2rem",
    fontWeight: 500,
    textDecoration: "underline",
    textUnderlineOffset: "4px",
    color: colorPalette.darkgray,
  };

  return (
    <Stack direction="column" alignItems="center" mt={11}>
      <Stack style={divStyle} justifyContent="center" alignItems="center">
        <Stack direction="row" alignItems="center" color={"white"} mb={15}>
          <span style={titleLeft}>AI 여행 스케줄링 플래너</span>
          <span style={titleRight}>MYRO</span>
        </Stack>
        <Stack alignItems="center" spacing={4}>
          <Text value="잘못된 요청 경로입니다" type="groupTitle" bold color="black" />
          <Link href="/" color="inherit" underline="none">
            <span style={titleHome}>홈으로 가기</span>
          </Link>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default NotFound;
