import React, { useState } from "react";

import PropTypes from "prop-types";
import { Button } from "@mui/material";

PageBorrower.propTypes = {
  page: PropTypes.object,
  onPageChange: PropTypes.func,
};
PageBorrower.defaultProps = {
  onPageChange: null,
};

export default function PageBorrower(props) {
  const { Page, onPageChange } = props;
  const { _page, _limit, _totalRows } = Page;
  const totalPages = Math.ceil(_totalRows / _limit);

  function handlepagechange(newPage) {
    if (onPageChange) {
      onPageChange(newPage);
    }
  }

  return (
    <div style={{ textAlign: "center" }}>
      <Button
        onClick={() => {
          handlepagechange(_page - 1);
        }}
        variant="contained"
        disabled={_page === 1}
      >
        Prev
      </Button>
      <Button>
        {" "}
        <strong>{_page}</strong>
      </Button>
      <Button
        disabled={_page >= totalPages}
        style={{ marginLeft: "5px" }}
        onClick={() => {
          handlepagechange(_page + 1);
        }}
        variant="contained"
      >
        Next
      </Button>
    </div>
  );
}
