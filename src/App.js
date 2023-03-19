import { Link } from 'react-router-dom';
import './App.css';
import { RoutesComponent } from './Routes';

function App() {
  return (
    <div className="App">
      <Link to="/register">register</Link><br/>
      <Link to="/login">login</Link><br/>
      <Link to="/">home</Link><br/>
      <RoutesComponent/>
    </div>
  );
}

export default App;
