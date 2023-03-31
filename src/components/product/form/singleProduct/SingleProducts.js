import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom'
import { fetchSingleProduct, useSingleProducts, useProductLoading, addToCart } from '../../../../redux';
import { LoadingWrapper } from '../../../shared';
import { Box, styled } from '@mui/material';

export const SingleProducts = () => {

    const {state} = useLocation();
    const dispach = useDispatch();
    const {categoryName} = useParams();
    const singleProduct = useSingleProducts();
    const isLoading = useProductLoading();

    useEffect(() => {
        dispach(fetchSingleProduct({id:state.id, category: categoryName}));
    }, [state.id])

    const StyledSingleProduct = styled(Box)(({ theme }) => ({
        [theme.breakpoints.up("sm")]: {
          display: "grid",
          gridTemplateColumns: "1fr 1fr ",
          gridTemplateRows: "1fr ",
          marginBottom: 250,
        },
    }));

    const StyledInfoProduct = styled(Box)(() => ({
        marginLeft: "20px",
    }));

    // const onAddToCart = () => {
    //     dispach(addToCart());
    // };
    // cartaze damatebis xilakis gaketeba mindoda da ver avamushave
    // mititeba damitovet aq

  return ( 
  <>
   <LoadingWrapper isLoading={isLoading}>
        <StyledSingleProduct >
          <img
            src={singleProduct?.image}
            alt={`${categoryName}`}
            style={{ objectFit: "cover", width: "100%", height: "500px"}}
          />
          <StyledInfoProduct>
            <h1 style={{fontSize:"70px"}}>{singleProduct?.name}</h1>
            <h2> price : {singleProduct?.price}$</h2>
            <h2> category : {singleProduct?.category}</h2>
            <h2> brand : {singleProduct?.brand}</h2>
          </StyledInfoProduct>
        </StyledSingleProduct>
      </LoadingWrapper>
  </>
  );
};
