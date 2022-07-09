import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login />}></Route>
      </Routes>
      <Toaster></Toaster>
    </div>
  );
}

export default App;
