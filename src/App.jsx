// import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Components/Navbar/MyNavbar.jsx";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path="/">
                        <Navbar />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
