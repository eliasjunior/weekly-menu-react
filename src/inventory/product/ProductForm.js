import React from 'react';
import TextField from "@material-ui/core/TextField";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

const QuantityType = {
    KG : "Kilograms",
    L: "Liter",
    UNIT: "Unit"
};

class ProductForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: null
        };
        
        this.handleType.bind(this);
    }
    handleType(event) {
        console.log(event.target.value)
        this.setState({type: event.target.value});
    }
    render() {
        return (
            <FormControl style={{marginLeft: '20px'}}>
                <TextField style={{marginTop: '20px'}} name="Product name" />
                <FormLabel style={{marginTop: '20px'}} component="legend">Type</FormLabel>
                <RadioGroup name="shipSpeed"  
                    onChange={this.handleType} value={this.state.type}>
                    <FormControlLabel 
                        value={QuantityType.KG} 
                        control={<Radio />} 
                        label={QuantityType.KG} />
                    <FormControlLabel 
                        value={QuantityType.UNIT} 
                        control={<Radio />} 
                        label={QuantityType.UNIT} />  
                    <FormControlLabel 
                        value={QuantityType.L} 
                        control={<Radio />} 
                        label={QuantityType.L} />    
                </RadioGroup>
            </FormControl>
        );
    }
}

export default ProductForm
