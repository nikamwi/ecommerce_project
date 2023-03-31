import React from 'react';
import { useHomPageProducts, useProductLoading } from '../../redux';
import { GridComponent, LoadingWrapper } from '../shared';
import { ProductCart } from './ProductCart';

export const HomePageProducts = () => {

    const homePageProducts = useHomPageProducts();
    const isLoading = useProductLoading();
    
  return (
    <LoadingWrapper isLoading={isLoading}>
      <GridComponent>
          {homePageProducts.map((product) => (
            <ProductCart key={product._id} product={product} />
          ))}
      </GridComponent>
    </LoadingWrapper>
  );
};
