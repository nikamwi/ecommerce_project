import { Avatar, Box, Button, IconButton, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserInitials, isUserAdmin } from '../../applications';
import { logout, useUserInfo } from '../../redux';

export const UserIcon = () => {

    const [anchor, setAnchor] = useState(null);
    const userInfo = useUserInfo();
    const navigate = useNavigate();
    const dispach = useDispatch();

  return (
    <Box>
        <IconButton onClick={(e) => setAnchor(e.currentTarget)}> 
            <Avatar>
                {getUserInitials(userInfo?.firstName, userInfo?.lastName)}
            </Avatar>
        </IconButton>
        <Box>
            <Menu
                anchorEl={anchor}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
                keepMounted
                open={Boolean(anchor)}
                onClose={() => setAnchor(null)}
            >
                {!!userInfo ? (
                    <MenuItem>
                        <Button onClick={() => dispach(logout())}>logout</Button>
                    </MenuItem>
                ) : (
                    <Box>
                        <MenuItem>
                            <Button onClick={() => navigate("/login")}>login</Button>
                        </MenuItem>
                        <MenuItem>
                            <Button onClick={() => navigate("/register")}>register</Button>
                        </MenuItem>
                    </Box>
                )}
                {isUserAdmin(userInfo) && (
                    <MenuItem>
                        <Button onClick={() => navigate("/products/new")}>add product</Button>
                    </MenuItem>
                )}
            </Menu>
        </Box>
    </Box>
  ); 
};
