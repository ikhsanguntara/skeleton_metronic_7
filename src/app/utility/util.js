import moment from "moment";
import { useState } from "react";
// import { useDispatch } from "react-redux";
import { showErrorDialog } from "./dialog";

export const sizePerPageList = (totalSize) => [
  {
    text: "10",
    value: 10,
  },
  {
    text: "20",
    value: 20,
  },
  {
    text: "30",
    value: 30,
  },
  {
    text: "40",
    value: 40,
  },
  {
    text: "50",
    value: 50,
  },
  {
    text: "All",
    value: totalSize,
  },
];

export const sizePerPageList2 = (totalSize) => [
  {
    text: "10",
    value: 10,
  },
  {
    text: "20",
    value: 20,
  },
  {
    text: "30",
    value: 30,
  },
  {
    text: "40",
    value: 40,
  },
  {
    text: "50",
    value: 50,
  },
  {
    text: "All",
    value: -1,
  },
];

export const allMounth = [
  { label: "January", value: "01" },
  { label: "February", value: "02" },
  { label: "March", value: "03" },
  { label: "April", value: "04" },
  { label: "May", value: "05" },
  { label: "June", value: "06" },
  { label: "July", value: "07" },
  { label: "August", value: "08" },
  { label: "September", value: "09" },
  { label: "October", value: "10" },
  { label: "November", value: "11" },
  { label: "December", value: "12" },
];

export const useForceUpdate = () => {
  const [value, setValue] = useState(0);
  console.log(value, "value");
  return () => setValue((value) => value + 1);
};

export const formatDate = (stringDate) => {
  if (stringDate === null) {
    return "";
  } else if (stringDate === "0001-01-01T00:00:00") {
    return "";
  } else {
    return moment(stringDate).format("DD MMMM YYYY");
  }
};
export const formatDateTime = (stringDate) => {
  if (stringDate === null) {
    return "";
  } else if (stringDate === "0001-01-01T00:00:00") {
    return "";
  } else {
    return moment(stringDate).format("DD MMMM YYYY - HH:mm");
  }
};

export const formatDateMonth = (stringDate, row) => {
  if (stringDate === null) {
    return "";
  } else if (stringDate === "0001-01-01T00:00:00") {
    return "";
  } else {
    return moment(stringDate).format("DD MMMM YYYY");
  }
};
export const formatDateMonthOrderList = (stringDate, row) => {
  if (stringDate === null) {
    return "";
  } else if (row.type === "TENTATIVE ORDER") {
    return moment(stringDate).format(" MMM YYYY");
  } else {
    return moment(stringDate).format("DD MMM YYYY");
  }
};

export const formatShortDate = (stringDate) => {
  if (stringDate === null) {
    return "";
  } else {
    return moment(stringDate).format("YYYY-MM-DD");
  }
};

export const formatDateLocal = (stringDate) => {
  if (stringDate === null) {
    return "";
  } else {
    return moment(stringDate).format("LT");
  }
};

export const formatTimeAttributes = (dataArray) => {
  return dataArray.map((item) => {
    let dFrom = new Date(item.lstoP_DFROM);
    let dTo = new Date(item.lstoP_DATTO);

    let formattedDFrom = dFrom.toLocaleTimeString([], {
      hourCycle: "h23",
      hour: "2-digit",
      minute: "2-digit",
    });

    let formattedDTo = dTo.toLocaleTimeString([], {
      hourCycle: "h23",
      hour: "2-digit",
      minute: "2-digit",
    });

    return {
      ...item,
      lstoP_DFROM: formattedDFrom,
      lstoP_DATTO: formattedDTo,
    };
  });
};

export const isDateFormat = (str) => {
  const dateFormatRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/;
  return dateFormatRegex.test(str);
};

export const parseDateString = (str) => {
  return new Date(str);
};

export const getValueOptions = (value, options) => {
  const return_value = options.filter((val) => value === val.value);
  return return_value;
};

export const checkPermision = (permission, allowedPermission) => {
  return permission.some((e) => allowedPermission.includes(e));
};

export const CallApi = async (id, api, dispatch) => {
  try {
    const response = await dispatch(api(id));
    if (response.payload.status === 200) {
    } else {
      return showErrorDialog(response.payload.data.message);
    }
  } catch (error) {
    console.log("else 2");

    showErrorDialog(error.message);
  }
};
