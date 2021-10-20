import React, { useState } from "react";
import { ProductsNew } from "./ProductsNew";
import { ProductsTable } from "./ProductsTable";

export const ProductContainer = () => {
  const [products, setProducts] = useState({
    productData: [],
    loaded: false,
  });

  return (
    <>
      <ProductsNew products={products} setProducts={setProducts} />
      <ProductsTable products={products} setProducts={setProducts} />
    </>
  );
};
