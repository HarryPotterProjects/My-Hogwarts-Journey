import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login'
import Signup from './components/Signup'
function App() {
  return (
   <Router>
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/signup" element={<Signup />}/>
      <Route path="/login" element={<Login/>}/>
    </Routes>
   </Router>
  );
}

export default App;
