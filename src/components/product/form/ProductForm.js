import { FormControl, TextField } from '@mui/material';
import React, { useState } from 'react'
import { useForm } from '../../../applications'
import { generateProductFormValues } from './generateProductFormValues'
import FileBase from "react-file-base64";

export const ProductForm = () => {
    const {formValues: 
        productFormValues, 
        onInputChange, 
        setFormValues,
    } = useForm({ defaultFormValues: generateProductFormValues() });
    const [image, setImage] = useState();

  return (
    <FormControl fullWidth>
        <TextField 
            name="name"
            value={productFormValues.name.value}
            onChange={onInputChange}
            error={!!productFormValues.name.error}
            helperText={productFormValues.name.error}
            label="Name"
        />
        <TextField 
            name="description"
            value={productFormValues.description.value}
            onChange={onInputChange}
            error={!!productFormValues.description.error}
            helperText={productFormValues.description.error}
            label="Description"
        />
        <TextField 
            name="category"
            value={productFormValues.category.value}
            onChange={onInputChange}
            error={!!productFormValues.category.error}
            helperText={productFormValues.category.error}
            label="Category"
        />
        <TextField 
            name="brand"
            value={productFormValues.brand.value}
            onChange={onInputChange}
            error={!!productFormValues.brand.error}
            helperText={productFormValues.brand.error}
            label="Brand"
        />
        <TextField 
            name="price"
            type="number"
            value={productFormValues.price.value}
            onChange={onInputChange}
            error={!!productFormValues.price.error}
            helperText={productFormValues.price.error}
            label="Price"
        />
        <FileBase 
            type="file"
            multiple={false}
            onDone={({base64}) => {
                setImage(base64);
            }} 
        />
    </FormControl>
  )
}
