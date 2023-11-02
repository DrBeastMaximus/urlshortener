import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './App.scss';
import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Home/Home";
import {AuthService} from "./services/AuthService";

const App: React.FC = () => {
    const history = useNavigate()
    const [authUser, setAuthUser] = useState<string| null>()

    useEffect(() => {
        setAuthUser(localStorage.getItem("user"));
        if(!authUser){
            history("/login")
        } else {
            history("/")
        }
    }, []);

    return !authUser? <Home /> : <Dashboard />
};

export default App;