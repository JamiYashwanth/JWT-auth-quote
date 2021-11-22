import './App.css';
import { Route,Routes } from "react-router-dom"

import Register from './components/register'
import Login from './components/login'
import Dashboard from './components/dashboard';

function App() {

  return (
      <div className="App">
        <Routes>
          <Route path="/register"  element={<Register />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
  );
}

export default App;
