import React, { useEffect } from "react";
import axios from "axios";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

export const ProductsTable = ({ products, setProducts }) => {
  const { productData, loaded } = products;

  //Get all products
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

  // Delete a product by ID
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
    <Container className="shadow bg-light rounded py-4 my-2">
      <Row className="mx-auto my-2 d-flex justify-content-center">
        <Col>
          <h2 className="text-center">All products</h2>
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
                      <Link to={`/product/edit/${product._id}`}>
                        <FontAwesomeIcon
                          icon={faEdit}
                          size="lg"
                          className="me-4 font-awesome"
                        />
                      </Link>
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
