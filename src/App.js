import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from './Pages/Home'
import Reports from './Pages/Reports'
import Products from './Pages/Products'
import { Search } from "./components/Navbar/Search";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Search />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/reports" component={Reports} />
          <Route path="/products" component={Products} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
