import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


import "./_index.scss"

import Navbar from "./components/navbar/Navbar"

import Homepage from "./pages/homepage/Homepage"
import CompetitionsPage from "./pages/competitions-page/competitions-page"
import CompetitionPage from "./pages/competition-page/competition-page"
import NotFound from "./pages/notfound/NotFound"
import Footer from './components/footer/footer';

function App() {
  return (
    <Router>
      <Footer>
        <Navbar></Navbar>
        <Switch>
          <Route exact path="/" component={Homepage}></Route>
          <Route exact path="/competitions" component={CompetitionsPage}></Route>
          <Route exact path="/competition" component={CompetitionPage}></Route>
          <Route component={NotFound}></Route>
        </Switch>
      </Footer>
    </Router>
  );
}

export default App;
