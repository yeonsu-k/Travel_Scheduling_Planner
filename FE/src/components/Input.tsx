import * as React from "react";
import { FormControl } from "@mui/material";
import InputBox from "@mui/material/Input";
import { styled } from "@mui/material/styles";
import palette from "styles/colorPalette";

interface inputInfo {
  name: string;
  placeholder: string;
  type?: string;
  value?: string | number | readonly string[] | undefined;
  disabled?: boolean;
  size?: "medium" | "small";
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onKeyPress?: React.KeyboardEventHandler<HTMLInputElement> | undefined;
}

const InputStyle = styled(InputBox)(() => ({
  backgroundColor: palette.white,
  padding: "0px",
  fontSize: "0.95rem",
  fontFamily: "Pretendard-Regular",
  ".MuiInput-input": { padding: "7px 2px" },
  "&:before": { borderBottom: "1px solid #e0e0e0" },
  "&:hover:not(.Mui-disabled, .Mui-error):before": { borderBottom: "1px solid #e0e0e0" },
  "&:after": { borderBottom: "2px solid #39f", transition: "none" },
}));

const Input = ({ placeholder, size, ...rest }: inputInfo) => (
  <div>
    <FormControl sx={{ width: "100%", height: "100%" }}>
      <InputStyle size={size ? size : "small"} placeholder={placeholder} {...rest} />
    </FormControl>
  </div>
);

Input.defaultProps = {
  name: "input이름",
  placeholder: "input설명",
  type: "text",
};

export default Input;
