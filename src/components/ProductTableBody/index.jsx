import React from "react";

export const formatNumber = (number) =>
  new Intl.NumberFormat("en", { minimumFractionDigits: 2 }).format(number);

const RenderTableBody = ({ productList, fetched }) => {
  if (fetched && productList.length > 0) {
    return <ProductTable products={productList} />;
  }
  return <NoProductTable />;
};

const ProductTable = ({ products }) => {
  return (
    <tbody>
      {products.length > 0 &&
        products.map((product, i) => (
          <tr key={product.name}>
            <td>{product.name}</td>
            <td>{formatNumber(product.revenue)}</td>
          </tr>
        ))}
    </tbody>
  );
};

const NoProductTable = () => {
  return (
    <tbody>
      <tr>
        <td colSpan="2" className="noProductsFound">
          oops, no products found!
        </td>
      </tr>
    </tbody>
  );
};

export default RenderTableBody;
