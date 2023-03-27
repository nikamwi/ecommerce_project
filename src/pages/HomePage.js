import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSelectedProduct, useHomPageProducts } from '../redux'

export const HomePage = () => {
  const products = useHomPageProducts();
  const dispach = useDispatch();
  const navigate = useNavigate();

  const onEdit = (product) => {
    dispach(setSelectedProduct(product));
    navigate(`/products/edit/${product.name}`);
  };

  return (
    <div>
      {products.map((item) => (
        <div key={item._id}>
          <h1>{item.name}</h1>
          <button onClick={() => onEdit(item)}>edit</button>
        </div>
      ))}
    </div>
  )
}
