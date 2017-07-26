import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { AppWeekBar } from "../../common/AppWeekBar";
import ProductFormComponent from './ProductFormComponent';

class ProductView extends React.Component {

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <AppWeekBar title='ProductView'></AppWeekBar>
                    <ProductFormComponent></ProductFormComponent>
                </div>
            </MuiThemeProvider>
        );
    }

}

export default ProductView