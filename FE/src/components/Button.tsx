import React from "react";
import palette from "styles/colorPalette";
import Button from "@mui/material/Button";

interface Props {
  text: string;
  color?: "main" | "pink";
  radius?: boolean;
  width?: string;
  height?: string;
  disabled?: boolean;
  onClick?: () => void | undefined;
}

export const ButtonStyled = ({ text, color, radius, width, height, ...rest }: Props) => {
  const style = {
    background: color === "main" ? palette.main : color === "pink" ? palette.pink : palette.white,
    color: color === "main" ? palette.white : color === "pink" ? palette.black : "#666",
    border: color ? "" : "1px solid #efefef",
    borderRadius: radius ? "5px" : "0px",
    padding: color ? "0.3rem 0.8rem" : "0.5rem 1.4rem",
    boxShadow: color ? "" : "0px 5px 16px rgba(0, 0, 0, 0.08)",
    width: width,
    height: height,
    fontFamily: "Pretendard-Regular",
    fontWeight: color ? "600" : "500",
  };
  return (
    <Button style={style} {...rest}>
      {text}
    </Button>
  );
};

ButtonStyled.defaultProps = {
  text: "BUTTON",
  color: "",
  width: "",
  height: "",
  radius: false,
  disabled: false,
  onClick: undefined,
};

export default ButtonStyled;
