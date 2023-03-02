import { Button, Menu, MenuItem, MenuList } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Text from "components/Text";
import React from "react";

const options = ["인기순", "추천순", "오름차순", "내림차순"];

const MainDestinationsFilter = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const open = Boolean(anchorEl);

  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{ margin: "10px 0" }}>
      {/* <List component="nav" sx={{ bgcolor: "background.paper" }}>
        <ListItem
          button
          id="lock-button"
          aria-haspopup="listbox"
          aria-controls="lock-menu"
          // aria-label="when device is locked"
          // aria-expanded={open ? "true" : undefined}
          onClick={handleClickListItem}
        >
          <ListItemText primary={options[selectedIndex]} />
        </ListItem>
      </List> */}
      <Button
        id="lock-button"
        aria-haspopup="listbox"
        area-aria-controls="lock-menu"
        onClick={handleClickListItem}
        endIcon={<KeyboardArrowDownIcon sx={{ color: "black" }} />}
      >
        <Text value={options[selectedIndex]} type="caption" />
      </Button>

      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "lock-button",
          role: "listbox",
        }}
      >
        <MenuList dense>
          {options.map((option, index) => (
            <MenuItem
              key={option}
              selected={index === selectedIndex}
              onClick={(event) => handleMenuItemClick(event, index)}
            >
              {option}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </div>
  );
};

export default MainDestinationsFilter;
