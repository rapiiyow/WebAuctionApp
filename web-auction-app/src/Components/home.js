import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import axios from "axios";
import { setSelectedItemSession } from "../Utils/common";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

function Home(props) {
  const { SearchBar } = Search;

  const [items, setItems] = useState([]);
  const getItems = async () => {
    try {
      const data = await axios.get(process.env.REACT_APP_API + "item");
      setItems(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  const logOut = (e) => {
    props.history.push("/login");
  };

  useEffect(() => {
    getItems();
  }, []);

  const imageFormatter = (cell, row) => {
    return (
      <span>
        <img src={cell} className="photo" rounded="true" alt="" />
      </span>
    );
  };

  const actionButtons = (cell, row) => {
    return (
      <div>
        <button
          type="button"
          className="btn btn-outline-primary btn-lg ts-buttom"
          size="sm"
          value={cell}
          onClick={(e) => bidNow(e, "value")}
        >
          Bid Now
        </button>
      </div>
    );
  };

  const bidNow = (e) => {
    setSelectedItemSession(e.target.value);
    props.history.push("/itemdetails");
  };

  const columns = [
    { dataField: "Base64String", formatter: imageFormatter, text: "Image" },
    { dataField: "ItemName", text: "Name" },
    { dataField: "ItemDescription", text: "Description" },
    { dataField: "ItemPrice", text: "Price", sort: true },
    { dataField: "ItemId", formatter: actionButtons, text: "Action" },
  ];

  const options = {
    sizePerPage: 10,
    hideSizePerPage: true,
    hidePageListOnlyOnePage: true,
  };

  return (
    <div className="container">
      <ToolkitProvider keyField="ItemId" data={items} columns={columns} search>
        {(props) => (
          <div>
            <SearchBar
              {...props.searchProps}
              style={{ width: "400px", height: "40px" }}
            />
            <BootstrapTable
              {...props.baseProps}
              pagination={paginationFactory(options)}
            />
          </div>
        )}
      </ToolkitProvider>
      <button type="submit" className="mt-3 btn btn-secondary" onClick={logOut}>
        Logout
      </button>
    </div>
  );
}

export default Home;
