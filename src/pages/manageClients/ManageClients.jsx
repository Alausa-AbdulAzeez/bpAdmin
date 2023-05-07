import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { BsTrashFill } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import { RiAddLine } from "react-icons/ri";
import Sidebar from "../../components/sidebar/Sidebar";
import Topber from "../../components/topbar/Topber";
import "./manageClients.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { publicRequest } from "../../functions/requestMethods";
import Loading from "../../components/loading/Loading";

const ManageClients = () => {
  const [pageSize, setPageSize] = useState(5);
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);

  // CLIENTS DATA FUNCTIONALITIES
  const getAllClients = async () => {
    try {
      setLoading(true);
      const res = await publicRequest.get("Client/Client-list");

      if (res.data) {
        console.log(res.data);
        setTableData(res.data.data);
        setLoading(false);
      } else {
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // use effect to call the getAllClients function as the page loads
  useEffect(() => {
    getAllClients();
  }, []);
  // end of use effect to call the getAllClients function as the page loads
  // END OF TEST DATA FUNCTIONALITIES

  const columns = [
    // { field: 'id', headerName: 'Client ID', width: 190 },
    {
      field: "clientName",
      headerName: "Client name",
      width: 200,
      editable: true,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      width: 200,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email ",
      width: 200,
      editable: true,
    },
    {
      field: "fullName",
      headerName: "Action",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 260,
      renderCell: () => {
        return (
          <div className="buttons">
            <div className="editWrapper">
              <div className="edit">Edit</div>
              <MdEdit className="editIcon" />
            </div>
            <div className="deleteWrapper">
              <div className="delete">Delete</div>
              <BsTrashFill className="deleteIcon" />
            </div>
          </div>
        );
      },
    },
  ];

  const rows = tableData;

  // useEffect(() => {
  //   const clients = axios
  //     .get('http://15.237.160.238:60/api/Client/Client-list')
  //     .then((response) => console.log(response))
  //   console.log(clients)
  // }, [])
  return (
    <div className="manageClientsWrapper">
      <Sidebar />
      <div className="manageClientsRight">
        <Topber />

        {loading ? (
          <Loading />
        ) : (
          <div className="manageClientsMainWrapper">
            <div className="manageClientsMainTop">
              <h3>All Clients</h3>
              <Link to="/manageClients/addClient">
                <button className="addClientBtn">
                  Add Client
                  <span>
                    <RiAddLine className="addIcon" />
                  </span>
                </button>
              </Link>
            </div>
            <div className="partnerLabsMainBottom">
              <Box sx={{ height: 400, width: "100%" }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={pageSize}
                  checkboxSelection
                  disableSelectionOnClick
                  experimentalFeatures={{ newEditingApi: true }}
                  onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                  rowsPerPageOptions={[5, 10, 20]}
                  pagination
                  getRowId={(row) => row.clientName}
                />
              </Box>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageClients;
