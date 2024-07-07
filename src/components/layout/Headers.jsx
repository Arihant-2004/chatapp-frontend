import {
    AppBar,
    Backdrop,
    Badge,
    Box,
    IconButton,
    Toolbar,
    Tooltip,
    Typography,
  } from "@mui/material";
  import React, { Suspense, lazy, useState } from "react";
import { orange } from "../../constants/color";
import { useDispatch, useSelector } from "react-redux";
import { userNotExists } from "../../redux/reducers/auth";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../../constants/config";
import { setIsMobile, setIsNewGroup } from "../../redux/reducers/misc";
import { setIsSearch } from "../../redux/reducers/misc";
import { setIsNotification } from "../../redux/reducers/misc";
  import {
    Add as AddIcon,
    Menu as MenuIcon,
    Search as SearchIcon,
    Group as GroupIcon,
    Logout as LogoutIcon,
    Notifications as NotificationsIcon,
  } from "@mui/icons-material";
  import { useNavigate } from "react-router-dom";
 
  import { resetNotificationCount } from "../../redux/reducers/chat";
  const SearchDialog = lazy(() => import("../specific/Search"));
  const NotifcationDialog = lazy(() => import("../specific/Notifications"));
  const NewGroupDialog = lazy(() => import("../specific/NewGroup"));
  const Header = () => {
    const navigate = useNavigate();
    const dispatch=useDispatch();
    const { notificationCount } = useSelector((state) => state.chat);
    const {isSearch,isNotification,isNewGroup}=useSelector((state)=>state.misc)
     console.log(isSearch);
    
    
  
    const openNewGroup = () => {
      dispatch(setIsNewGroup(true))
    };
   const handleMobile = () => dispatch(setIsMobile(true));
  const openSearch=()=>{
    dispatch(setIsSearch(true))
  }
  const openNotification = () => {
    dispatch(setIsNotification(true));
    dispatch(resetNotificationCount());
  };
    const navigateToGroup = () => navigate("/groups");
  
    const logoutHandler = async () => {
      try {
        const { data } = await axios.get(`${server}/user/logout`, {
          withCredentials: true,
        });
        dispatch(userNotExists());
        toast.success(data.message);
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong");
      }
    };
  
    return (
      <>
        <Box sx={{ flexGrow: 1 }} height={"4rem"}>
          <AppBar
            position="static"
            sx={{
              bgcolor: orange,
            }}
          >
            <Toolbar>
              <Typography
                variant="h6"
                sx={{
                  display: { xs: "none", sm: "block" }
                }}
              >
                Chattu
              </Typography>
  
              <Box
                sx={{
                  display: { xs: "block", sm: "none" },
                }}
              >
                <IconButton color="inherit" onClick={handleMobile}>
                  <MenuIcon />
                </IconButton>
              </Box>
              <Box
                sx={{
                  flexGrow: 1,
                }}
              />
              <Box>
                <IconBtn
                  title={"Search"}
                  icon={<SearchIcon />}
                  onClick={openSearch}
                />
  
                <IconBtn
                  title={"New Group"}
                  icon={<AddIcon />}
                  onClick={openNewGroup}
                />
  
                <IconBtn
                  title={"Manage Groups"}
                  icon={<GroupIcon />}
                  onClick={navigateToGroup}
                />
  
                <IconBtn
                  title={"Notifications"}
                  icon={<NotificationsIcon />}
                  onClick={openNotification}
                  value={notificationCount}
                />
  
                <IconBtn
                  title={"Logout"}
                  icon={<LogoutIcon />}
                  onClick={logoutHandler}
                />
              </Box>
            </Toolbar>
          </AppBar>
        </Box>
  
        {isSearch && (
          <Suspense fallback={<Backdrop open />}>
            <SearchDialog />
          </Suspense>
        )}
  
        {isNotification && (
          <Suspense fallback={<Backdrop open />}>
            <NotifcationDialog />
          </Suspense>
        )}
  
        {isNewGroup && (
          <Suspense fallback={<Backdrop open />}>
            <NewGroupDialog />
          </Suspense>
        )}
      </>
    );
  };
  
  const IconBtn = ({ title, icon, onClick, value }) => {
    return (
      <Tooltip title={title}>
        <IconButton color="inherit" size="large" onClick={onClick}>
          {value ? (
            <Badge badgeContent={value} color="error">
              {icon}
            </Badge>
          ) : (
            icon
          )}
        </IconButton>
      </Tooltip>
    );
  };
  
  export default Header;