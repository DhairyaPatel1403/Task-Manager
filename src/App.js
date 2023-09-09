import logo from './logo.svg';
import './App.css';
import { Login } from './components/Login';
import { Home } from './components/Home';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}></Route>
          <Route path="/home" element={<Home/>}></Route>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
