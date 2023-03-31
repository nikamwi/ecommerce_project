import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom'
import { fetchSingleProduct, useSingleProducts } from '../../../../redux';

export const SingleProducts = () => {

    // const {state} = useLocation();
    const x = useLocation();
    console.log("x", x );
    const dispach = useDispatch();
    const {categoryName} = useParams();
    const singleProduct = useSingleProducts();

    useEffect(() => {
        dispach(fetchSingleProduct({id:state.id, category: categoryName}));
    }, [state.id])
  return  <div>{singleProduct?.name}</div>
};
