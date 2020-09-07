import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    submitted: false,
    firstNameValidity: true,
    lastNameValidity: true,
    emailValidity: true,
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value, submitted: false });
  };
  validate = (type, value) => {
    switch (type) {
      case "text":
        const nameRegExp = /^[a-zA-Z]+$/;
        return nameRegExp.test(value);
      case "email":
        const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return emailRegExp.test(value);
      default:
        return false;
    }
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ submitted: true });

    const { firstName, lastName, email } = this.state;
    const firstNameValidity = this.validate("text", firstName);
    const lastNameValidity = this.validate("text", lastName);
    const emailValidity = this.validate("email", email);

    this.setState({ firstNameValidity, lastNameValidity, emailValidity });
  };
  render() {
    const {
      firstName,
      lastName,
      email,
      submitted,
      firstNameValidity,
      lastNameValidity,
      emailValidity,
    } = this.state;
    const valid = firstNameValidity && lastNameValidity && emailValidity;
    return (
      <div className="form-container">
        <form className="register-form" onSubmit={this.handleSubmit} noValidate>
          {submitted && valid && (
            <div className="success-message">
              Success! Thank you for registering.
            </div>
          )}
          <input
            className="form-field"
            type="text"
            name="firstName"
            value={firstName}
            placeholder="First Name"
            onChange={this.handleChange}
          ></input>
          {submitted && !firstNameValidity && (
            <span>Please enter a first name.</span>
          )}
          <input
            className="form-field"
            type="text"
            name="lastName"
            value={lastName}
            placeholder="Last Name"
            onChange={this.handleChange}
          ></input>
          {submitted && !lastNameValidity && (
            <span>Please enter a last name.</span>
          )}
          <input
            className="form-field"
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            required
            onChange={this.handleChange}
          ></input>
          {submitted && !emailValidity && <span>Please enter an Email.</span>}

          <button className="form-field" type="submit">
            Register
          </button>
        </form>
      </div>
    );
  }
}

export default App;
