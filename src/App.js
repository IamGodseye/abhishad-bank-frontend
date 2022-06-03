import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import { UserContext, } from "./UserContext";
import { useState, useMemo } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.min.js'

import Index from "./pages";
import Signup from "./pages/signup";
import Login from './pages/login';
import User from "./pages/user";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null)
  const providerUser = useMemo(() => ({ user, setUser }), [user, setUser])
  return (
    <BrowserRouter>
      <UserContext.Provider value={providerUser}>

        <Routes>
          <Route path="/" element={<Index />} />
          {/* <Route path="/home" element={<Home />} /> */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<User />} />


        </Routes>
      </UserContext.Provider>

    </BrowserRouter>
  );
}

export default App;