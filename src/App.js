import React from 'react';
import './App.css';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [
        { headerName: 'ID', field: '_id' },
        { headerName: 'First Name', field: 'firstName' },
        { headerName: 'Last Name', field: 'lastName' },
        { headerName: 'Email', field: 'email' },
        { headerName: 'Phone number', field: 'phoneNumber' },
      ],
      customerData: [],
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      rowSelection: 'single',
    };
    this.handleAdd = this.handleAdd.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSelectionChanged = this.onSelectionChanged.bind(this);
    this.updateTable = this.updateTable.bind(this);
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  onSelectionChanged = () => {
    let selectedRows = this.gridApi.getSelectedRows();
    this.setState({
      id: selectedRows[0]._id,
      firstName: selectedRows[0].firstName,
      lastName: selectedRows[0].lastName,
      email: selectedRows[0].email,
      phoneNumber: selectedRows[0].phoneNumber,
    });
  };

  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <div>
        <header className="header">Blaze Customer Data</header>
        <div className="table-container">
          <div className="ag-theme-balham">
            <AgGridReact
              enableSorting={true}
              pagination={true}
              paginationAutoPageSize={true}
              columnDefs={this.state.columnDefs}
              rowData={this.state.customerData}
              onGridReady={this.onGridReady}
              rowSelection={this.state.rowSelection}
              onSelectionChanged={this.onSelectionChanged.bind(this)}
            ></AgGridReact>
          </div>
        </div>
        <section className="option-section">
          <form className="customer-form" onSubmit={this.handleSubmit}>
            <label>First name:</label>
            <input
              type="text"
              name="firstName"
              onChange={this.handleChange}
              value={this.state.firstName}
            />
            <label>Last name:</label>
            <input
              type="text"
              name="lastName"
              onChange={this.handleChange}
              value={this.state.lastName}
            />
            <label>Email:</label>
            <input
              type="email"
              name="email"
              onChange={this.handleChange}
              value={this.state.email}
            />
            <label>Phone number:</label>
            <input
              type="number"
              name="phoneNumber"
              onChange={this.handleChange}
              value={this.state.phoneNumber}
            />
            <input
              type="hidden"
              name="id"
              onChange={this.handleChange}
              value={this.state.id}
            />
            <div className="buttons">
              <input
                type="button"
                onClick={this.handleAdd}
                value="Add new customers"
              />
              <input
                type="button"
                onClick={this.handleUpdate}
                value="Update new customer"
              />
            </div>
          </form>
        </section>
      </div>
    );
  }
  async componentDidMount() {
    this.updateTable();
  }
  async updateTable() {
    let response = await fetch('http://localhost:3000/api/customers');
    let data = await response.json();
    this.setState({
      customerData: data,
    });
  }
  async handleAdd(e) {
    e.preventDefault();
    const newCustomer = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      phoneNumber: this.state.phoneNumber,
    };

    await fetch(
      `http://localhost:3000/api/add/customer?${new URLSearchParams(
        newCustomer
      )}`
    );
    this.updateTable();
  }
  async handleUpdate(e) {
    e.preventDefault();
    const newCustomerData = {
      _id: this.state.id,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      phoneNumber: this.state.phoneNumber,
    };
    await fetch(
      `http://localhost:3000/api/update/customer?${new URLSearchParams(
        newCustomerData
      )}`
    );
    this.updateTable();
  }
}

export default App;
