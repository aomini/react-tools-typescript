import React from "react";
import {
  Route,
  Switch,
  Redirect,
  useLocation
} from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import LoginPage from "./LoginPage";
import ProductsPage from "./ProductPage";
import SingleProductPage from "./SingleProductPage";
import ContactPage from "./ContactPage"
import Header from "./Header";
import NotFoundPage from "./NotFound";

const AdminPage = React.lazy(() => import("./AdminPage"))

const Routes: React.FC = props => {
  const [loggedIn] = React.useState<boolean>(true);
  const location = useLocation();
  return (
      <div>
        <Header />
        <TransitionGroup>
          <CSSTransition timeout={500} classNames="animate" key={location.key}>
            <Switch>
              <Redirect exact from="/" to="/products" />
              <Route path="/login" component={LoginPage} />
              <Route path="/products" exact component={ProductsPage} />
              <Route path="/contactus" component={ContactPage} />
              <Route path="/products/:id" component={SingleProductPage} />
              <Route path="/admin">
                {loggedIn ? (
                    <React.Suspense fallback={<div className="page-container">Loading...</div>}>
                        <AdminPage /> 
                    </React.Suspense>
                ): <Redirect to="/login" />}
              </Route>
              <Route component={NotFoundPage} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </div>
  );
};

export default Routes;
