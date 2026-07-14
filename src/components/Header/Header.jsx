import React from "react";
import { AppBar, Box, Toolbar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {
  StyledTitle,
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "./style";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <StyledTitle variant="h5">
          Travel Advisor
        </StyledTitle>
        <Box display="flex">
          <StyledTitle variant="h6">
            Explore new places
          </StyledTitle>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;