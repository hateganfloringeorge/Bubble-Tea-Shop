import React, { useContext, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { UserContext } from './UserContext';
import axios from "axios";


const Authentication = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const { user, setUser } = useContext(UserContext);
    
    const validate = () => {
        let usernameError = "";
        let passwordError = "";

        if (username.length <= 3)
            usernameError = "Invalid email/username";

        if (password.length < 3)
            passwordError = "Password needs to be at least 3 characters";

        if (usernameError || passwordError) {
            setUsernameError(usernameError);
            setPasswordError(passwordError);
            return false;
        }

        return true;
    }

    const handleChange = ({ target: { type, name, value, checked } }, setterFunction) => {
        setterFunction( type === 'checkbox' ? checked : value );
    }

    function handleLoginSuccess({token, user}) {
        localStorage.setItem("token", token);
        setUser(user);
    }

    function handleLoginFail(error) {
        console.log(error);
        alert(error);
    }

    const handleSubmit = (event) => {
        event.preventDefault();     
        const isValid = validate();
        if (isValid) {
            var payload = {
                username,
                password
            }
            axios.post('http://localhost:3000/api/v1/users/login', payload)
            .then((response) => handleLoginSuccess(response.data))
            .catch((error) => handleLoginFail(error))
        }
    }

    return(
        <>
        {user ? <Redirect to="/" /> :
            <div className="pageTitle">
                <h1>Login</h1>
            </div>
        }   
            <div className="form-wrapper">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <div style={{color: "red"}}>
                            {usernameError}
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="username" >Username</label>
                        <input 
                            id="username"
                            name="username"
                            placeholder="username/email"
                            value={username} 
                            onChange={event => handleChange(event, setUsername)}
                        />
                    </div>
                    
                    <div className="form-group">
                        <div style={{color: "red"}}>
                            {passwordError}
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input 
                            id="password"
                            type="password"
                            name="password"
                            placeholder="password"
                            value={password} 
                            onChange={ event => handleChange(event, setPassword)} 
                        />
                    </div>
                    <div className="form-group">
                        <button type="Submit" className="btn btn-primary">Login</button>
                    </div>
                </form>
                <div className="form-group">
                    <h3>Don't have account, register below!</h3>
                </div>
                <div className="form-group">
                    <Link to="/register" className="btn btn-primary">Register</Link>
                </div>
            </div>
        </>
    );

}

export default Authentication;