import React from 'react';
import { useHomPageProducts } from '../../redux';
import { GridComponent } from '../shared';
import { ProductCart } from './ProductCart';

export const HomePageProducts = () => {

    const homePageProducts = useHomPageProducts();
    
  return (
    <GridComponent>
        {homePageProducts.map((product) => (
            <ProductCart key={product._id} product={product} />
        ))}
    </GridComponent>
  );
};
