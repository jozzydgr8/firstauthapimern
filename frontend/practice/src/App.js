import './index.css';
import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements, Navigate} from 'react-router-dom'
import { UseAuthContext } from './Context/UseAuthContext';

//layouts
import Root from './RootLayout/Root';
//pages
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';

//hooks




function App() {
  const {user} = UseAuthContext();
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Root/> } >
        <Route index element={user ? <Home/> : <Navigate to ='/login'/>}  />
  
        <Route path='login' element={!user ? <Login/>: <Navigate to ='/'/>} />
        <Route path='signup' element={!user ? <SignUp/>: <Navigate to ='/'/>} />
      </Route>
    )
  )
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
