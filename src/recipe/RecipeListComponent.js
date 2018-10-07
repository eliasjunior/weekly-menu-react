import React from 'react';
import { List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import { RecipeHeaderItem } from './RecipeHeaderItem';
import CategoryList from '../inventory/category/CategoryList';
import PropTypes from 'prop-types';
import IconRecipe from '@material-ui/icons/Receipt'
import CloneDeep from 'lodash.clonedeep';
import SearchName from '../common/SearchName';
import { purple } from '@material-ui/core/colors'
import CategoryListUtil from '../inventory/category/CategoryListUtil';
class RecipeListComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            search: '',
            recipes: props.recipes
        }
    }
    componentDidUpdate(prevProps) {
        let hasChanged = false;
        prevProps.recipes.forEach(_recPrev => {
            const currentRec = this.props.recipes
                .filter(rec => rec._id = _recPrev._id)
                .pop();
            if(!currentRec) {
                console.error('componentDidUpdate props is ansync with prevProps')
                return
            }
            const prevList = _recPrev.categories
            const categories = currentRec.categories
            hasChanged = CategoryListUtil
                .isListChanged(prevList, categories, 'checked')
        })

        if (prevProps.recipes.length !== this.props.recipes.length ||
            hasChanged) {
            this.setState({ recipes: this.props.recipes })
        }
    }
    buildRecipeList = () => {
        const {
            isNotEditable,
            isRecipeNotSelectable,
            onSelectRecipe,
            onSelectedProd,
            onSelectAllProdOfCatRec,
            parentComponent
        } = this.props

        const { recipes } = this.state

        if (recipes.length) {
            return recipes.map((recipe, index) => {
                return (
                    <div key={index}>
                        <List component="div" disablePadding key={recipe._id}>
                            <RecipeHeaderItem
                                recipe={recipe}
                                isNotEditable={isNotEditable}
                                isRecipeNotSelectable={isRecipeNotSelectable}
                                onSelectRecipe={onSelectRecipe}>
                            </RecipeHeaderItem>
                        </List>
                        <CategoryList
                            list={recipe.categories}
                            onSelectedProd={onSelectedProd}
                            onSelectAllProd={selectedCategory => {
                                const withRecipe = { ...selectedCategory, recId: recipe._id }
                                onSelectAllProdOfCatRec(withRecipe)
                            }}
                            parentComponent={parentComponent}
                            searchTitle="Search Product In Recipe">
                        </CategoryList>
                    </div >)
            });
        } else {
            return ''
        }
    }
    // TODO do like in category, add to a service
    isTitleDisplay = () => {
        const {
            title,
            recipes
        } = this.props

        if (title && recipes.length) {
            return <List>
                <ListItem style={{ backgroundColor: purple[300] }}>
                    <ListItemIcon>
                        <IconRecipe />
                    </ListItemIcon>
                    <ListItemText primary={title}></ListItemText>
                </ListItem>
            </List>
        } else return '';
    }
    handleChange = (e) => {
        const { recipes } = this.state
        const value = e.target.value;

        if (value === '') {
            this.resetSearch()
            return
        }
        const recipesFiltered = CloneDeep(recipes)
            .filter(rec => rec.name
                .toLowerCase()
                .indexOf(value.toLowerCase()) !== -1)

        this.setState({
            search: value,
            recipes: recipesFiltered
        })
    }
    resetSearch = () => {
        this.setState({
            search: '',
            recipes: this.props.recipes
        });
    }
    render() {
        return (
            <div>
                {this.isTitleDisplay()}
                <SearchName onSearch={this.state.search}
                    onChangeName={this.handleChange}
                    onResetSearch={this.resetSearch}
                    searchTitle="Search Recipe">
                </SearchName>
                <List>
                    {this.buildRecipeList()}
                </List>
            </div>
        )
    }
}

RecipeListComponent.propTypes = {
    title: PropTypes.string,
    recipes: PropTypes.array,
    onSelectRecipe: PropTypes.func,
    onSelectedProd: PropTypes.func
}

export default RecipeListComponent