import React, { useState, useEffect } from "react";
import axios from "axios";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export const ProductsTable = () => {
  const [products, setProducts] = useState({
    productData: [],
    loaded: false,
  });

  const { productData, loaded } = products;

  const getAllProducts = async () => {
    try {
      const allProducts = await axios.get(
        "http://localhost:8080/api/products/getAll"
      );
      console.log(allProducts);
      setProducts({ productData: allProducts.data, loaded: true });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  let count = 1;

  return (
    <Container>
      <Row className="my-2 d-flex justify-content-center">
        <hr className="my-2" />
        <Col className="col-6 my-2">
          <h3 className="text-center mb-3">All products</h3>
          <p className="lead">
            If you want to update the products' list after creating new ones,
            <span className="fw-bold text-danger">
              {" "}
              please refresh the page
            </span>
          </p>
          <Table striped bordered hover>
            <thead>
              <tr className="text-center">
                <th>#</th>
                <th>Product title</th>
              </tr>
            </thead>
            <tbody>
              {loaded &&
                productData.map((product, index) => (
                  <tr key={index}>
                    <td>{index + count}</td>
                    <td>{product.title}</td>
                    <td className="text-center">
                      <Button variant="secondary">
                        <Link
                          to={`/products/${product._id}`}
                          className="text-decoration-none text-light"
                        >
                          Details
                        </Link>
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};
