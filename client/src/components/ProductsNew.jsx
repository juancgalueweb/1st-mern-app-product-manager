import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";

export const ProductsNew = ({ products, setProducts }) => {
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

  const createProduct = async (values, { resetForm }) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/product/new",
        values
      );
      console.log(response);
      setProducts({
        ...products,
        productData: [...products.productData, response.data],
      });
      Swal.fire({
        icon: "success",
        title: `"${values.title}" successfully created`,
        showConfirmButton: true,
      });
      return resetForm({});
    } catch (err) {
      console.log(err.response);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        html: `<ul class="swal-list">${err.response.data.map(
          (error) => `<li>${error}</li>`
        )}</ul>`,
        confirmButtonText: "I'll fix it",
      });
    }
  };

  return (
    <Container className="shadow bg-light rounded py-4 my-2">
      <Row className="mx-auto my-2 d-flex justify-content-center">
        <Col>
          <h2 className="text-center">Product Manager</h2>
          <Formik
            initialValues={{
              title: "",
              price: "",
              description: "",
            }}
            validationSchema={ProductSchema}
            onSubmit={createProduct}
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
                    placeholder="Product title..."
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
                    placeholder="9990"
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
                    placeholder="Product description..."
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
                  Create
                </Button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};
