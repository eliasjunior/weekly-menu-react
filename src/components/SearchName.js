import React from "react";
import PropTypes from "prop-types";
import Search from "@material-ui/icons/Clear";
import { TextField, InputAdornment } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { inventoryFilter } from "app-redux/actions/InventoryFilterAction";

export default function SearchName({
  searchTitle = "Search Product",
  displayList = []
}) {
  const dispatch = useDispatch();
  const textFilter = useSelector(state => state.textFilter);
  const handleSearchProduct = (value, displayList) => {
    dispatch(inventoryFilter(value, displayList));
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
          handleSearchProduct(target.value, displayList);
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="end">
              <Search
                onClick={() => dispatch(inventoryFilter("", displayList))}
              />
            </InputAdornment>
          )
        }}
      />
    </div>
  );
}

SearchName.propTypes = {
  searchTitle: PropTypes.string,
  onSearch: PropTypes.string,
  onResetSearch: PropTypes.func
};
