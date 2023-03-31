import { AppBar, Badge, Box ,Button,styled, Toolbar } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useCartItems } from '../../redux';
import { CartDrower } from './CartDrower';
import { SearchBar } from './SearchBar';
import { UserIcon } from './UserIcon';
import { BsCartCheck } from "react-icons/bs";
import {AiFillHome, AiOutlineMenu} from "react-icons/ai";
import { CategoryDrower } from '../sidebar';

const StyledAppBar = styled(AppBar)(() => ({
    background: "#fff",
    width: "100%",
    padding: "0 37px 0 30px",
}));

const StyledToolBar = styled(Toolbar)(() => ({
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
}));

const StyledBadge = styled(Badge)(() => ({
    "&.MuiBadge-badge": {
        width: "20px",
        height: "21px",
        color: "#fff",
        background: "#f33451",
        top: "2px",
        right: "-3px",
    },
})); 

export const Header = () => {
    
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false)
    const cartItems = useCartItems();

    const cartItemQuantity = cartItems?.reduce(
        (acc, curr) => acc + curr.quantity,
        0
        );
 
  return (
    <Box>
        <StyledAppBar>
            <StyledToolBar>
                <Link to="/">
                    <AiFillHome size={35}/>
                </Link>
                <SearchBar/>
                <UserIcon/>
                <Button onClick={() => setDrawerOpen(true)}>
                    <AiOutlineMenu size={25}/>
                </Button>
                <CategoryDrower
                    drawerOpen={drawerOpen}
                    setDrawerOpen={setDrawerOpen}
                />
                <Button onClick={() => setIsCartOpen(true)}>
                    <StyledBadge badgeContent={cartItemQuantity}>
                        <BsCartCheck size={25} />
                    </StyledBadge>
                </Button>
                <CartDrower
                    isCartOpen={isCartOpen}
                    setIsCartOpen={setIsCartOpen}
                    cartItem={cartItems}
                />
            </StyledToolBar>
        </StyledAppBar>
    </Box>
  )
}
