// import React from "react";
// import { formatDateTime } from "./util";
// import { showDialog } from "../utility";
// import WarningIcon from "@material-ui/icons/Warning";
// import ImageIcon from "@material-ui/icons/Image";
// import { env } from "../../env";

export const numFormatter = (data) => {
  return parseFloat(data).toLocaleString(data, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const formatCurrency = (cellContent) => {
  return new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: 2,
  }).format(cellContent);
};

export const formatQuantity = (cellContent) => {
  return new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: 0, // Ubah ini menjadi 0
  }).format(cellContent);
};

export const formatUsd = (cellContent) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(cellContent);
};
