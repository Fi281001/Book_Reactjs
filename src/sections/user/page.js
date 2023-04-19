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
  // const [giu, setGiu] = useState(props)
  // console.log(">>>>>>>>>",giu);
  const { Pagination, onPageChange } = props;
  const { _page, _limit, _totalRows } = Pagination;
  const totalPages = Math.ceil(_totalRows / _limit);

  // console.log(Pagination);
  function handlepagechange(newPage) {
    console.log("toto",totalPages);
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
        disabled = {_page === 1} 
      >
        prev
      </Button> 

      <Button
        disabled = {_page >= totalPages}
        style={{ marginLeft: "5px" }}
        onClick={() => {
          handlepagechange(_page + 1);
        }}
        variant="contained"
      >
        next
      </Button>
    </div>
  );
}
