import React from "react";
import { ProductsNew } from "./components/ProductsNew";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { ProductsTable } from "./components/ProductsTable";
import { ProductDetails } from "./components/ProductDetails";

function App() {
  return (
    <Router>
      <Switch>
        <Redirect exact from="/" to="/products" />
        <Route exact path="/products">
          <ProductsNew />
          <ProductsTable />
        </Route>
        <Route path="/products/:id">
          <ProductDetails />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
