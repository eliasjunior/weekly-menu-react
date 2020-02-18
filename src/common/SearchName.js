import React from "react";
import PropTypes from "prop-types";
import Search from "@material-ui/icons/Clear";
import { TextField, InputAdornment } from "@material-ui/core";

export default function SearchName(props) {
  if (!props.isVisible) {
    return "";
  }

  const { searchTitle = "Search Product" } = props;
  return (
    <div className="searchName">
      <TextField
        id="filled-search"
        label={searchTitle}
        type="search"
        margin="normal"
        variant="outlined"
        value={props.onSearch}
        onChange={props.onChangeName}
        InputProps={{
          startAdornment: (
            <InputAdornment position="end">
              <Search onClick={props.onResetSearch} />
            </InputAdornment>
          )
        }}
      />
    </div>
  );
}

SearchName.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  searchTitle: PropTypes.string,
  onSearch: PropTypes.string,
  onChangeName: PropTypes.func.isRequired,
  onResetSearch: PropTypes.func
};
