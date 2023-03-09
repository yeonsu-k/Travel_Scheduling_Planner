import React from "react";
import palette, { PaletteKeyTypes } from "styles/colorPalette";
import Button from "@mui/material/Button";

interface Props {
  text: string;
  color?: PaletteKeyTypes;
  radius?: boolean;
  width?: string;
  height?: string;
  disabled?: boolean;
  onClick?: () => void | undefined;
}

export const ButtonStyled = ({ text, color, radius, width, height, ...rest }: Props) => {
  const style = {
    background: color && palette[color],
    color: color
      ? color === "pink" || color === "gray"
        ? palette.black
        : color === "white"
        ? "#666"
        : palette.white
      : "#666",
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
  color: "white",
  width: "",
  height: "",
  radius: false,
  disabled: false,
  onClick: undefined,
};

export default ButtonStyled;
