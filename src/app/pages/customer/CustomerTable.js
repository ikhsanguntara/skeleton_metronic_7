import React, { useEffect, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import {
  sortCaret,
  headerSortingClasses,
  PleaseWaitMessage,
  NoRecordsFoundMessage,
} from "../../../_metronic/_helpers";
// import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { sizePerPageList, formatDateMonth } from "../../utility";
import { toAbsoluteUrl } from "../../../_metronic/_helpers";
import SVG from "react-inlinesvg";

export const CustomerTable = ({
  data,
  page,
  sizePerPage,
  onTableChange,
  totalSize,
  loading,
}) => {
  // const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    // Add number
    const pageBefore = sizePerPage * (page - 1);
    const initData = data.map((item, index) => {
      return {
        ...item,
        no: index + 1 + pageBefore,
      };
    });

    console.log(initData);
    setTableData(initData);
  }, [data, sizePerPage, page]);

  const [tableData, setTableData] = useState(data);

  const actionFormatter = (e, row) => {
    return (
      <div>
        <OverlayTrigger
          overlay={<Tooltip id="products-edit-tooltip">Edit</Tooltip>}
        >
          <div
            className="btn btn-icon btn-light btn-hover-primary btn-sm mr-3"
            onClick={() => {
              history.push(`/schedule-picking/edit/${row.label_id}`);
            }}
          >
            <span className="svg-icon svg-icon-md svg-icon-secondary">
              <SVG src={toAbsoluteUrl("/media/svg/icons/General/Other1.svg")} />
            </span>
          </div>
        </OverlayTrigger>
      </div>
    );
  };

  const columns = [
    {
      text: "No",
      dataField: "no",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },

    {
      text: "code",
      dataField: "customer_code",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      text: "store name",
      dataField: "customer_store_name",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },

    {
      text: "kab kota",
      dataField: "customer_kab_kota",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      text: "kecamatan",
      dataField: "customer_kecamatan",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },

    {
      text: "kelurahan",
      dataField: "customer_kelurahan",
      sort: true,
      sortCaret: sortCaret,
    },
    {
      text: "kelurahan",
      dataField: "customer_kelurahan",
      sort: true,
      sortCaret: sortCaret,
    },
    {
      text: "provinsi",
      dataField: "customer_provinsi",
      sort: true,
      sortCaret: sortCaret,
    },
    {
      text: "status",
      dataField: "customer_store_status",
      sort: true,
      sortCaret: sortCaret,
    },

    {
      text: "Action",
      dataField: "action",
      formatter: actionFormatter,
    },
  ];

  const options = {
    page: page,
    sizePerPage: sizePerPage,
    showTotal: true,
    totalSize: totalSize,
    sizePerPageList: sizePerPageList(totalSize),
  };
  return (
    <>
      <BootstrapTable
        remote
        wrapperClasses="table-responsive"
        classes="table table-head-custom table-vertical-center overflow-hidden"
        bootstrap4
        bordered={false}
        keyField="depo_id"
        data={tableData}
        columns={columns}
        pagination={paginationFactory(options)}
        onTableChange={onTableChange}
        hover
      >
        <PleaseWaitMessage entities={loading ? null : tableData} />
        <NoRecordsFoundMessage entities={loading ? null : tableData} />
      </BootstrapTable>
    </>
  );
};
