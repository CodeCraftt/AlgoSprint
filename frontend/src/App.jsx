import React from "react";
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Problems from "./components/Problems.jsx";
import ProblemDetail from "./components/ProblemDetail.jsx";
import Submit from "./components/Submit.jsx";
import toast, { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Profile from './components/Profile.jsx';
import Chat from './components/Chat.jsx';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/problems" element={<Problems />} />
          <Route path="/problems/:id" element={<ProblemDetail />} />
          <Route path="/problems/:id/submit" element={<ProtectedRoute><Submit/></ProtectedRoute>}/>
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>}/>
          {/* <Route path="/profile" element={<Profile />}/> */}
          <Route path="/chat" element={<ProtectedRoute><Chat/></ProtectedRoute>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
