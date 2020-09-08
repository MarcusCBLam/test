import React from "react";
import "./App.css";
import RenderTableBody, { formatNumber } from "./components/ProductTableBody";
import {
  getConcatAndGetRevenue,
  getMerged,
  getSortedList,
  getGrandTotal,
  getFilteredProductList,
} from "./components/Massager";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: [],
      searchFilter: "",
      grandTotal: 0,
      fetched: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ searchFilter: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  componentDidMount() {
    this.fetchAndFormatProducts();
  }

  fetchAndFormatProducts = async () => {
    const branch1 = await fetch("/api/branch1.json");
    const branch2 = await fetch("/api/branch2.json");
    const branch3 = await fetch("/api/branch3.json");
    const data1 = await branch1.json();
    const data2 = await branch2.json();
    const data3 = await branch3.json();

    const concatAndGetRevenue = getConcatAndGetRevenue(data1, data2, data3);
    const mergedAndSummed = getMerged(concatAndGetRevenue);
    const sortedList = getSortedList(mergedAndSummed);
    const grandTotal = getGrandTotal(sortedList);
    this.setState({
      productList: sortedList,
      grandTotal: grandTotal,
      fetched: true,
    });
  };

  render() {
    const { productList, fetched, searchFilter } = this.state;
    const renderProductList = fetched
      ? searchFilter.length > 0
        ? getFilteredProductList(productList, searchFilter)
        : this.state.productList
      : [];

    const grandTotal = fetched ? getGrandTotal(renderProductList) : 0;
    return (
      <div className="product-list">
        {!fetched && <div>Loading...</div>}
        {fetched && (
          <>
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="searchinput" id="searchlabel">
                <span>Search Products</span>
                <input
                  type="text"
                  id="searchinput"
                  name="searchinput"
                  onChange={this.handleChange}
                  placeholder="enter search here"
                />
              </label>
              <i className="fa fa-search"></i>
            </form>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Revenue</th>
                </tr>
              </thead>
              <RenderTableBody
                productList={renderProductList}
                fetched={fetched}
                searchFilter={searchFilter}
              />
              <tfoot>
                <tr>
                  <td>Total</td>
                  <td>{formatNumber(grandTotal)}</td>
                </tr>
              </tfoot>
            </table>
          </>
        )}
      </div>
    );
  }
}

export default App;
