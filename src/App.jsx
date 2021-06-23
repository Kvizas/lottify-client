import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


import "./_index.scss"

import Navbar from "./components/navbar/Navbar"

import Homepage from "./pages/homepage/Homepage"
import CompetitionsPage from "./pages/competitions-page/competitions-page"
import CompetitionPage from "./pages/competition-page/competition-page"
import NotFound from "./pages/notfound/NotFound"
import Footer from './components/footer/footer';
import FAQ from './pages/faq/faq';
import TermsPage from './pages/terms-page/terms-page';
import PrivacyPage from './pages/privacy-page/privacy-page';
import CookiesPage from './pages/cookies-page/cookies-page';
import UserContextProvider from "./contexts/user-context-provider";
import CartContextProvider from "./contexts/cart-context-provider";
import PasswordResetPage from './pages/password-reset-page/password-reset-page';
import RegistrationSuccess from './pages/registration-success/registration-success';
import CartPage from './pages/cart-page/cart-page';
import CheckoutPage from './pages/checkout-page/checkout-page';
import ProfilePage from './pages/profile-page/profile-page';

function App() {
  return (
    <div id="root">
      <CartContextProvider>
        <UserContextProvider>
          <Router>
            <Footer>
              <Navbar></Navbar>
              <Switch>
                <Route exact path="/" component={Homepage}></Route>
                <Route exact path="/competitions" component={CompetitionsPage}></Route>
                <Route
                  exact
                  path='/competition/:id'
                  component={CompetitionPage}
                />
                <Route exact path="/faq" component={FAQ}></Route>
                <Route exact path="/terms" component={TermsPage}></Route>
                <Route exact path="/privacy" component={PrivacyPage}></Route>
                <Route exact path="/cookies" component={CookiesPage}></Route>
                <Route exact path="/password-reset/:code" component={PasswordResetPage}></Route>
                <Route exact path="/registration-success" component={RegistrationSuccess}></Route>
                <Route exact path="/cart" component={CartPage}></Route>
                <Route exact path="/checkout" component={CheckoutPage}></Route>
                <Route exact path="/profile" component={ProfilePage}></Route>
                <Route component={NotFound}></Route>
              </Switch>
            </Footer>
          </Router>
        </UserContextProvider>
      </CartContextProvider>
    </div>
  );
}

export default App;
