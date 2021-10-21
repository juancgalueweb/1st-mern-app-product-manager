import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import axios from "axios";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Formik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

export const ProductEdit = () => {
  const [product, setProduct] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  const { id } = useParams();

  const getProductById = async () => {
    try {
      const product = await axios.get(
        `http://localhost:8080/api/products/${id}`
      );
      console.log("getProductById", product.data);
      setProduct(product.data);
      setIsLoaded(true);
    } catch (err) {
      console.log(err);
    }
  };

  const history = useHistory();

  // Update a product by ID
  const updateProduct = async (values) => {
    // console.log("Values", values);
    try {
      const response = await axios.put(
        `http://localhost:8080/api/product/edit/${id}`,
        values
      );
      Swal.fire({
        icon: "success",
        title: "The product was modified",
        showConfirmButton: false,
        timer: 2000,
      });
      setTimeout(() => {
        history.push("/products");
      }, 2100);

      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProductById();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const ProductSchema = Yup.object().shape({
    title: Yup.string()
      .min(10, "10 characters min")
      .max(40, "40 characters max")
      .required("Required"),
    price: Yup.number().min(10, "2 digits min").required("Required"),
    description: Yup.string()
      .min(10, "10 characters min")
      .max(80, "80 characters max")
      .required("Required"),
  });

  return (
    <Container className="shadow bg-light rounded py-4 my-2">
      <Row className="mx-auto my-2 d-flex justify-content-center">
        {isLoaded ? (
          <Col className="col-5">
            <h2 className="text-center">Edit a product</h2>
            <Formik
              initialValues={{
                title: product.title,
                price: product.price,
                description: product.description,
              }}
              validationSchema={ProductSchema}
              onSubmit={updateProduct}
            >
              {({
                errors,
                touched,
                values,
                handleChange,
                handleSubmit,
                isValid,
              }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="productTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      value={values.title}
                      onChange={handleChange}
                      isValid={touched.title && !errors.title}
                      isInvalid={!!errors.title}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.title}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="productPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="number"
                      name="price"
                      value={values.price}
                      onChange={handleChange}
                      isValid={touched.price && !errors.price}
                      isInvalid={!!errors.price}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.price}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="productDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type="text"
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      isValid={touched.description && !errors.description}
                      isInvalid={!!errors.description}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.description}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Button variant="primary" type="submit" disabled={!isValid}>
                    Edit
                  </Button>
                  <Button variant="dark" type="button" className="ms-4">
                    <Link
                      to={"/products"}
                      className="text-decoration-none text-light"
                    >
                      Back to products
                    </Link>
                  </Button>
                </Form>
              )}
            </Formik>
          </Col>
        ) : null}
      </Row>
    </Container>
  );
};
