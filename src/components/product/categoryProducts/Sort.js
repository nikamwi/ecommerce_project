import { MenuItem, Select } from '@mui/material'
import React from 'react'

export const Sort = ({value, changeSort}) => {
  return (
    <Select 
        sx={{display: "flex",justifyContent: "flex-start", width: "50px" }}
        value={value ?? "price, desc"}
        onChange={(e) => {
            changeSort("sort", e.target.value)
        }}
    >
        <MenuItem value="price, desc" sx={{width: "225px"}}>ფასი კლებადობით</MenuItem>
        <MenuItem value="price, asc">ფასი ზრდადობით</MenuItem>
        <MenuItem value="name, desc">სახელი კლებადობით</MenuItem>
        <MenuItem value="name, asc">სახელი ზრდადობით</MenuItem>
    </Select>
  )
}
