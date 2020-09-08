export const getConcatAndGetRevenue = (data1, data2, data3) => {
  let concatenatedProducts = data1.products
    .concat(data2.products)
    .concat(data3.products);
  concatenatedProducts.forEach(
    (product) => (product.revenue = product.sold * product.unitPrice)
  );
  return concatenatedProducts;
};

export const getMerged = (arr) => {
  let mergedAndSummed = [];
  arr.forEach((product) => {
    const mergedAndSummedItem = mergedAndSummed.filter(
      (mergedProduct) => mergedProduct.name === product.name
    );

    if (mergedAndSummedItem.length > 0) {
      mergedAndSummedItem[0].revenue += product.revenue;
    } else {
      mergedAndSummed.push(product);
    }
  });

  return mergedAndSummed;
};

export const getSortedList = (arr) => {
  return arr.sort((a, b) => (a.name > b.name ? 1 : -1));
};

export const getGrandTotal = (arr) => {
  const total = arr.reduce((acc, product) => {
    return acc + parseFloat(product.revenue);
  }, 0);
  return total;
};

export const getFilteredProductList = (arr, searchFilter) => {
  const filteredItems = arr.filter((product) =>
    product.name.toLowerCase().includes(searchFilter.toLowerCase())
  );
  return filteredItems;
};
