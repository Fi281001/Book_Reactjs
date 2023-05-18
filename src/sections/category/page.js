import React, { useState } from "react";

import PropTypes from "prop-types";
import { Button } from "@mui/material";

Pagegination.propTypes = {
  pagination: PropTypes.object,
  onPageChange: PropTypes.func,
};
Pagegination.defaultProps = {
  onPageChange: null,
};

export default function Pagegination(props) {
  const { Pagination, onPageChange } = props;
  const { page, perPage, totalRows, from, to } = Pagination;
  const totalPages = Math.ceil(totalRows / perPage);
  function handlepagechange(newPage) {
    if (onPageChange) {
      onPageChange(newPage);
    }
  }

  return (
    <div style={{ textAlign: "center" }}>
      <Button
        onClick={() => {
          handlepagechange(page - 1);
        }}
        variant="contained"
        disabled={page === 1}
      >
        Prev
      </Button>
      <Button>
        <strong>{page}</strong>
      </Button>
      <Button
        disabled={page >= totalPages}
        style={{ marginLeft: "5px" }}
        onClick={() => {
          handlepagechange(page + 1);
        }}
        variant="contained"
      >
        Next
      </Button>
    </div>
  );
}
