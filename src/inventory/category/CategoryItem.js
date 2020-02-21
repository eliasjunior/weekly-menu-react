import React from "react";
import PropTypes from "prop-types";
import CloneDeep from "lodash.clonedeep";
import CategoryHead from "./CategoryLine";
import ProductList from "./ProductList";

class CategoryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categorySelect: false
    };
    this.selectAllNoneProd = this.selectAllNoneProd.bind(this);
  }

  selectAllNoneProd() {
    const category = CloneDeep(this.props.category);
    const categorySelect = !this.state.categorySelect;
    const itemSelected = {
      categoryName: category.name,
      catId: category._id,
      checked: categorySelect
    };
    this.setState({ categorySelect });
    this.props.onSelectAllProd(itemSelected);
  }
  render() {
    return (
      <div>
        <CategoryHead
          category={this.props.category}
          parentComponent={this.props.parentComponent}
          onHandleMessage={this.props.onHandleMessage}
          onRefresh={this.props.onRefresh}
        ></CategoryHead>
        <ProductList
          parentComponent={this.props.parentComponent}
          category={this.props.category}
          onHandleMessage={this.props.onHandleMessage}
          onSelectedProd={this.props.onSelectedProd}
          onSelectAllNoneProd={this.selectAllNoneProd}
          categorySelect={this.state.categorySelect}
        ></ProductList>
      </div>
    );
  }
}
CategoryItem.propTypes = {
  category: PropTypes.object,
  onHandleMessage: PropTypes.func,
  onRefresh: PropTypes.func,
  parentComponent: PropTypes.string
};
export default CategoryItem;
