import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Profile from "./pages/profile/profile";
import Register from "./pages/register/register";
import Friend from "./pages/friend/Friend";
import Detail from "./pages/detail/Detail";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { Mycontext } from "./state/AuthContext";

function App() {
  const user = useContext(Mycontext);

  return (
      <Router>
        <Routes>
          <Route path="/" element={user ? <Home/> : <Login/> } />
          <Route path="/login" element={ <Login/> } />
          <Route path="/profile/:username" element={ <Profile/> } />
          <Route path="/friend" element={ <Friend/> } />
          <Route path="/register" element={ <Register/> } />
          <Route path="/detail"  element={ <Detail/> } />
        </Routes>
      </Router>
  );
}

export default App;
