import { Box, styled } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import { Header } from './components/header';
import { fetchCart, fetchHomePageProducts, useUserInfo } from './redux';
import { RoutesComponent } from './Routes';

const StyleContetContainer = styled(Box)(() => ({
  // padding: "0 0 0 0",
  width: "100%",
  // marginLeft: "255px",
  marginTop: "100px",
  // minHeight: "100vh",
  textAlign: "center"
}))

function App() {
  const dispach = useDispatch();
  const userInfo = useUserInfo();

  useEffect(() => {
    dispach(fetchHomePageProducts())
  }, []);

  useEffect(() => {
    if (userInfo) {
      dispach(fetchCart(userInfo._id));
    }
  },[userInfo]);

  return (
    <Box>
      <Header/>
      <StyleContetContainer>
        <RoutesComponent/>
      </StyleContetContainer>
    </Box>
  );
}

export default App;
