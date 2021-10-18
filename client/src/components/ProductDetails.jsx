import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/Button";

export const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();

  const getProductById = async () => {
    try {
      const product = await axios.get(
        `http://localhost:8080/api/products/${id}`
      );
      console.log(product);
      setProduct(product.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProductById();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Container>
      <Row>
        <Col>
          <h2>Product details</h2>
          <p>
            <b>ID:</b> {product._id}
          </p>
          <p>
            <b>Title:</b> {product.title}
          </p>
          <p>
            <b>Price:</b> {product.price}
          </p>
          <p>
            <b>Description:</b> {product.description}
          </p>
          <p>
            <b>Created:</b> {product.createdAt}
          </p>
          <p>
            <b>Updated:</b> {product.updatedAt}
          </p>
          <Button variant="dark" type="button">
            <Link to={"/products"} className="text-decoration-none text-light">
              Back to products
            </Link>
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
