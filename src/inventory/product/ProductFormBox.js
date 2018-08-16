import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { AppWeekBar } from "../../common/AppWeekBar";
import ProductForm from './ProductForm';

class ProductFormBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            catId: props.location.query.catId
        };
    }
    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <AppWeekBar title='ProductView'></AppWeekBar>
                    <ProductForm catId={this.state.catId}></ProductForm>
                </div>
            </MuiThemeProvider>
        );
    }
}
export default ProductFormBox