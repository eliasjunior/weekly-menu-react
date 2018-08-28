import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { AppWeekBar } from "../../common/AppWeekBar";
import ApiService from '../../service/ApiService';
import { CategoryList } from '../../inventory/CategoryList';
import { Button } from '@material-ui/core';
import { EditableLabel } from '../../common/EditableLabel';
import { CrudActions } from '../../common/CrudActions';

const factoryMode = (prevState, newState) => {
    return {
        editFieldMode: newState.editFieldMode === false ? false : true
    }
}
class RecipePage extends React.Component {
    //React's constructor is called before DOM is mounted.
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            categories: [],
            location: props.location.pathname,
            editFieldMode: false
        }
        this.updateName = this.updateName.bind(this);
        this.swapIcon = this.swapIcon.bind(this);
    }
    componentDidMount() {
        ApiService
            .get('category')
            .then(categories => this.setState(() => ({ categories })))
            .catch(reason => this.setState({ message: reason }));
    }
    updateName() {
        const newState = {
            editFieldMode: !this.state.editFieldMode,
        };
        this.setState(prevState => factoryMode(prevState, newState))
        // ProductService
        //     .update(this.state.product)
        //     .then(() => this.setState(prevState => factoryMode(prevState, newState)))
        //     .catch(reason => console.error(reason));
    }
    swapIcon() {
        const newState = {
            editFieldMode: !this.state.editFieldMode
        };
        this.setState(prevState => factoryMode(prevState, newState));
    };
    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <AppWeekBar title='New Recipe'></AppWeekBar>
                    <Button variant="contained"
                        onClick={() => console.log('creating...')} >
                        Create Recipe
                    </Button>
                    <div style={{ margin: '20px' }}>
                        <EditableLabel
                            inset={false}
                            editFieldMode={true}
                            onChangeName={this.onChangeName}>
                        </EditableLabel>
                        <CrudActions
                            editFieldMode={true}
                            updateName={this.updateName}
                            swapIcon={this.swapIcon}>
                        </CrudActions>
                    </div>
                    <CategoryList
                        list={this.state.categories}
                        location={this.state.location}>
                    </CategoryList>
                </div>
            </MuiThemeProvider>
        );
    }
}
export default RecipePage
