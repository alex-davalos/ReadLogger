import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import ReadingList from "./components/reading-list.component";
import EditReading from "./components/edit-reading.component";
import CreateReading from "./components/create-reading.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={ReadingList} />
        <Route path="/edit/:id" component={EditReading} />
        <Route path="/create" component={CreateReading} />
        <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
