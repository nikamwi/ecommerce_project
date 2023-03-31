import { Box, Button, Drawer, styled, Typography } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux';
import { clearCart, saveCart, useUserInfo } from '../../redux';

const StyledBox = styled(Box)(() => ({
  width: 400,
  display: "flex",
  alignItems: "center",
  padding: "5px 10px",
  marginBottom: 20,
}));

export const CartDrower = ({isCartOpen, setIsCartOpen, cartItem}) => {

  const userInfo = useUserInfo();
  const dispatch = useDispatch();

  const onSaveCart = (isClear) => {
    dispatch(saveCart({userId: userInfo?._id, cartItems: isClear ? [] : cartItem}));
  }

  return (
    <Drawer
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        anchor="right" 
    >
        {cartItem.map((item) => {
          const {product, quantity} = item;
          const {price, name, _id, image} = product;
          return(
            <StyledBox key={_id}>
              <img
                src={image}
                alt={`${name}-img`}
                width="70px"
                height="70px"
                style={{objectFit: "cover", borderRadius: 5}}
              />
              <Box sx={{paddingLeft: 2}}>
                <Typography>{name}</Typography>
                <Typography>{quantity}</Typography>
                <Typography>total: ${price * quantity}</Typography>
              </Box>
            </StyledBox>
          )
        })}
        <Box sx={{display: "flax", justifyContent: "center"}}>
          <Button 
            onClick={() => {
              dispatch(clearCart);
              onSaveCart(true);
            }}>clear cart</Button>
          {!!userInfo && <Button onClick={() => onSaveCart(false)}>save cart</Button>}
        </Box>
    </Drawer>
  )
}
