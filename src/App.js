import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify';
import Profile from './pages/Profile';
import Adminlogin from './pages/Adminlogin';
import Admindahboard from './pages/Admindahboard';




function App() {
  return (
    <>
    <Router>
    <div className="container">
      <Header/>
     <Routes>
      <Route path='/' element={<Dashboard/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/admin/adminlogin' element={<Adminlogin/>}/>
      <Route path='/admin/admindashboard' element={<Admindahboard/>}/>
      



     </Routes>
    </div>
    </Router>
    <ToastContainer/>
    </>
  );
}

export default App;
