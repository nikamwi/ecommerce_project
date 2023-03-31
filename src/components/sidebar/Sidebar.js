import { Drawer } from '@mui/material';
import { useSidebarItems } from '../../redux';
import { SidebarContent } from './SidebarContent';

export const CategoryDrower = ({drawerOpen, setDrawerOpen}) => {

    const sidebarItems = useSidebarItems();

    return (
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        anchor="left" 
      >
        <SidebarContent sidebarItems={sidebarItems}/>    
      </Drawer>
    )
}