import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {UseRoutes} from "./routes";
import {AuthContext} from "./context/authContext"
import {useAuth} from "./hooks/auth.hook";
import {Navbar} from "./components/Navbar";
import {Loader} from "./components/Loader";
import 'materialize-css';

function App() {
    const {login, logout, userId, token,ready} = useAuth();
    const isAuth = !!token;
    const routes = UseRoutes(isAuth);

    if(!ready){
        return <Loader />
    }
    return (
        <AuthContext.Provider value={{token, userId, login, logout, isAuth}}>
            <Router>
                {isAuth && <Navbar/>}
                <div className={'container'}>
                    {routes}
                </div>
            </Router>
        </AuthContext.Provider>
    )
        ;
}

export default App;
