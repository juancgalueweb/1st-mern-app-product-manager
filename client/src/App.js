import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { ProductDetails } from "./components/ProductDetails";
import { ProductContainer } from "./components/ProductContainer";

function App() {
  return (
    <Router>
      <Switch>
        <Redirect exact from="/" to="/products" />
        <Route exact path="/products">
          <ProductContainer />
        </Route>
        <Route path="/products/:id">
          <ProductDetails />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
