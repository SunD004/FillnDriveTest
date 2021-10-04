import { useState, useEffect, useReducer } from "react";

import { IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

import axios from "axios";

import IbanDialog from "../component/IbanDialog";

import "../App.css";

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 15,
  },
}));

const columns = [
  { field: "id", headerName: "ID", width: 100, headerAlign: "center" },
  { field: "iban", headerName: "IBAN", width: 300 },
];

export default function Home() {
  const forceUpdate = useReducer(() => ({}), {})[1];
  const [ibanDialog, setIbanDialog] = useState(false);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/ibans", {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then(({ data }) => {
        setRows(data?.data);
        setTimeout(() => {
          forceUpdate();
        }, 500);
      });
  }, [setRows]);

  const handleIbanDialog = () => {
    setIbanDialog(!ibanDialog);
  };

  const refresh = async () => {
    setRows([]);
    await axios
      .get("http://localhost:3001/ibans", {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then(({ data }) => {
        setRows(data?.data);
      });
  };

  return (
    <>
      <div className="buttonDiv">
        <LightTooltip title="Add IBAN" placement="top">
          <IconButton
            size="small"
            style={{ marginRight: 30 }}
            onClick={handleIbanDialog}
          >
            <AddToPhotosIcon htmlColor="#fff" />
          </IconButton>
        </LightTooltip>
        <LightTooltip title="Refresh IBAN list" placement="top">
          <IconButton onClick={refresh}>
            <RefreshIcon htmlColor="#fff" />
          </IconButton>
        </LightTooltip>
      </div>
      <IbanDialog
        open={ibanDialog}
        handle={handleIbanDialog}
        refresh={refresh}
      />
      <DataGrid
        loading={rows.length === 0}
        className="datagrid"
        rows={rows}
        columns={columns}
      />
    </>
  );
}
