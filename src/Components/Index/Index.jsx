import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ApplyPage from "../Apply/ApplyPage.jsx";
import LoginForm from "../Login/LoginForm.jsx";
import MyNavbar from "../Navbar/MyNavbar.jsx";
import Info from "../Personal_info/Info.jsx";
import SubjectChoice from "../Subject_Choice/SubjectChoice.jsx";
import { domain } from "../env";
import Summary from "../Summary/Summary.jsx";

const Index = () => {
    localStorage.setItem('gst_roll', '');

    return (
        <div>
            <h1>Pranta</h1>
            <Router>
                <MyNavbar />
                <Switch>
                    <Route exact path="/">
                    <ApplyPage />
                    </Route>
                    <Route exact path="/login">
                        <LoginForm />
                    </Route>
                    <Route exact path="/apply">
                        <ApplyPage />
                    </Route>
                    <Route exact path="/info">
                        <Info />
                    </Route>
                    <Route exact path="/subjectchoice">
                        <SubjectChoice />
                    </Route>
                    <Route exact path="/summary">
                        <Summary />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
};

export default Index;
