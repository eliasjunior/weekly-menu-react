import React from 'react';
import TextField from "material-ui/TextField";
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

const styles = {
    block: {
        maxWidth: 250,
    },
    radioButton: {
        marginBottom: 16,
    },
};

const QuantityType = {
    KG : "Kilograms",
    L: "Liter",
    UNIT: "Unit"
};

class ProductForm extends React.Component {

    state = {
        firstSlider: 0.5,
        secondSlider: 50,
    };

    handleFirstSlider = (event, value) => {
        this.setState({firstSlider: value});
    };

    handleSecondSlider = (event, value) => {

        console.log('>> loco react', value)
        this.setState({secondSlider: value});
    };


    render() {
        return (
            <div style={{padding: '10px'}}>
                <TextField hintText="Product name" />
                <RadioButtonGroup name="shipSpeed" defaultSelected="not_light">
                    <RadioButton 
                        value={QuantityType.KG}
                        label={QuantityType.KG}
                        style={styles.radioButton}
                        />
                    <RadioButton
                        value={QuantityType.UNIT}
                        label={QuantityType.UNIT}
                        style={styles.radioButton}
                        />
                    <RadioButton
                        value={QuantityType.L}
                        label={QuantityType.L}
                        style={styles.radioButton}
                        />
                </RadioButtonGroup>
            </div>
        );
    }
}

export default ProductForm
