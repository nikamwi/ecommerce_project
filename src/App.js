import { Link } from 'react-router-dom';
import './App.css';
import { RoutesComponent } from './Routes';

function App() {
  return (
    <div className="App">
      <Link to="/">home</Link><br/>
      <Link to="/register">register</Link><br/>
      <Link to="/login">login</Link><br/>
      <RoutesComponent/>
    </div>
  );
}

export default App;
