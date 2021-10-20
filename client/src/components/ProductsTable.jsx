import React, { useEffect } from "react";
import axios from "axios";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export const ProductsTable = ({ products, setProducts }) => {
  const { productData, loaded } = products;

  const getAllProducts = async () => {
    try {
      const allProducts = await axios.get(
        "http://localhost:8080/api/products/getAll"
      );
      setProducts({ productData: allProducts.data, loaded: true });
    } catch (err) {
      console.log(err);
    }
  };

  const deleteProduct = async (productId, productTitle) => {
    try {
      await Swal.fire({
        title: `Are you sure you want to delete <strong>${productTitle}</strong>?`,
        showCancelButton: true,
        confirmButtonText: "Delete",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Deleted!", "", "success");
          axios.delete(`http://localhost:8080/api/product/delete/${productId}`);
          setProducts({
            ...products,
            productData: productData.filter(
              (product) => product._id !== productId
            ),
          });
        } else if (result.isDenied) {
          Swal.fire("Product was not deleted", "", "info");
        }
      });
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
            <span className="fw-bold text-primary">
              {" "}
              please refresh the page
            </span>
          </p>
          <Table striped bordered hover>
            <thead>
              <tr className="text-center">
                <th>#</th>
                <th>Product title</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loaded &&
                productData?.map((product, index) => (
                  <tr key={index}>
                    <td className="text-center">{index + count}</td>
                    <td>{product.title}</td>
                    <td className="text-center">
                      <Button variant="secondary" className="me-2">
                        <Link
                          to={`/products/${product._id}`}
                          className="text-decoration-none text-light"
                        >
                          Details
                        </Link>
                      </Button>
                      <Button
                        variant="danger"
                        className="ms-2"
                        onClick={() => {
                          deleteProduct(product._id, product.title);
                        }}
                      >
                        Delete
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
