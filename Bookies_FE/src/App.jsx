import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Client from './layout/Client.jsx';
import Login from './layout/Login.jsx';
import Register from './layout/Register.jsx'
import { ProfileProvider } from './context/userContext.jsx';
import AdminIndex from './pages/Admin/AdminIndex.jsx';
const App = () => {
  return (
      <Router>
        <div className='h-screen'>
        <ProfileProvider>
            <Routes>
              <Route path='/*' element={<Client/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/register' element={<Register/>}/>
              <Route path='/admin/*' element={<AdminIndex/>}/>
            </Routes>
          </ProfileProvider>
        </div>
      </Router>
  );
}

export default App;