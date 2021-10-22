import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { ProductDetails } from "./components/ProductDetails";
import { ProductContainer } from "./components/ProductContainer";
import { ProductEdit } from "./components/ProductEdit";

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
        <Route exact path="/product/edit/:id">
          <ProductEdit />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
