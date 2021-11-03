import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ApplyPage from "../Apply/ApplyPage.jsx";
import LoginForm from "../Login/LoginForm.jsx";
import MyNavbar from "../Navbar/MyNavbar.jsx";

const Index = () => {
    return (
        <div>
            <h1>Pranta</h1>
            <Router>
                <MyNavbar />
                <Switch>
                    <Route exact path="/"></Route>
                    <Route exact path="/login">
                        <LoginForm />
                    </Route>
                    <Route exact path="/apply">
                        <ApplyPage />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
};

export default Index;
