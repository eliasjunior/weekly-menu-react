import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import '../styles/CategoryItem.css';
import {ProductViewLabel} from './product/ProductViewLabel';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import {browserHistory} from 'react-router';
import { AppConstant } from '../common/AppConstant';

class CategoryItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            nested: [],
            checked: []
        }
    }
    listProducts (ingredients) {
        const productListView = (ingredient) => {
            return <ProductViewLabel key={ingredient._id} product={ingredient}></ProductViewLabel>;
        };     
        return ingredients.map(productListView);
    }

    goProductView(id) {
        browserHistory.push({
            pathname: AppConstant.PRODUCTS_VIEW,
            search: "?catId="+id,
        });
    }

    render() {
        return  (
            <div>
                <ListItem
                    key={this.props._id}>
                    <ListItemText primary={this.props.name}  />
                    <ListItemSecondaryAction>
                        <IconButton aria-label="Comments" 
                            onClick={this.goProductView.bind(this, this.props._id)}>
                            <AddIcon/>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                <Collapse in={true} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {this.listProducts(this.props.ingredients)}
                    </List>
                </Collapse>
             </div>   
            )
    }
}
export default CategoryItem;