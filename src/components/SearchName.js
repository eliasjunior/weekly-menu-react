import React from "react";
import PropTypes from "prop-types";
import Search from "@material-ui/icons/Clear";
import { TextField, InputAdornment } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { listFilterAction } from "app-redux/actions/ListFilterAction";
import cloneDeep from "lodash.clonedeep";

export default function SearchName({ searchTitle = "Search Product", listDB }) {
  const dispatch = useDispatch();
  const { textFilter } = useSelector((state) => state.listFilter);

  const handleSearchProduct = (value) => {
    dispatch(listFilterAction(value, cloneDeep(listDB)));
  };
  return (
    <div className="searchName">
      <TextField
        id="filled-search"
        label={searchTitle}
        type="search"
        margin="normal"
        variant="outlined"
        value={textFilter}
        onChange={({ target }) => {
          handleSearchProduct(target.value);
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="end">
              <Search onClick={() => dispatch(listFilterAction("", listDB))} />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
}

SearchName.propTypes = {
  searchTitle: PropTypes.string,
  onSearch: PropTypes.string,
  onResetSearch: PropTypes.func,
};
