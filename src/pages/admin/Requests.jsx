import { useContext, useEffect, useState } from "react";
import { authContext } from "../../context/AuthProvider";
import { DataGrid, renderActionsCell } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Chip } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Requests = () => {
  const { baseUrl, getTokenHeader } = useContext(authContext);
  const [requests, setRequests] = useState([]);
  const navigate=useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const headers = await getTokenHeader();
      const res = await fetch(`${baseUrl}/admin/requests`, { headers });
      const data = await res.json();
      setRequests(data);
    };
    fetchData();
  }, [baseUrl, getTokenHeader]);

  const columns = [
    
    { field: "course_name", headerName: "Course Name", width: 200,
         renderCell: (params) => (
        <Link
          component="button"
          variant="body2"
          onClick={() => navigate(`/admin/${params.row.request_id}`)}
          sx={{ cursor: "pointer" }}
        >
          {params.value}
        </Link>
      ),
    },
    { field: "user_name", headerName: "Instructor", width: 200 },
    {
      field: "req_price",
      headerName: "Requested Price ($)",
      type: "number",
      width: 150,
    },
    {
      field: "admin_name",
      headerName: "Approved by",
      width: 150,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => {
        const status = params.value || "pending";
        let color = "warning";
        if (status === "accepted") color = "success";
        else if (status === "cancelled" || status === "rejected") color = "error";

        return (
          <Chip
            label={status.toUpperCase()}
            color={color}
            variant="filled"
            sx={{ fontWeight: "bold" }}
          />
        );
      },
    },
    {
      field: "requested_at",
      headerName: "Requested At",
      width: 180,
      valueGetter: (value) =>
        value ? new Date(value).toLocaleDateString() : "N/A",
    },
    {
      field: "approved_at",
      headerName: "Approved At",
      width: 180,
      valueGetter: (value) =>
        value ? new Date(value).toLocaleDateString() : "N/A",
    },

  ];
  const paginationModel = { page: 0, pageSize: 7 };

  return (
    <Paper sx={{ width: "100%", padding: 2 }}>
      <DataGrid
        rows={requests}
        getRowId={(row) => row.request_id}
        columns={columns}
        pageSize={5}
        initialState={{ pagination: { paginationModel } }}
        rowsPerPageOptions={[7, 10]}
        rowHeight={60}
        sx={{
          border: "none",
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#f3e1d5",
            fontWeight: "bold",
            color: "#5a3e2b",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid #f0e6df",
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "#fef5f1",
          },
        }}
      />
    </Paper>
  );
};

export default Requests;
