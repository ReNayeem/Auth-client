import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { Toaster } from 'react-hot-toast';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path='/home/:username' element={<Home />}></Route>
      </Routes>
      <Toaster></Toaster>
    </div>
  );
}

export default App;
