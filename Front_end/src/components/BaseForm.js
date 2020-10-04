import React from 'react';

const initialState = {
    username: "",
    password: "",
    gdpr: false,
    usernameEroor: "",
    passwordError: "",
    gdprError: ""
};

export default class Authentication extends React.Component  {
    state = initialState;

    validate = () => {
        let usernameEroor = "";
        let passwordError = "";
        let gdprError ="";

        if (this.state.username.length < 3)
            usernameEroor = "Invalid email/username";

        if (usernameEroor || gdprError || passwordError) {
            this.setState({usernameEroor, passwordError, gdprError});
            return false;
        }

        return true;
    }

    handleChange = ({ target: { type, name, value, checked } }) => {
        this.setState({ [name]: type === 'checkbox' ? checked : value })
    }

    handleSubmit = (event) => {
        event.preventDefault();     //keeps values
        const isValid = this.validate();
        if (isValid) {
            console.log(this.state);
            this.setState(initialState);
        }
    }

    render(){
        return(
            <>
            <h1>Authentication</h1>
            <form onSubmit={this.handleSubmit}>
                <div style={{color: "red"}}>
                    {this.state.usernameEroor}
                </div>
                <input 
                    name="username"
                    placeholder="username/email"
                    value={this.state.username} 
                    onChange={this.handleChange} 
                />
                <div style={{color: "red"}}>
                    {this.state.passwordError}
                </div>
                <input 
                    type="password"
                    name="password"
                    placeholder="password"
                    value={this.state.password} 
                    onChange={this.handleChange} 
                />
                <div style={{color: "red"}}>
                    {this.state.gdprError}
                </div>
                <input 
                    type="checkbox" 
                    name="gdpr"
                    onChange={this.handleChange}
                    checked={this.state.gdpr} > 
                </input>
                <button type="Submit">Submit</button>
            </form>
            </>
        );
    }
}
