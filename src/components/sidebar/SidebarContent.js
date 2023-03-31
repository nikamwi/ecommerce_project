import { Box, List, ListItem, ListItemText, styled } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom';
import { SidebarHeder } from './SidebarHeder';

const StyledListItem = styled(ListItem)(() => ({
    padding: "5px 0 3px 15px",
    margin: "0",
}));

export const SidebarContent = ({sidebarItems}) => {
  return (
    < >
        <SidebarHeder/>
        <List sx={{width: "225px"}}>
            {sidebarItems.map((item) => {
                const {_id, name} = item;
                return (
                    <React.Fragment key={_id}>
                        <Link 
                            style={{textDecoration: "none"}}
                            to={`/products/categories/${name}?page=1&sort=price,desc`}
                        >
                            <Box sx={{display: "flex"}}>
                                <StyledListItem>
                                    <ListItemText secondary={name}/>
                                </StyledListItem>
                            </Box>
                        </Link>
                    </React.Fragment>
                )
            })}
        </List>
    </>
  );
};
