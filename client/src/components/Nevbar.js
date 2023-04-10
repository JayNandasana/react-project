import React from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../context/DataProvider";
import { useState, useContext, useEffect } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Login from "./Login";
import Profile from "./Profile";
import { useNavigate } from "react-router-dom";

const pages = ["Templates", "Components"];

export default function Nevbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const { account, setAccount } = useContext(DataContext);

  const openDialog = () => {
    setOpen(true);
  };

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleAdminButtonClick = () => {
    navigate("/AdminPanel");
  };

  return (
    <>
      <AppBar position="fixed" style={{ backgroundColor: "#00008b" }}>
        <Container maxWidth="xl" style={{ height: 55, minHeight: 55 }}>
          <Toolbar disableGutters style={{ height: 55, minHeight: 55 }}>
            <Link to="/">
              <img
                src="./favicon.ico"
                alt="logo"
                style={{ height: 40, paddingLeft: 12, paddingRight: 12 }}
              />
            </Link>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
                justifyContent: "flex-end",
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <Link
                    to={
                      page == "Templates"
                        ? "/"
                        : page == "Components"
                        ? "/Components"
                        : "/AboutUs"
                    }
                    style={{ textDecoration: "none" }}
                  >
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  </Link>
                ))}
              </Menu>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "flex-end",
              }}
            >
              {pages.map((page) => (
                <Link
                  to={
                    page == "Templates"
                      ? "Templates"
                      : page == "Components"
                      ? "/Components"
                      : "/AboutUs"
                  }
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                    style={{ paddingRight: 12, paddingLeft: 12 }}
                  >
                    {page}
                  </Button>
                </Link>
              ))}
            </Box>
            {account === "admin" && (
              <Button
                onClick={handleAdminButtonClick}
                sx={{ my: 2, color: "white", display: "block" }}
                style={{ paddingRight: 12, paddingLeft: 12 }}
              >
                Admin
              </Button>
            )}
            {account ? (
              <Profile account={account} setAccount={setAccount} />
            ) : (
              <Button
                onClick={() => openDialog()}
                sx={{ my: 2, color: "white", display: "block" }}
                style={{ paddingRight: 12, paddingLeft: 12 }}
              >
                Login
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Login open={open} setOpen={setOpen} />
    </>
  );
}
