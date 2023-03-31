import { Box } from '@mui/material';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import { fetchProductsByCategory, useCategoryProducts} from '../../../redux';
import { GridComponent } from '../../shared';
import { ProductCart } from '../ProductCart';
import { Paginate } from './Paginate';
import { useQueryParams } from '../../../applications';
import { Sort } from './Sort';

export const CategoryProductList = () => {

    const {categoryName} = useParams();
    const dispatch = useDispatch();
    const {products, totalPages} = useCategoryProducts();

    const {value: page, changeQueryValue: changePage} = useQueryParams("page");
    const {value: sort, changeQueryValue: changeSort} = useQueryParams("sort");

    useEffect(() => {
      dispatch(
        fetchProductsByCategory(
          `${categoryName}?page=${page}&size=1&sort=${sort}}`
        )
      );
    }, [categoryName, page, sort]);

    useEffect(() => {
      changePage("page", 1);
    }, [sort]);

  return (
    <Box>
      <Sort value={sort} changeSort={changeSort}/>
      <GridComponent>
        {products?.map((product) => (
          <ProductCart key={product._id} product={product}/>
        ))}
      </GridComponent>
      <Paginate 
        totalPages={totalPages} 
        currentPage={page} 
        changePage={changePage}/>
    </Box>
  )
}
