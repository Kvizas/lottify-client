import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import "./_index.scss"

import Navbar from "./components/navbar/Navbar"

import Homepage from "./pages/homepage/Homepage"
import NotFound from "./pages/notfound/NotFound"

function App() {
  return (
    <Router>
      <Navbar></Navbar>
      <Switch>
        <Route exact path="/" component={Homepage}></Route>
        <Route component={NotFound}></Route>
      </Switch>
    </Router>
  );
}

export default App;
