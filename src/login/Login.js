import React from "react";
import { AppWeekBar } from "../common/AppWeekBar";
import { TextField, Button } from '@material-ui/core';

export async function post(resource, payload) {
  try {
    const response = await fetch(`http://109.255.172.3:8080/api/${resource}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    return response.json();
  } catch (error) {
    throw Error(error);
  }
}

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: {
        username: '',
        password: ''
      },
      title: "Login",
      displayError: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { login } = this.state;
    const { history } = this.props;

    try {
      const data = await post("authenticate", login, false);
      if (data.id_token) {
        localStorage.setItem("JWT", data.id_token);
        history.push("/");
      } else {
        console.log("Error", data);
        this.setState({displayError: data});
      }
    } catch (error) {
      console.log("Error Exception", error);
      this.setState({displayError: error});
    }
  }

  handleChange = event => {
    const { target } = event;
    const { login } = this.state;
    login[target.name] = target.value;
    this.setState({ login });
    console.log("Username: ", login, target.name);
  };

  render() {
    const { login, displayError } = this.state;

    const displayMessage = (displayError) => {
      return displayError ? 
        <h2>Error: <br/> {displayError}</h2> : '';
    };

    return (
      <div>
        <AppWeekBar title={this.state.title} />
        <TextField
          placeholder="Enter your Username"
          onChange={this.handleChange}
          value={login["username"]}
          name="username"
          required={true}
        />
        <br />
        <TextField
          type="password"
          placeholder="Enter your Password"
          onChange={this.handleChange}
          name="password"
          value={login["password"]}
          required={true}
        />
        <br />
        <Button
          label="Submit"
          style={style}
          onClick={event => this.handleSubmit(event)}
        >
          Submit
        </Button>
        {displayMessage(displayError)}
      </div>
    );
  }
}
const style = {
  input: {
    margin: "10px"
  }
};
export default Login;
