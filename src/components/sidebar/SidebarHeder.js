import { Box, styled } from '@mui/material'
import React from 'react'

const StyledSidebarHeder = styled(Box)(() => ({
    padding: "0 15px",
    height: "64px",
    display: "flex",
    alignItems: "center",
}));

export const SidebarHeder = () => {
  return <StyledSidebarHeder>logo</StyledSidebarHeder>
}
