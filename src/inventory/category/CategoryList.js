import React from 'react';
import CategoryItem from './CategoryItem';
import List from "@material-ui/core/List";
import PropTypes from 'prop-types';
import CloneDeep from 'lodash.clonedeep';
import CategoryDisplayService from './CategoryDisplayService';
import SearchName from '../../common/SearchName';
class CategoryList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            search: '',
            categories: this.props.list
        }
    }
    componentDidUpdate(prevProps) {
        const { list: prevList } = prevProps
        const { list } = this.props
        const reducerCount = (acc, item) => {
            const totalSelected = item.products.filter(prod => prod.checked).length
            return acc + totalSelected;
        }
        const totalP = prevList.reduce(reducerCount, 0)
        const totalC = list.reduce(reducerCount, 0)

        if (prevList.length !== list.length || totalC !== totalP) {
            this.setState({ categories: list })
        }
    }
    buildList = () => {
        const { categories } = this.state;
        if (!categories) {
            console.error('Category list is null');
            return;
        }
        return categories.map(category => {
            return <CategoryItem
                key={category._id} category={{ ...category }}
                parentComponent={this.props.parentComponent}
                onHandleMessage={this.props.onHandleMessage}
                onSelectedProd={this.props.onSelectedProd}
                onSelectAllProd={this.props.onSelectAllProd}
                onRefresh={this.props.onRefresh}>
            </CategoryItem>;
        });
    }
    handleChange = (e) => {
        const { list } = this.props
        const value = e.target.value;

        if (value === '') {
            this.resetSearch()
            return
        }
        const cats = CloneDeep(list).filter(cat => {
            cat.products = cat.products.filter(prod => {
                return prod.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
            })
            return cat.products.length > 0
        })
        this.setState({
            search: value,
            categories: cats
        })
    }
    resetSearch = () => {
        this.setState({
            search: '',
            categories: this.props.list
        });
    }
    displaySearch() {
        const isVisible = CategoryDisplayService
            .searchInput(this.props.parentComponent).display

        const searchNode = <SearchName onSearch={this.state.search}
            onChangeName={this.handleChange} onResetSearch={this.resetSearch}>
        </SearchName>

        return isVisible ? searchNode : ''
    }
    render() {
        return (
            <div>
                {this.displaySearch()}
                <List>
                    {this.buildList()}
                </List>
            </div>
        )
    }
}

CategoryList.propTypes = {
    onSelectedProd: PropTypes.func,
    onSelectAllProd: PropTypes.func,
    parentComponent: PropTypes.string,
    list: PropTypes.array
}
export default CategoryList



