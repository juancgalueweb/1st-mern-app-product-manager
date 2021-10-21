import React, { useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { ProductsNew } from "./ProductsNew";
import { ProductsTable } from "./ProductsTable";

export const ProductContainer = () => {
  const [products, setProducts] = useState({
    productData: [],
    loaded: false,
  });

  return (
    <Container>
      <Row>
        <Col className="col-5">
          <ProductsNew products={products} setProducts={setProducts} />
        </Col>
        <Col className="col-7">
          <ProductsTable products={products} setProducts={setProducts} />
        </Col>
      </Row>
    </Container>
  );
};
