import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { AppWeekBar } from "../../common/AppWeekBar";
import ProductForm from './ProductForm';

class ProductViewBox extends React.Component {
    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <AppWeekBar title='ProductView'></AppWeekBar>
                    <ProductForm></ProductForm>
                </div>
            </MuiThemeProvider>
        );
    }
}
export default ProductViewBox