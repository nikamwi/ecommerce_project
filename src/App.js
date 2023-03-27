import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import './App.css';
import { fetchHomePageProducts } from './redux';
import { RoutesComponent } from './Routes';

function App() {
  const dispach = useDispatch();

  useEffect(() => {
    dispach(fetchHomePageProducts())
  }, []);

  return (
    <div className="App">
      <Link to="/">home</Link><br/>
      <Link to="/register">register</Link><br/>
      <Link to="/login">login</Link><br/>
      <Link to="/products/new">add product</Link><br/>
      <RoutesComponent/>
    </div>
  );
}

export default App;
