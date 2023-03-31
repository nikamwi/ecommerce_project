import { Box, Button, Card, CardActions, Grid, Rating, styled, Typography} from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { isUserAdmin } from '../../applications';
import { addToCart, removeFormCart, setSelectedProduct, useCartItems, useUserInfo } from '../../redux';
import { rateProduct } from '../../redux/slices/productSlice';


const StyledCard = styled(Card)(() => ({
    width: 350,
    borderRadius: 3,
}));

const StyledCardInfoContainer = styled(Box)(() => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "0 10px",
}));

const StyledCardActionContainer = styled(Box)(() => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
}));

export const ProductCart = ({product}) => {

    const {
        name,
        _id,
        image,
        price,
        description,
        category,
        brand,
        averageRating,
    } = product;

    const cartItem = useCartItems();
    const isProductInCart = cartItem?.find((item) => item.product._id === _id);
    const dispach = useDispatch();
    const userInfo = useUserInfo();
    const navigate = useNavigate();
    const {pathname, search} = useLocation();

    const onAddToCart = () => {
        dispach(addToCart(product));
    };

    const onEdit = () => {
        navigate(`/products/edit/${name}`);
        dispach(setSelectedProduct(product));
    };

    const onRatingChange = (e) => {
        dispach(
            rateProduct({
                productId: _id,
                userId: userInfo?._id,
                rating: +e.target.value,
                isHome: pathname === "/",
                url: `${category}${search}&size=1`,
            })
        )
    };

  return (
    <Grid item>
        <StyledCard>
            <Link 
                style={{textDecoration: "none"}}
                to={`/products/categories/${category}/${name}`}
                state={{ x:4 }}
            >
                <img
                    src={image}
                    alt={`${category}-${name}`}
                    style={{objectFit: "cover", width: "100%", height: "200px"}}
                />
                <StyledCardInfoContainer>
                    <Typography>{name}</Typography>
                    <Typography>{price}$</Typography>
                </StyledCardInfoContainer>
            </Link>
            <CardActions>
                <Rating 
                    onChange={onRatingChange} 
                    disabled={!userInfo}
                    value={averageRating}
                />
                <StyledCardActionContainer>
                    {isProductInCart ? (
                        <>
                        <Button onClick={() => dispach(removeFormCart(_id))}>-</Button>
                        <Typography>{isProductInCart.quantity}</Typography>
                        <Button onClick={onAddToCart}>+</Button>
                        </>
                    ) : (
                        <Button onClick={() => onAddToCart()}>add to cart</Button>
                    )}
                    {isUserAdmin(userInfo) && <Button onClick={onEdit}>edit</Button>}
                </StyledCardActionContainer>
            </CardActions>
        </StyledCard>
    </Grid>
  )
}
